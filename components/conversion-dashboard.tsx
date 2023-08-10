"use client"

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { ArrowRightLeftIcon, DownloadIcon, MessageSquare, Star, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { FileUploader } from "@/components/file-uploader";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { AlertCard } from "@/components/alert-card";
import { Loader } from "@/components/loader";
import { SongInfoCard } from "@/components/song-info-card";
import { ProgressBar } from "@/components/progress-bar";
import { cn, downloadFromURL, getFileName, isJobDone } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AudioCard } from "@/components/audio-card";
import Crunker from "crunker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressCard } from "@/components/progress-card";

const MAX_FILE_SIZE = 100_000_000;

interface ConversionDashboardProps {
  userData: {
    cloneNames: string[];
    currentJob: any | null;
  }
}

const ConversionDashboard = ({ userData }: ConversionDashboardProps) => {
  const [cloneChoice, setCloneChoice] = useState<string>(
    userData.cloneNames.length ? userData.cloneNames[0] : ""
  );

  const [file, setFile] = useState<File | null>(null);
  const [needsSep, setNeedsSep] = useState(true);

  const [audioDuration, setAudioDuration] = useState(0);
  const [audioSize, setAudioSize] = useState(0);
  const [audioTitle, setAudioTitle] = useState("");
  const [fileError, setFileError] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [preRunPodError, setPreRunPodError] = useState("");

  const [started, setStarted] = useState(
    userData.currentJob !== null ? !isJobDone({ status: userData.currentJob.status }) : false
  ); 
  const [isUploading, setUploading] = useState(false);
  const [isConverting, setConverting] = useState(
    userData.currentJob !== null ? !isJobDone({ status: userData.currentJob.status }) : false
  );
  const [isFinished, setFinished] = useState(
    userData.currentJob !== null ? isJobDone({ status: userData.currentJob.status }) : false
  );
  const [isSuccess, setSuccess] = useState(
    userData.currentJob !== null ? userData.currentJob.status === "COMPLETED" : false
  );

  const [resultURLs, setResultURLs] = useState<string[]>([]);
  const [mergedURL, setMergedURL] = useState<string>("");

  const onFileInput = (e: any) => {
    try {
      e.preventDefault();

      if (e.target?.files[0]) {
        const _file = e.target.files[0];
        setFile(_file);

        const size = _file.size;
        if (size > MAX_FILE_SIZE) {
          setFileError("File too big. Max size: 100MB");
          return;
        }
        setAudioSize(size);
        setAudioTitle(_file.name);

        let duration;
        const reader = new FileReader();
        reader.readAsArrayBuffer(_file!);
        reader.onloadend = (e) => {
          const ctx = new AudioContext();
          const audioArrayBuffer = e.target?.result;
          ctx.decodeAudioData(audioArrayBuffer).then(
            data => {
              duration = data.duration;
              setFileError("");
              setAudioDuration(duration);
          }).catch(
            _ => setFileError(
              "Audio file failed to load. Possibly corrupted."
            )
          );
        }
      } else {
        onRemove();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onRemove = () => {
    setFile(null);
    setFileError("");
    setAudioDuration(0);
    setAudioSize(0);
  }

  const onFinish = () => {
    setFinished(true);
    setSuccess(true);
  }

  const onFail = () => {
    setFinished(true);
    setSuccess(false);
  }

  const reset = () => {
    setPreRunPodError("");
    setUploading(false);
    setUploadProgress(0);
    setConverting(false);
    setFinished(false);
    setSuccess(false);
    setResultURLs([]);
    setMergedURL("");
  }

  const onSubmit = async () => {
    try {
      reset(); setStarted(true);
      
      if (fileError !== "" || file === null) return;
      
      setUploading(true);
      const response = await axios.get("/api/convert/upload");

      if (response.status === 200) {
        const url = response.data.url;
        console.log(response.data.url);
    
        await axios.put(url, file, {
          headers: {
            "Content-Type": 'application/octet-stream'
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.total;
            if (totalLength) {
                setUploadProgress(Math.round( (progressEvent.loaded * 100) / totalLength ));
            }
          }
        }).then(async () => {
          console.log("File upload successful");
          setUploading(false);
          
          await axios.post("/api/convert", 
            { 
              cloneName: cloneChoice, 
              needsSep
            }
          )
          .then(() => setConverting(true))
          .catch(() => {
            console.log("Error in submitting job to Runpod");
            setPreRunPodError("Internal job submission failed.");
            setConverting(false);
            onFail();
          });
        })
        .catch(() => {
          console.log("File upload failed");
          setPreRunPodError("File upload failed.");
          setUploading(false);
          onFail();
        });
      } else {
        console.log("Error in generating url");
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
          // proModal.onOpen();
      } else {
          console.log("[SUBMIT ERROR]", error);
          toast.error("Something went wrong.");
      }
      setFinished(true); setSuccess(false);
    } finally {
    }
  }

  const retrieveResults = async () => {
    const resultResponse = await axios.get("/api/convert/results");

    if (resultResponse.status === 200) {
      console.log("Results retrieved");

      const results = resultResponse.data.urls;
      setResultURLs(resultResponse.data.urls);

      if (results.length > 1) {
        let crunker = new Crunker();
        crunker
        .fetchAudio(results[0], results[1])
        .then((buffers) => {
            // => [AudioBuffer, AudioBuffer]
            return crunker.mergeAudio(buffers);
        })
        .then((merged) => {
            // => AudioBuffer
            return crunker.export(merged, 'audio/wav');
        })
        .then((output) => {
            // => {blob, element, url}
            setMergedURL(output.url);
            console.log("Results merged.");
        })
        .catch((error) => {
            // => Error Message
        });
      } else {
        console.log("[RESULTS RETRIEVAL ERROR]");
      }
    }
  }

  useEffect(() => {
    if (isFinished && isSuccess && !resultURLs?.length) {
      retrieveResults();
    }
  }, [isFinished, isSuccess, resultURLs]);

  const conversionOngoing = isUploading || isConverting;

  return (
    <div>
        <div className="p-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div id="upload-convert" 
              className="w-full lg:max-w-2xl relative mb-4"
            >
              {!conversionOngoing ? "" :
              <Card 
                  className="absolute top-1/2 left-1/2 
                  transform -translate-x-1/2 -translate-y-1/2 z-10
                  text-3xl p-4 shadow-xl"
              >Please wait for the current conversion to finish.</Card>}
              <div className="font-bold text-2xl">Input</div>
              <div className={!conversionOngoing ? "" : "pointer-events-none blur-md"}>
                <div className="pt-4 grid items-center gap-1.5">
                  <Input
                    id="song"
                    type="file"
                    className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                    file:border file:rounded-md cursor:pointer"
                    onChange={onFileInput}
                  />
                </div>
                <div className="text-muted-foreground mt-2 mb-4 text-sm">Accepted: MP3, WAV, FLAC, M4A</div>
                
                <div className="mb-4">
                  {file === null ? ""
                  : (fileError !== "" ? <AlertCard variant="destructive" title="Error" message={fileError} />
                    : <SongInfoCard songName={audioTitle} songDuration={audioDuration} songSize={audioSize} />
                  )}
                </div>

                <div className="font-bold text-2xl">Voice Clone</div>
                <div className="pt-4 grid items-center gap-1.5">
                  <Select onValueChange={(val) => setCloneChoice(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Voice Clone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {userData.cloneNames.map((name) =>
                          <SelectItem value={name} className="cursor-pointer">{name}</SelectItem>)
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="font-bold mt-4 text-2xl">Options</div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="has_instr"
                    className="w-6 h-6" 
                    checked={needsSep}
                    onCheckedChange={() => setNeedsSep(val => !val)}
                  />
                  <div>
                    <div className="font-medium mt-3">Does song include instrumentals and/or backing vocals?</div>
                    <div className="text-muted-foreground text-sm">If so, we must do extra processing to extract the lead vocals.</div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6">
                  <Button
                    type="submit"
                    size="lg" className="text-xl"
                    disabled={file === null || fileError !== "" || conversionOngoing}
                    onClick={onSubmit}
                  >
                    Convert
                  </Button>
                </div>
              </div>
            </div>
            
            <div id="output-recent" className="w-full lg:max-w-2xl">
              <div className="font-bold text-2xl">Output</div>
              <div className="pt-4">
                  {started ?
                    <AlertCard title="Note" variant="default" message={
                      <>
                      {isUploading ?
                        <div>Do not leave this page while the file is uploading, or you will have to resubmit the request. You will not be charged until the actual conversion finishes.</div>
                        : <div>You can view your results here and in the <Link href="/history">History</Link> page.</div>
                        }
                      </>
                    }/> : ""
                  }
              </div>
              <div>
                {started || isFinished ?
                  (isUploading ? 
                    <Card className="p-4 mt-4">
                      <Progress value={uploadProgress} className="w-full bg-[lightgray]" />
                      <div className="text-sm text-muted-foreground mt-1">
                          Uploading file: {uploadProgress}%
                      </div>
                    </Card> : "")
                  : <Empty label="Nothing to see here :)" />}
              </div>
              <div className="mt-4">
                {isConverting || isFinished && preRunPodError === "" ?
                  <ProgressCard process="Conversion" 
                    initStatus={
                      userData.currentJob !== null ? userData.currentJob.status : ""
                    }
                    apiEndpoint="/api/convert/status"
                    onFinish={onFinish}
                    onFail={onFail}
                  />
                    : ""}
              </div>
              <div className="mt-4">
                {preRunPodError !== "" ?
                  <AlertCard variant="destructive" title="Error" message={preRunPodError} />
                    : ""
                }
              </div>
              <div>
                {isFinished && resultURLs?.length ? 
                  <div className="border border-black/10 rounded-md p-4">
                    {
                      resultURLs?.length > 1 ? 
                        (mergedURL !== "" ? 
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="font-medium mb-2">Merged</div>
                              <Button variant="ghost" size="icon" 
                                onClick={() => downloadFromURL(mergedURL, "merged.wav")}
                              >
                                <DownloadIcon />
                              </Button>
                            </div>
                            <AudioCard url={mergedURL} /> 
                          </div>
                          : 
                            <div>
                              <AlertCard 
                                variant="default" title="Merging" 
                                message="Please wait as we merge the instrumental and vocal stems." 
                              />
                            </div>
                        ) : ""
                    }
                    {resultURLs.map((url, i) => {
                      return (
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <div className="font-medium mb-2">{ i == resultURLs.length - 1 ? "Vocals" : "Instrumentals" }</div>
                            <Button variant="ghost" size="icon" 
                              onClick={() => downloadFromURL(url, i == resultURLs.length - 1 ? "vocals.wav" : "instrumentals.wav")}
                            >
                              <DownloadIcon />
                            </Button>
                          </div>
                          <AudioCard url={url} />
                        </div>  
                      )
                    })}
                  </div>
                  : ""}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}


export default ConversionDashboard;