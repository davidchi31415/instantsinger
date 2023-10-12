"use client";

import { useCloneFeedbackModal, useConvertFeedbackModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { CheckCircleIcon } from "lucide-react";

export const CloneFeedbackModal = ({ clone }) => {
  const modal = useCloneFeedbackModal();
  const [isMounted, setMounted] = useState(false);
  const [soundsLike, setSoundsLike] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);

  if (!isMounted) return null;

  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("/api/clone/feedback", { jobId: clone.id, soundsLike, rating, comment })
        .then(() => setSubmitted(true))
        .catch((error) => {
          toast.error("Something went wrong", { position: "bottom-center" });
        });
    } catch (err) {
        toast.error("Something went wrong", { position: "bottom-center" });
    } finally {
        setLoading(false);
    }
  }

  return (
      <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
        <DialogContent className="max-w-[300px] md:max-w-md rounded-xl shadow-xl">
          <DialogHeader className="overflow-x-clip h-[275px]">
                <DialogTitle 
                    className="flex justify-center items-center
                    flex-col gap-y-4 pb-2"
                >
                    <div className="text-2xl flex items-center gap-x-2 p-2">
                      Clone Feedback
                    </div>
                </DialogTitle>
                {submitted &&
                  <div className="text-xl">
                    <div className="w-fit mx-auto mb-8"><CheckCircleIcon size={100} color="green" /></div>
                    <p className="text-center">Your feedback has been received!</p>
                  </div>
                }
                {!submitted &&
                <DialogDescription
                    className="pt-2 text-zinc-900 font-normal flex flex-col gap-2 text-lg"
                >
                  <div className="flex items-center gap-2 justify-between flex-wrap">
                    <p>
                      Does your clone sound like you?
                    </p>
                    <Tabs defaultValue={soundsLike ? "yes" : "no"} onValueChange={(val) => setSoundsLike(val === "yes" ? true : false)}>
                      <TabsList className="grid w-full grid-cols-2 border bg-primary/25">
                        <TabsTrigger value="no">No</TabsTrigger>
                        <TabsTrigger value="yes">Yes</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="flex items-center gap-2 justify-between flex-wrap">
                    <p>
                      Rate it:
                    </p>
                    <div className="flex items-center">
                      {Array(5).fill(1).map((x, y) => x + y).map(
                        selectRating => 
                          <Button variant="outline" className={cn("rounded-none border-2", rating === selectRating ? "border-primary" : "")}
                            onClick={() => setRating(selectRating)} key={selectRating}
                          >
                            {selectRating}
                          </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between flex-wrap">
                    <p>
                      Comments? <span className="text-muted-foreground text-sm">(max 100 chars.)</span>
                    </p>
                    <Input maxLength={100} onChange={(e) => setComment(e.target.value)} />
                  </div>
                </DialogDescription>}
            </DialogHeader>
            <DialogFooter>
              {submitted &&
                <Button className="w-fit p-4 text-xl mx-auto font-normal" onClick={() => { modal.onClose(); }}>Okay</Button>
              }
              {!submitted &&
                <Button
                  disabled={loading}
                  className="w-fit p-4 text-xl mx-auto font-normal" onClick={onSubmit}
                >
                  Submit
                </Button>}
            </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export const ConvertFeedbackModal = ({ results }) => {
    const modal = useConvertFeedbackModal();
    const [isMounted, setMounted] = useState(false);
    const [soundsLike, setSoundsLike] = useState(true);
    const [rating, setRating] = useState(5);
    const [reason, setReason] = useState("too-high");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    const onSubmit = async () => {
      try {
        setLoading(true);
        await axios.post("/api/convert/feedback", { jobId: results.id, soundsLike, rating, reason, comment })
          .then(() => setSubmitted(true))
          .catch((error) => {
            toast.error("Something went wrong", { position: "bottom-center" });
          });
      } catch (err) {
          toast.error("Something went wrong", { position: "bottom-center" });
      } finally {
          setLoading(false);
      }
    }

    return (
        <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
          <DialogContent className="max-w-[300px] md:max-w-md rounded-xl shadow-xl">
            <DialogHeader className="overflow-x-clip h-[275px]">
                  <DialogTitle 
                      className="flex justify-center items-center
                      flex-col gap-y-4 pb-2"
                  >
                      <div className="text-2xl flex items-center gap-x-2 p-2">
                        Feedback
                      </div>
                  </DialogTitle>
                  {submitted &&
                    <div className="text-xl">
                      <div className="w-fit mx-auto mb-8"><CheckCircleIcon size={100} color="green" /></div>
                      <p className="text-center">Your feedback has been received!</p>
                      {!soundsLike && <p>We will get back to you shortly (by email).</p>}
                    </div>
                  }
                  {!submitted &&
                  <DialogDescription
                      className="pt-2 text-zinc-900 font-normal flex flex-col gap-2 text-lg"
                  >
                    <div className="flex items-center gap-2 justify-between flex-wrap">
                      <p>
                        Does it sound like you?
                      </p>
                      <Tabs defaultValue={soundsLike ? "yes" : "no"} onValueChange={(val) => setSoundsLike(val === "yes" ? true : false)}>
                        <TabsList className="grid w-full grid-cols-2 border bg-primary/25">
                          <TabsTrigger value="no">No</TabsTrigger>
                          <TabsTrigger value="yes">Yes</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    {soundsLike && <div className="flex items-center gap-2 justify-between flex-wrap">
                      <p>
                        Rate it:
                      </p>
                      <div className="flex items-center">
                        {Array(5).fill(1).map((x, y) => x + y).map(
                          selectRating => 
                            <Button variant="outline" className={cn("rounded-none border-2", rating === selectRating ? "border-primary" : "")}
                              onClick={() => setRating(selectRating)} key={selectRating}
                            >
                              {selectRating}
                            </Button>
                        )}
                      </div>
                    </div>}
                    {!soundsLike && <div className="flex items-center gap-2 justify-between flex-wrap">
                      <p>
                        Why not?
                      </p>
                      <div className="w-[8rem]">
                        <Select onValueChange={(val) => setReason(val)}
                          defaultValue="too-high"
                        >
                          <SelectTrigger>
                            <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="too-high" className="cursor-pointer">Too high</SelectItem>
                              <SelectItem value="too-deep" className="cursor-pointer">Too deep</SelectItem>
                              <SelectItem value="other" className="cursor-pointer">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>}
                    <div className="flex items-center gap-2 justify-between flex-wrap">
                      {(!soundsLike && reason === "other") ?
                        <p>
                          Explain <span className="text-muted-foreground text-sm">(max 100 chars.)</span>
                        </p>
                        :
                        <p>
                          Comments? <span className="text-muted-foreground text-sm">(max 100 chars.)</span>
                        </p>}
                      <Input maxLength={100} onChange={(e) => setComment(e.target.value)} />
                    </div>
                  </DialogDescription>}
              </DialogHeader>
              <DialogFooter>
                {submitted &&
                  <Button className="w-fit p-4 text-xl mx-auto font-normal" onClick={() => { modal.onClose(); }}>Okay</Button>
                }
                {!submitted &&
                  <Button
                    disabled={loading}
                    className="w-fit p-4 text-xl mx-auto font-normal" onClick={onSubmit}
                  >
                    Submit
                  </Button>}
              </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}