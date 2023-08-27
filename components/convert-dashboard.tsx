"use client"

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCard } from "@/components/alert-card";
import { SongInfoCard } from "@/components/song-info-card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressCard } from "@/components/progress-card";
import { ConversionResultsComponent } from "@/components/conversion-results";
import { FileUploader } from "@/components/file-uploader";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import { cn, parseYoutubeLink } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import YouTube, { YouTubeProps } from 'react-youtube';


const ConvertDashboard = ({ userData }) => {
  const router = useRouter();
  const proModal = useProModal();

  const [inputChoice, setInputChoice] = useState("youtube");
  const [cloneChoice, setCloneChoice] = useState<string>(
    userData?.cloneNames?.length === 1 ? userData.cloneNames[0] : ""
  );

  const [youtubeKey, setYoutubeKey] = useState(Date.now()); // For resetting component
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeLinkValid, setYoutubeLinkValid] = useState(false);
  const [youtubeError, setYoutubeError] = useState("");
  const [youtubeName, setYoutubeName] = useState("");
  const youtubeId = parseYoutubeLink(youtubeLink);

  const [fileKey, setFileKey] = useState(Date.now()); // For resetting file input
  const [fileUploaded, setFileUploaded] = useState(false);
  const [hasInstrumentals, setHasInstrumentals] = useState(true);
  const [hasBackingVocals, setHasBackingVocals] = useState(false);
  const [convertBackingVocals, setConvertBackingVocals] = useState(false);

  const [error, setError] = useState("");

  const [isConverting, setConverting] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [conversionId, setConversionId] = useState("");

  const onFinish = () => {
    setFinished(true);
    setSuccess(true);
  }

  const onFail = () => {
    setFinished(true);
    setSuccess(false);
  }

  const reset = () => {
    setError("");
    setConverting(false);
    setFinished(false);
    setSuccess(false);
    setConversionId("");
    setResults(null);
    setFileKey(Date.now());
    setYoutubeKey(Date.now());
  }

  const onPlayerReady: YouTubeProps['onReady'] = async (event) => {
    // access to player in all event handlers via event.target
    const duration = await event.target.getDuration();
    if (duration / 60 > 10) {
      setYoutubeError("Song exceeds 10 minutes");
    }

    const title = await (event.target as any).getVideoData()?.title;
    setYoutubeName(title);
    setYoutubeLinkValid(true); // Even if duration exceeded
  }

  const opts: YouTubeProps['opts'] = {
    height: '200',
    width: '400',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

  const onSubmit = async () => {
      reset(); 
      setConverting(true);
      
      if (inputChoice === "upload" && !fileUploaded) return;
      if (inputChoice === "youtube" && (youtubeError !== "" || youtubeLink === "" || !youtubeId)) return;
        
      const params = { 
        cloneName: cloneChoice,
        hasInstrumentals,
        hasBackingVocals,
        convertBackingVocals,
      };
      if (inputChoice === "youtube") {
        params["youtubeId"] = youtubeId;
        params["youtubeName"] = youtubeName;
      }

      await axios.post("/api/convert", params)
        .then((response) => { setConversionId(response.data.conversionId); router.refresh(); })
        .catch((error) => {
          console.log("Error in submitting job");
          if (error?.response?.status === 403) {
              proModal.onOpen();
          } else {
              toast.error("Something went wrong.");
              setError("Internal job submission failed.");
          }
        })
        .finally(() => {
          setFileUploaded(false);
          setYoutubeLink("");
          setYoutubeLinkValid(false);
          setYoutubeName("");
        });
  }

  const [results, setResults] = useState(null);

  const retrieveResults = async () => {
    const resultResponse = await axios.get("/api/convert/results", { params: { id: conversionId } });

    if (resultResponse.status === 200) {
      console.log("Results retrieved");

      setResults(resultResponse.data);
    } else {
      setError("Could not retrieve files.");
    }
  }

  useEffect(() => {
    if (isFinished && isSuccess && results === null && conversionId !== "") {
      setConverting(false);
      retrieveResults();
    }
  }, [isFinished, isSuccess, results, conversionId]);

  if (!userData?.cloneNames?.length) {
    return (
      <div className="mt-8 text-center text-xl">
        You do not have a voice clone yet. 
        Please go to the <Link href="/clone" className="font-bold">Clone</Link> page first.
        <Empty label="Once your voice has been cloned, come back here to convert a song :)" />
      </div>
    )
  }

  const inputNotReady = ((inputChoice === "upload" && !fileUploaded) ||
  (inputChoice === "youtube" && (!youtubeLinkValid || !youtubeId || youtubeError !== ""))) as boolean;

  return (
    <div>
        <div className="p-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div id="upload-convert" 
              className="w-full lg:max-w-2xl relative"
            >
              <div className="mb-4 font-bold text-2xl">1. Song</div>
              <div className="my-4 flex items-center gap-4">
                <div>Input Method:</div>
                <div className="w-[10rem]">
                  <Select onValueChange={(val) => setInputChoice(val)}
                    defaultValue={inputChoice}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose input method"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="youtube" className="cursor-pointer">YouTube</SelectItem>
                        <SelectItem value="upload" className="cursor-pointer">Upload</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {inputChoice === "youtube" ?
                <div>
                  <div className="my-4 flex items-center gap-4">
                    <div>Song URL:</div>
                    <div className="w-[25rem]">
                      <Input 
                        placeholder="ex: https://youtube.com/watch?v=0yW7w8F2TVA"
                        onChange={(e) => {
                          setYoutubeLink(e.target.value);
                          setYoutubeError("");
                          setYoutubeLinkValid(false);
                        }}
                      />
                    </div>
                  </div>
                  {youtubeId ?
                    <div className="my-4 flex justify-center">
                      <YouTube videoId={youtubeId}
                        key={youtubeKey}
                        opts={opts} onReady={onPlayerReady} 
                        onError={() => setYoutubeError("YouTube video not found")}
                      />
                    </div>
                    : ""
                  }
                  {youtubeLink !== "" && (!youtubeId || youtubeError !== "") ?
                    <AlertCard variant="destructive" title="Error" 
                      message={youtubeError !== "" ? youtubeError : "YouTube video not found"} /> 
                      : ""
                  }
                </div>
                :
                <FileUploader 
                  uploadEndpoint="/api/convert/upload" 
                  onUpload={() => setFileUploaded(true)} 
                  isConvertUpload={true}
                  key={fileKey}
                  durationLimit={10}
                />
              }

              <div className="mt-8 font-bold text-2xl">2. Settings</div>
              <div className="mt-4 flex items-center gap-4">
                <div>Voice Clone:</div>
                <div className="w-[15rem]">
                  <Select onValueChange={(val) => setCloneChoice(val)}
                    {...(cloneChoice !== "" ? {defaultValue: cloneChoice} : {})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Voice Clone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {userData?.cloneNames?.map((name) =>
                          <SelectItem value={name} className="cursor-pointer">{name}</SelectItem>)
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="my-4 flex items-center gap-2">
                <Checkbox
                  id="has_instr"
                  className="w-6 h-6" 
                  checked={hasInstrumentals}
                  onCheckedChange={() => setHasInstrumentals(val => !val)}
                />
                <div>
                  <div className="font-medium">Does this song have instrumentals/background sounds?</div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_instr"
                    className="w-6 h-6" 
                    checked={hasBackingVocals}
                    onCheckedChange={() => setHasBackingVocals(val => !val)}
                  />
                  <div>
                    <div className="font-medium">Does this song have multiple voices/backing vocals?</div>
                  </div>
                </div>
                {hasBackingVocals ?
                  <div className="flex items-center gap-2 ml-4">
                    <Checkbox
                      id="has_instr"
                      className="w-6 h-6" 
                      checked={convertBackingVocals}
                      onCheckedChange={() => setConvertBackingVocals(val => !val)}
                    />
                    <div>
                      <div className="font-medium mt-3">Would you like to convert the backing vocals as well?</div>
                      <div className="text-sm text-muted-foreground">This could get messy if there are many layers.</div>
                    </div>
                  </div> : ""}
              </div>

              <div className={cn("mx-auto flex items-center justify-center mt-6 w-fit shadow-xl",
                cloneChoice === "" || !fileUploaded ? "" : "hover:scale-105 transition")}
              >
                <Button
                  type="submit"
                  size="lg" className="text-xl rounded-r-none border-2 border-black border-r-none"
                  disabled={cloneChoice === "" || inputNotReady || isConverting}
                  onClick={onSubmit}
                >
                Convert
                </Button>
                <span className="px-2 py-[0.45rem] rounded-r-md text-black flex items-center bg-primary/20
                  border-2 border-black border-l-none font-bold
                ">
                    1
                    <IconContext.Provider
                      value={{ size: "25px", color: "#E1B530" }}
                  >
                  <PiCoinVerticalFill />
                  </IconContext.Provider>
                </span>
              </div>
            </div>
            
            <div id="output-recent" className="w-full lg:max-w-2xl">
              <div className="font-bold text-2xl">Output</div>
              <div className="pt-4">
                  {isConverting ?
                    <AlertCard title="Note" variant="default" message={
                        <div>You can view your results here and in the <Link href="/history">History</Link> page.</div>
                  } /> : ""}
              </div>
              <div>
                {!isConverting && !isFinished ? <Empty label="Nothing to see here :)" /> : ""}
              </div>
              <div className="mt-4">
                {(isConverting || isFinished) && error === "" && conversionId !== "" ?
                  <ProgressCard process="Conversion"
                    initStatus="IN_QUEUE"
                    apiEndpoint="/api/convert/status" apiId={conversionId}
                    onFinish={onFinish}
                    onFail={onFail}
                  />
                    : ""}
              </div>
              <div className="mt-4">
                {error !== "" ?
                  <AlertCard variant="destructive" title="Error" message={error} />
                    : ""
                }
              </div>
              <div>
                {isFinished && isSuccess && error === "" ?
                  (results === null ? "Retrieving results..."
                  : <ConversionResultsComponent results={results} />)
                  : ""}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}


export default ConvertDashboard;