"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressCard } from "@/components/progress-card";
import { ConversionResultsComponent } from "@/components/conversion-results";
import { FileUploader } from "@/components/file-uploader";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import { cn, isJobDone, parseYoutubeLink } from "@/lib/utils";
import { useNeedsCloneModal, useProModal, useSettingsModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import YouTube, { YouTubeProps } from 'react-youtube';
import { ArrowDownIcon, PauseIcon, PlayIcon, SettingsIcon } from "lucide-react";
import { HistoryTable } from "./history-table";
import { useMultiAudio } from "@/hooks/use-multi-audio";
import { SettingsModal } from "./settings-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RecordPlayerComponent } from "./record-player/record-player";
import { NeedsCloneModal } from "./needs-clone-modal";

const Player = ({ player, toggle }) => {
  return (
      <Button variant="ghost" className="text-primary" onClick={toggle}>
          {player.playing ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
      </Button>
  )
}

const CloneDemo = ({ userData, players, toggle, settingsModal }) => {
  return (
    <div className="mb-12 mx-auto w-fit">
      <div className="w-[13rem] mx-auto text-center flex justify-center gap-2 text-xl items-center
          px-4 pt-2 rounded-t-sm bg-primary/25 border-2 border-b-0 pb-1 border-primary"
      >
          <ArrowDownIcon /> Your voice! <ArrowDownIcon />
      </div>
      <div className="flex justify-center items-center px-4 p-2 gap-2 border-2 border-primary bg-white w-fit mx-auto rounded-sm shadow-md">
        {players?.length ? players.map((player, i) => {
          return (
            <Player player={player} toggle={toggle(i)} />
          )}) : ""}
      </div>
      <div className="w-[13rem] mx-auto text-center flex justify-between gap-2 text-xl items-center
        px-4 py-2 rounded-b-sm bg-primary/25 border-2 border-t-0 border-primary"
      >
        <Link href={`/voice?id=${userData?.clone?.id}`}><Button className="text-lg">Share it!</Button></Link>
        <Button variant="ghost" onClick={() => settingsModal.onOpen()}>
          <SettingsIcon fill="white" />
        </Button>
      </div>
    </div>
  )
}

export const Dashboard = ({ userData }) => {
  const router = useRouter();
  const proModal = useProModal();
  const settingsModal = useSettingsModal();
  const needsCloneModal = useNeedsCloneModal();

  const cloningInProgress = (userData.cloneJob && userData.cloneJob?.status !== "NOT_SUBMITTED");
  useEffect(() => {
    if (!userData.clone && !(cloningInProgress)) {
      needsCloneModal.onOpen();
    }
  }, []);

  const [inputChoice, setInputChoice] = useState("youtube");

  const [youtubeKey, setYoutubeKey] = useState(Date.now()); // For resetting component
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeLinkValid, setYoutubeLinkValid] = useState(false);
  const [youtubeError, setYoutubeError] = useState("");
  const [youtubeName, setYoutubeName] = useState("");
  const youtubeId = parseYoutubeLink(youtubeLink);

  const [fileKey, setFileKey] = useState(Date.now()); // For resetting file input
  const [fileUploaded, setFileUploaded] = useState(false);

  const [currentStatus, setCurrentStatus] = useState(
    userData?.currentConvertJob ? userData.currentConvertJob.status : ""
  );
  const [isConverting, setConverting] = useState(
    userData?.currentConvertJob ? true : false
  );

  const [conversionId, setConversionId] = useState(
    userData?.currentConvertJob ? userData.currentConvertJob.id : ""
  );
  const [recordPlaying, setRecordPlaying] = useState(false); 

  const reset = () => {
    setConverting(false);
    setConversionId("");
    setResults(null);
    setCurrentStatus("");
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
  };

  const onSubmit = async () => {
      if (!userData.clone) {
        toast.error("You need a voice clone first", { position: "bottom-center" });
        return;
      }
      reset(); 
      setConverting(true);
      
      if (inputChoice === "upload" && !fileUploaded) return;
      if (inputChoice === "youtube" && (youtubeError !== "" || youtubeLink === "" || !youtubeId)) return;
        
      const convertParams = {};
      if (inputChoice === "youtube") {
        convertParams["youtubeId"] = youtubeId;
        convertParams["youtubeName"] = youtubeName;
      }

      setConverting(true); 
      await axios.post('/api/convert', convertParams)
        .then((response) => { 
          setConversionId(response.data.conversionId); 
          setCurrentStatus(response.data.status);
          
          router.refresh();
        })
        .catch((error) => {
          if (error?.response?.status === 403) {
              proModal.onOpen();
          } else {
              toast.error("Something went wrong.", { position: "bottom-center" });
          }
          setConverting(false);
        })
        .finally(() => {
          setFileUploaded(false);
          setYoutubeLink("");
          setYoutubeLinkValid(false);
        });
  }

  const [retrievingResults, setRetrieving] = useState(false);
  const [results, setResults] = useState<any>(null);
  // const [results, setResults] = useState({ public: true, owner: true, urls: ["https://storage.googleapis.com/instantsinger-public/male_converted/sample_1.wav"], songName: "Can't Tell Me Nothing" });

  const retrieveResults = async (job?) => {
    let id = job ? job.id : conversionId;
    setRetrieving(true);
    setResults(null);
    const resultResponse = await axios.get("/api/convert/results", { params: { id } });

    if (resultResponse.status === 200) {
      setResults({...resultResponse.data, owner: true});
    } else {
      toast.error("Could not retrieve results.", { position: "bottom-center" });
    }
    setRetrieving(false);
  }

  useEffect(() => {
    if (isJobDone({ status: currentStatus }) && isConverting) {
      setConverting(false);
      retrieveResults();
    }
  }, [isConverting, currentStatus]);

  const inputNotReady = ((inputChoice === "upload" && !fileUploaded) ||
  (inputChoice === "youtube" && (!youtubeLinkValid || !youtubeId || youtubeError !== ""))) as boolean;

  const [players, toggle] = useMultiAudio({
    urls: userData.cloneResultUrls?.length ? userData.cloneResultUrls : []
  });

  const songName = youtubeName ? `"${youtubeName}"` : (userData?.currentConvertJob ? userData?.currentConvertJob.songName : "");

  return (
    <div>
        <NeedsCloneModal />
        <SettingsModal userData={userData} />
        <div className="p-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              {userData.clone ?
                <CloneDemo userData={userData} players={players} toggle={toggle} settingsModal={settingsModal} />
                :
                cloningInProgress ?
                  <div className="mb-12 w-[18rem] md:w-[25rem]">
                      <ProgressCard 
                          process="Cloning" apiEndpoint="/api/clone/status" apiId={userData.cloneJob.id}
                          onStatusChange={() => router.refresh()}
                          initStatus={userData.cloneJob.status}
                      />
                  </div>
                  :
                  <div className="mb-12 mx-auto w-fit p-4 rounded-md flex items-center flex-wrap gap-6
                    bg-primary/10 shadow-xl border-2 border-primary"
                  >
                    <div className="text-center w-fit mx-auto text-lg">You need a voice clone!</div>
                    <Button className="w-fit mx-auto text-xl font-normal"
                      onClick={needsCloneModal.onOpen}
                    >
                      Get Cloned
                    </Button>
                  </div>}
              <Tabs defaultValue="convert" className="w-[300px] md:w-[400px] lg:w-[450px] xl:w-[500px]">
                <TabsList className="grid w-full grid-cols-2 border">
                  <TabsTrigger value="convert">Convert a Song</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="convert">
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle>Convert a Song</CardTitle>
                      <CardDescription>
                        Pick any song. Hear it in your voice.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="mb-4 flex items-center gap-4">
                        <div>Input:</div>
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
                            <div>URL:</div>
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
                            <div className="my-4 flex justify-center hidden">
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
                        />}
                    </CardContent>
                    <CardFooter>
                      {userData.clone ?
                        <div className={cn("mx-auto flex items-center justify-center w-fit shadow-xl",
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
                        :
                          cloningInProgress ?
                          <div className="text-center w-fit mx-auto">Please wait for your clone to be ready.</div>
                          : 
                          <div className="text-center w-fit mx-auto">You need a voice clone first.</div>}
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle>History{" "}
                        <Link href="/dashboard/history" className="ml-4 text-sm font-normal">(see all)</Link>
                      </CardTitle>
                      <CardDescription>
                        Here are all your past conversions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {userData.convertJobs.length ? 
                        <HistoryTable userData={userData} mini={true} 
                          onSelect={async (job) => {
                            if (job.id !== results?.id) {
                              await retrieveResults(job);
                            }
                          }}
                        />
                        : <div className="mt-2 text-muted-foreground">No songs converted yet.</div>
                      }
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <div className="hidden lg:block my-8 w-fit mx-auto">
                <RecordPlayerComponent playing={recordPlaying || players.some(e => e.playing)} />
              </div>
              {isConverting || results || retrievingResults ? "" :
                <div className="mt-16 max-w-sm text-center mx-auto text-muted-foreground text-md">
                  "He who sings scares away his woes."
                </div>}
              <div className="max-w-md lg:max-w-2xl mx-auto mt-2 lg:mt-12">
                {isConverting && !conversionId ?
                  <div className="mb-4">
                    <ProgressCard process="Converting" songName={songName}
                      initStatus="NOT_SUBMITTED" staticCard={true}
                    />
                  </div>
                  : ""}
                {isConverting  && conversionId ?
                  <div className="mb-4">
                    <ProgressCard process="Converting" songName={songName}
                      initStatus={currentStatus}
                      apiEndpoint="/api/convert/status" apiId={conversionId}
                      onStatusChange={(newStatus) => {
                        if (isJobDone({ status: newStatus })) {
                          setCurrentStatus(newStatus);
                        }
                      }}
                    />
                  </div>
                  : ""}
                {retrievingResults ?
                  <ProgressCard process="Retrieving results"
                    noStatus={true} staticCard={true}
                  />
                  : ""}
                {results ?
                  <ConversionResultsComponent results={results} mini={true} 
                    onPlay={() => setRecordPlaying(true)}
                    onStop={() => setRecordPlaying(false)}
                  />
                  : ""
                }
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}