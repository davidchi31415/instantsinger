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
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, HelpCircle, HelpCircleIcon, PlayIcon } from "lucide-react";
import { cn, getFileName, isJobDone } from "@/lib/utils";

interface HistoryTableProps {
    userData: {
        convertJobs: any[];
    }
    mini?: boolean;
}

export const HistoryTable = ({ userData, mini=false }: HistoryTableProps) => {
    const router = useRouter();

    const [pageIndex, setPageIndex] = useState(0);
    const jobsPerPage = mini ? 3 : 5;

    const [jobs, setJobs] = useState([...userData.convertJobs]);
    const numPages = Math.ceil(jobs.length / jobsPerPage);
 
    return (
        <>
            <Table>
                {mini ? "" :
                <TableHeader>
                    <TableRow>
                        <TableHead className={cn("w-[8em]", !mini ? "hidden md:visible" : "")}>Date</TableHead>
                        <TableHead>Song Name</TableHead>
                        <TableHead className="text-right"><div className="pr-2">Status</div></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>}
                <TableBody>
                    {jobs.slice(pageIndex * jobsPerPage, (pageIndex+1) * jobsPerPage).map((job) => {
                        if (isJobDone({ status: job.status })) {
                            return <TableRow
                                className="cursor-pointer"
                                onClick={() => { router.push(`/result?id=${job.id}`) }}
                            >
                                <TableCell className={cn("font-medium", !mini ? "hidden md:visible" : "hidden")}>
                                    {format(job.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{getFileName(job.songName)}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={
                                        job.status === "COMPLETED" ? "bg-[#33ff66] text-black" : 
                                        (job.status === "FAILED" || job.status === "CANCELLED"
                                            ? "bg-destructive" : "bg-[#6699ff]")
                                    }>
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/result?id=${job.id}`}>
                                        <Button variant="ghost" size="icon">
                                            {job.status === "COMPLETED" ? <PlayIcon /> : <HelpCircleIcon />}
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        } else {
                            return <TableRow>
                                <TableCell className={cn("font-medium", !mini ? "hidden md:visible" : "hidden")}>
                                    {format(job.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{getFileName(job.songName)}</TableCell>
                                <TableCell className="text-right">
                                    <ProgressCard 
                                        process="Converting" apiEndpoint="/api/convert/status"
                                        initStatus={job.status} apiId={job.id}
                                        badgeOnly={true}
                                        onFinish={() => {
                                            const updatedJob = {...job, status: "COMPLETED"}
                                            const newJobs = [
                                                updatedJob, ...jobs.filter(e => e.id !== job.id)
                                            ];
                                            setJobs(newJobs);
                                        }}
                                        onFail={() => {
                                            const updatedJob = {...job, status: "FAILED"}
                                            const newJobs = [
                                                ...jobs.filter(e => e.id !== job.id), updatedJob
                                            ];
                                            setJobs(newJobs);
                                        }}
                                        onCancel={() => {
                                            const updatedJob = {...job, status: "CANCELLED"}
                                            const newJobs = [
                                                ...jobs.filter(e => e.id !== job.id), updatedJob
                                            ];
                                            setJobs(newJobs);
                                        }}
                                    />
                                </TableCell>   
                            </TableRow>
                        }
                        })}
                </TableBody>
            </Table>
            {mini ? "" :
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
            </div>}
        </>
    )
}