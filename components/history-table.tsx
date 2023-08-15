"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";  
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { ProgressCard } from "./progress-card";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { isJobDone } from "@/lib/utils";

type ConvertJob = {
    id: string
    date: Date
    songName: string
    cloneName: string
    status: "pending" | "processing" | "success" | "failed"
}
  

interface HistoryTableProps {
    userData: {
        conversions: any[];
        currentJobs: any[];
    }
}

export const HistoryTable = ({ userData }: HistoryTableProps) => {
    const router = useRouter();

    const [pageIndex, setPageIndex] = useState(0);
    const jobsPerPage = 12;

    const [jobs, setJobs] = useState([...userData.currentJobs, ...userData.conversions]);
    const numPages = Math.ceil(jobs.length / jobsPerPage);
 
    return (
        <>
            <div className="text-center mb-4 text-muted-foreground">
                Want to convert a song? Go to the <Link href="/convert"><b>Convert</b></Link> page.
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[8em]">Date</TableHead>
                        <TableHead>Song Name</TableHead>
                        <TableHead>Clone Name</TableHead>
                        <TableHead className="text-right"><div className="pr-2">Status</div></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.slice(pageIndex * jobsPerPage, (pageIndex+1) * jobsPerPage).map((job) => {
                        if (isJobDone({ status: job.status })) {
                            return <TableRow
                                className="cursor-pointer"
                                onClick={() => { router.push(`/convert/result?id=${job.id}`) }}
                            >
                                <TableCell className="font-medium">
                                    {format(job.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{job.songName}</TableCell>
                                <TableCell>{job.cloneName}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={
                                        job.status === "COMPLETED" ? "bg-[#33ff66] text-black" : 
                                        (job.status === "FAILED" || job.status === "CANCELLED"
                                            ? "bg-destructive" : "bg-[#6699ff]")
                                    }>
                                        {job.status}
                                    </Badge>
                                </TableCell>   
                            </TableRow>
                        } else {
                            return <TableRow>
                                <TableCell className="font-medium">
                                    {format(job.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{job.songName}</TableCell>
                                <TableCell>{job.cloneName}</TableCell>
                                <TableCell className="text-right">
                                    <ProgressCard 
                                        process="Cloning" apiEndpoint="/api/clone/status"
                                        initStatus={job.status}
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