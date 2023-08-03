"use client"

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { ArrowRightLeftIcon, MessageSquare, Star, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { MAX_FILE_SIZE, formSchema } from "./constants";
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
import { SongCard } from "@/components/song-card";
import { ProgressBar } from "@/components/progress-bar";
import { getFileName } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const ConversionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [needsSep, setNeedsSep] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [audioDuration, setAudioDuration] = useState(0);
  const [audioSize, setAudioSize] = useState(0);
  const [audioTitle, setAudioTitle] = useState("");
  const [fileError, setFileError] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  const [isUploading, setUploading] = useState(false);
  const [isConverting, setConverting] = useState(false);
  const [isFinished, setFinished] = useState(false);

  const onUpload = (e: any) => {
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

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (fileError !== "" || file === null) return;
      
      const response = await axios.get("/api/convert/upload");
      const url = response.data.url;
      console.log(response.data.url);

      if (response.status === 200) {
        setUploading(true);
        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": 'application/octet-stream'
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.total;
            if (totalLength) {
                setUploadProgress(Math.round( (progressEvent.loaded * 100) / totalLength ));
            }
          }
        });

        if (uploadResponse.status === 200) {
          console.log("File upload successful");

          // const runResponse = await axios.post("/api/convert");
          // if (runResponse.status === 200) {
          //   console.log("Runpod submission successful");
          // } else {
          //   console.log("Error in submitting job to Runpod");
          // }
        } else {
          console.log("File upload failed");
        }
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
    } finally {
        // router.refresh();
        setUploading(false);
        setConverting(false);
        setLoading(false);
    }
  }

  return (
    <div>
        <Heading
            title="Convert"
            description="Convert any song into your own voice."
            icon={ArrowRightLeftIcon}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
        />
        <div className="px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div id="upload-convert">
              <div className="font-bold text-2xl">Choose a Song</div>
              <div className="pt-4 grid w-full lg:max-w-md items-center gap-1.5">
                <Input
                  id="song"
                  type="file"
                  className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                  file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600
                  cursor:pointer"
                  onChange={onUpload}
                />
              </div>
              <div className="text-muted-foreground mt-2 mb-4 text-sm">Accepted: MP3, WAV, FLAC, M4A</div>
              
              <div className="w-full lg:max-w-md">
                {file === null ? ""
                : (fileError !== "" ? <AlertCard variant="destructive" title="Error" message={fileError} />
                  : <SongCard songName={audioTitle} songDuration={audioDuration} songSize={audioSize} />
                )}
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
                  <div className="font-medium mt-3">Does this audio include instrumentals?</div>
                  <div className="text-muted-foreground text-sm">If so, we must perform additional processing.</div>
                </div>
              </div>

              <div className="w-full lg:max-w-md flex items-center justify-center mt-6">
                <Button
                  type="submit"
                  size="lg" className="text-xl"
                  disabled={file === null || fileError !== "" || isLoading}
                  onClick={onSubmit}
                >
                  {!isLoading ? "Convert" : "Converting"}
                </Button>
              </div>
              <div className="mt-5 w-full lg:max-w-md">
                <AlertCard title="Notes" variant="default" message={
                  <>
                    <div>
                      Do not leave this page while the file is uploading, or
                      you will have to resubmit the request. You will not be charged until the actual conversion begins.
                      You can view your results in the Output panel or in the <Link href="/history">History</Link> page.
                    </div>
                  </>
                }/>
              </div>
            </div>
            
            <div id="output-recent">
              <div className="font-bold text-2xl">Output</div>
              <div className="pt-4 w-full lg:max-w-md">
                {isLoading ?
                  <Card className="p-4 border border-black/50">
                    <Progress value={uploadProgress} className="w-full bg-[lightgray]" />
                    <div className="text-sm text-muted-foreground mt-1">
                        {isUploading ? `Uploading file: ${uploadProgress}%`
                        : "Upload finished."}
                    </div>      
                  </Card> : <Empty label="Nothing to see here :)" />}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}


export default ConversionPage;