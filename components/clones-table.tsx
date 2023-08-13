"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";  
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { ProgressCard } from "./progress-card";
import { useState } from "react";
import { isJobDone } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

interface ClonesTableProps {
    userData: {
        clones: any[];
        currentJob: any;
    }
    currentJobStatus: string;
    onCurrentJobUpdate: Function;
}

export const ClonesTable = ({ userData, currentJobStatus, onCurrentJobUpdate }: ClonesTableProps) => {
    const [pageIndex, setPageIndex] = useState(0);
    const jobsPerPage = 12;

    const [jobs, setJobs] = useState(userData.currentJob ? [userData.currentJob, ...userData.clones] : userData.clones);
    const numPages = Math.ceil(jobs.length / jobsPerPage);
 
    console.log(jobs)

    return (
        <>
            <div className="text-center mb-4 text-muted-foreground">
                Need a voice clone? Go to the <b>Create a Clone</b> tab.
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[8em]">Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right"><div className="pr-2">Status</div></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.slice(pageIndex * jobsPerPage, (pageIndex+1) * jobsPerPage).map((job) => {
                        if (!job?.status) {
                            return <TableRow>
                                <TableCell className="font-medium">
                                    {format(job.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{job.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className="bg-[#33ff66] text-black">
                                        READY
                                    </Badge>
                                </TableCell>   
                            </TableRow>
                        } else {
                            return <TableRow>
                                <TableCell className="font-medium">
                                    {format(job.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{job.name}</TableCell>
                                <TableCell className="text-right">
                                    <ProgressCard 
                                        process="Cloning" apiEndpoint="/api/clone/status" apiId={job.id}
                                        initStatus={currentJobStatus}
                                        onStatusChange={onCurrentJobUpdate}
                                        badgeOnly={true}
                                    />
                                </TableCell>   
                            </TableRow>
                        }
                        })}
                </TableBody>
            </Table>
            <div className="mt-8 flex items-center justify-center">
                <Button size="icon" className="mr-2"
                    onClick={() => setPageIndex(0)}
                    disabled={pageIndex <= 0}
                >
                    <ChevronsLeftIcon />
                </Button>
                <Button size="icon" className="mr-4"
                    onClick={() => setPageIndex(p => Math.max(0, p-1))}
                    disabled={pageIndex <= 0}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button size="icon" className="mr-2"
                    onClick={() => setPageIndex(p => Math.min(p+1, numPages - 1))}
                    disabled={pageIndex >= numPages - 1}
                >
                    <ChevronRightIcon />
                </Button>
                <Button size="icon"
                    onClick={() => setPageIndex(numPages - 1)}
                    disabled={pageIndex >= numPages - 1}
                >
                    <ChevronsRightIcon />
                </Button>
            </div>
        </>
    )
}