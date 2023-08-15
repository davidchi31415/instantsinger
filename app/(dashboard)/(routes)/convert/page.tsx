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
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";


const ConvertPage = () => {
  const router = useRouter();
  const proModal = useProModal();

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

  const [fileKey, setFileKey] = useState(Date.now()); // For resetting file input
  const [fileUploaded, setFileUploaded] = useState(false);
  const [needsSep, setNeedsSep] = useState(true);

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
  }

  const onSubmit = async () => {
      reset(); 
      setConverting(true);
      
      if (!fileUploaded) return;
        
      await axios.post("/api/convert", { cloneName: cloneChoice, needsSep })
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
    if (isFinished && isSuccess && results === null && conversionId !== "") retrieveResults();
  }, [isFinished, isSuccess, results, conversionId]);

  return (
    <div>
        <div className="p-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div id="upload-convert" 
              className="w-full lg:max-w-2xl relative"
            >
              <div className="mb-4 font-bold text-2xl">Input</div>
              <FileUploader 
                uploadEndpoint="/api/convert/upload" 
                onUpload={() => setFileUploaded(true)} 
                isConvertUpload={true}
                key={fileKey}
                durationLimit={10}
              />

              <div className="mt-4 font-bold text-2xl">Voice Clone</div>
              <div className="mt-4 grid items-center gap-1.5">
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

              <div className="mt-4 font-bold text-2xl">Options</div>
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

              <div className={cn("mx-auto flex items-center justify-center mt-6 w-fit shadow-xl",
                cloneChoice === "" || !fileUploaded ? "" : "hover:scale-105 transition")}
              >
                <Button
                  type="submit"
                  size="lg" className="text-xl rounded-r-none border-2 border-black border-r-none"
                  disabled={cloneChoice === "" || !fileUploaded}
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


export default ConvertPage;