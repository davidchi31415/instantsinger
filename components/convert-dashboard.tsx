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
import { useHistoryModal, useProModal, useSettingsModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import YouTube, { YouTubeProps } from 'react-youtube';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";
import { ArrowDownIcon, CogIcon, HistoryIcon, PauseIcon, PlayIcon, SettingsIcon } from "lucide-react";
import { HistoryModal } from "./history-modal";
import { HistoryTable } from "./history-table";
import { useMultiAudio } from "@/hooks/use-multi-audio";
import { SettingsModal } from "./settings-modal";

const Player = ({ player, toggle }) => {
  return (
      <Button variant="ghost" className="text-primary" onClick={toggle}>
          {player.playing ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
      </Button>
  )
}

const ConvertDashboard = ({ userData }) => {
  const router = useRouter();
  const proModal = useProModal();
  const settingsModal = useSettingsModal();
  const historyModal = useHistoryModal();

  const [inputChoice, setInputChoice] = useState("youtube");

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
    setConverting(false);
    router.refresh();
  }

  const onFail = () => {
    setFinished(true);
    setSuccess(false);
    setConverting(false);
    router.refresh();
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

    const data = await (event.target as any).getVideoData();
    console.log(event.target)
    setYoutubeName(data?.title);
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
        
      const convertParams = { 
        hasInstrumentals,
        hasBackingVocals,
        convertBackingVocals,
      };
      if (inputChoice === "youtube") {
        convertParams["youtubeId"] = youtubeId;
        convertParams["youtubeName"] = youtubeName;
      }

      await axios.post('/api/convert', convertParams)
        .then((response) => { setConversionId(response.data.conversionId); router.refresh(); })
        .catch((error) => {
          console.log("Error in submitting job");
          if (error?.response?.status === 403) {
              proModal.onOpen();
          } else {
              toast.error("Something went wrong.", { position: "bottom-center" });
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

  const inputNotReady = ((inputChoice === "upload" && !fileUploaded) ||
  (inputChoice === "youtube" && (!youtubeLinkValid || !youtubeId || youtubeError !== ""))) as boolean;

  const [players, toggle] = useMultiAudio({
    urls: userData.cloneResultUrls?.length ? userData.cloneResultUrls : []
  });

  return (
    <div>
        <HistoryModal userData={userData} />
        <SettingsModal userData={userData} />
        <div className="p-4 lg:px-8">
          <div className="mb-12">
            <div className="w-fit mx-auto text-center flex gap-2 text-xl items-center
                px-4 pt-2 rounded-t-sm bg-primary/25 border-2 border-b-0 pb-1 border-primary"
            >
                <ArrowDownIcon /> Your voice! <ArrowDownIcon />
            </div>
            <div className="flex justify-center items-center mb-4 px-4 p-2 gap-2 border-2 border-primary w-fit mx-auto rounded-sm shadow-md">
              {players?.length ? players.map((player, i) => {
                return (
                  <Player player={player} toggle={toggle(i)} />
                )}) : ""}
              <Button variant="ghost" onClick={() => settingsModal.onOpen()}>
                <SettingsIcon />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div id="upload-convert" 
              className="w-full lg:max-w-2xl"
            >
              <div className="p-4 border-2 bg-[white] rounded-sm shadow-md">
                <div className="mb-4 text-2xl">1. Song</div>
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
              </div>

              <div className="mt-2 p-4 border-2 bg-[white] rounded-sm shadow-md">
                <div className="text-2xl">2. Settings</div>
                <div className="my-4 flex items-center gap-2">
                  <Checkbox
                    id="has_instr"
                    className="w-6 h-6" 
                    checked={hasInstrumentals}
                    onCheckedChange={() => setHasInstrumentals(val => !val)}
                  />
                  <div>
                    <div className="font-medium">Does this song have instrumentals (background sounds)?</div>
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
                      <div className="font-medium">Does this song have multiple voices (backing vocals)?</div>
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
                  !fileUploaded ? "" : "hover:scale-105 transition")}
                >
                  <Button
                    type="submit"
                    size="lg" className="text-xl rounded-r-none border-2 border-black border-r-none"
                    disabled={inputNotReady || isConverting}
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
              <div className="mt-2">
                <AlertCard variant="warning" title="Important!"
                  message="Songs with layers of voices singing at once are more
                  difficult for our AI to handle. Our AI performs better when
                  there is a single voice." />
              </div>
            </div>
            
            <div id="output-recent" className="w-full lg:max-w-2xl">
              <div className="p-4 border-2 bg-[white] rounded-sm shadow-md">
                  <div className="font-normal text-2xl">3. Output</div>
                    {isConverting ?
                      <AlertCard title="Note" variant="default" message={
                          <div>You can view your results here and in the <Link href="/history">History</Link> page.</div>
                    } /> : ""}
                    <div>
                      {!isConverting && !isFinished ? <Empty label="Nothing to see here :)" /> : ""}
                    </div>
                    <div className="mt-4">
                      {(isConverting || isFinished) && error === "" && conversionId !== "" ?
                        <ProgressCard process="Conversion"
                          initStatus="IN_PROGRESS"
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
              <div className="mt-2 p-4 border-2 bg-[white] rounded-sm shadow-md">
                <div className="flex items-center justify-between">
                  <div className="text-2xl flex items-center gap-2">History <HistoryIcon /></div>
                  <Button className="text-xl" onClick={historyModal.onOpen}>
                    See All
                  </Button>
                </div>
                {userData.convertJobs.length ? 
                  <div className="py-2">
                    <HistoryTable userData={userData} mini={true} />
                  </div>
                  : <div className="mt-2 text-muted-foreground">No songs converted yet.</div>
                }
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}


export default ConvertDashboard;