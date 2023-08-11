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

const MAX_FILE_SIZE = 100_000_000;


const ConversionDashboard = () => {
  const [cloneChoice, setCloneChoice] = useState<string>("");
  const [cloneNames, setCloneNames] = useState<string[]>([]);

  const getClones = async () => {
    const response = await axios.get("/api/clone/get-all");

    if (response.status === 200) {
      const clones = response.data.clones;
      const names = clones.map((clone) => clone.name);
      setCloneNames(names);
    }
  }

  useEffect(() => {
    getClones();
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [needsSep, setNeedsSep] = useState(true);

  const [audioDuration, setAudioDuration] = useState(0);
  const [audioSize, setAudioSize] = useState(0);
  const [audioTitle, setAudioTitle] = useState("");
  const [fileError, setFileError] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const [started, setStarted] = useState(false); 
  const [isUploading, setUploading] = useState(false);
  const [isConverting, setConverting] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [conversionId, setConversionId] = useState("");

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
          if (typeof audioArrayBuffer === "string") throw Error("Couldn't get Audio Buffer");

          ctx.decodeAudioData(audioArrayBuffer!).then(
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
    setError("");
    setUploading(false);
    setUploadProgress(0);
    setConverting(false);
    setFinished(false);
    setSuccess(false);
    setConversionId("");
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
        
          setConverting(true);
          const convertResponse = await axios.post("/api/convert", 
            { 
              cloneName: cloneChoice, 
              songName: audioTitle,
              needsSep
            }
          );

          if (convertResponse.status === 200) {
            setConversionId(convertResponse.data.conversionId);
          } else {
            console.log("Error in submitting job to Runpod");
            setError("Internal job submission failed.");
            setConverting(false);
            onFail();
          }
        })
        .catch(() => {
          setError("File upload failed.");
          setUploading(false);
          onFail();
        });
      } else {
        setError("Error in generating upload url");
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

  const [resultURLs, setResultURLs] = useState<string[]>([]);
  const [resultNames, setResultNames] = useState([]);

  const retrieveResults = async () => {
    const resultResponse = await axios.get("/api/convert/results", { params: { id: conversionId } });

    if (resultResponse.status === 200) {
      console.log("Results retrieved");

      // const results = resultResponse.data.urls;
      setResultURLs(resultResponse.data.urls);
      setResultNames(resultResponse.data.fileNames);
    } else {
      setError("Could not retrieve files.");
    }
  }

  useEffect(() => {
    if (isFinished && isSuccess && !resultURLs.length && conversionId !== "") retrieveResults();
  }, [isFinished, isSuccess, resultURLs, resultNames, conversionId]);

  return (
    <div>
        <div className="p-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div id="upload-convert" 
              className="w-full lg:max-w-2xl relative mb-4"
            >
              <div className="font-bold text-2xl">Input</div>
              <div>
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
                        {cloneNames.map((name) =>
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
                    disabled={file === null || cloneChoice === "" || fileError !== ""}
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
                {(isConverting || isFinished && error === "") && conversionId !== "" ?
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
                  (resultURLs.length ?
                    <ConversionResultsComponent resultURLs={resultURLs} fileNames={resultNames} songName={audioTitle} />
                    : "Retrieving results...")
                  : ""
                }
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}


export default ConversionDashboard;