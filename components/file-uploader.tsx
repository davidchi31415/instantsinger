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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty } from "@/components/empty";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { AlertCard } from "@/components/alert-card";
import { Loader } from "@/components/loader";
import { SongInfoCard } from "@/components/song-info-card";
import { ProgressBar } from "@/components/progress-bar";
import { cn, downloadFromURL, getFileName } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AudioCard } from "@/components/audio-card";
import Crunker from "crunker";
import { MAX_FILE_SIZE } from "@/app/(dashboard)/(routes)/convert/constants";

interface CloningFileUploaderProps {
  uploadEndpoint: string;
  onUpload?: Function;
  apiParams?: any;
  isConvertUpload?: boolean;
  durationLimit?: number; // Minutes
}

export const FileUploader = ({ uploadEndpoint, onUpload, apiParams, isConvertUpload, durationLimit }: CloningFileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const [audioTitle, setAudioTitle] = useState("");
  const [fileError, setFileError] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  const [started, setStarted] = useState(false);
  const [isUploading, setUploading] = useState(false);

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
              if (durationLimit && duration > durationLimit * 60) {
                setFileError(`Max duration is ${durationLimit}`)
              } else {
                setFileError("");
              }
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
  }

  const onSubmit = async () => {
    try {
      setStarted(true);
      setLoading(true);

      if (fileError !== "" || file === null) return;
      
      let response 
      if (apiParams) {
        response = await axios.post(uploadEndpoint, apiParams);
      } else if (isConvertUpload) {
        response = await axios.post(uploadEndpoint, { songName: audioTitle });
      } else {
        response = await axios.post(uploadEndpoint);
      }

      if (response.status === 200) {
        const url = response.data.url;
        console.log(response.data.url);
    
        setUploading(true);
        const uploadResponse = await axios.put(url, file, {
          headers: {
            "Content-Type": 'application/octet-stream',
            "x-goog-content-length-range": `0,${MAX_FILE_SIZE}`
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
          setUploading(false);
          if (onUpload) onUpload();
        } else {
          console.log("File upload failed");
          setUploading(false);
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
        setLoading(false);
    }
  }

  return (
      <>
        <div className="flex items-center gap-1.5">
          <Input
            id="song"
            type="file"
            className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
            file:border file:rounded-md cursor:pointer"
            onChange={onFileInput}
          />
          <Button
            type="submit"
            size="lg" className="text-xl border-2 border-black shadow-xl"
            disabled={file === null || fileError !== "" || isLoading}
            onClick={onSubmit}
          >
            {!isLoading ? "Upload" : "Uploading"}
          </Button>
        </div>
        <div className="text-muted-foreground mt-2 mb-4 text-sm">Accepted: MP3, WAV, FLAC, M4A</div>
        
        {file === null ? ""
        : (fileError !== "" ? <AlertCard variant="destructive" title="Error" message={fileError} />
          : (started ?
            <Card className="p-4">
              <Progress value={uploadProgress} className="w-full bg-[lightgray]" />
              <div className="text-sm text-muted-foreground mt-1">
                  {isUploading ? `Uploading file: ${uploadProgress}%`
                  : "Upload finished."}
              </div>      
            </Card> : "")
        )}
    </>
  )
}