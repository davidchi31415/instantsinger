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
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HistoryTableProps {
    userData: {
        conversions: any[];
        currentJobs: any[];
    }
}

export const HistoryTable = ({ userData }: HistoryTableProps) => {
    const router = useRouter();

    return (
        <Table>
            <TableCaption>Want to convert a song? Go to the <Link href="/convert"><b>Convert</b></Link> page.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[8em]">Date</TableHead>
                    <TableHead>Song Name</TableHead>
                    <TableHead>Clone Name</TableHead>
                    <TableHead className="text-right"><div className="pr-2">Status</div></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userData.currentJobs.map((job) =>
                    <TableRow>
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
                    </TableRow>)}
                {userData.conversions.map((conversion) =>
                    <TableRow
                        className="cursor:pointer"
                        onClick={() => { router.push(`/convert/result?id=${conversion.id}`) }}
                    >
                        <TableCell className="font-medium">
                            {format(conversion.createdAt, 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell>{conversion.songName}</TableCell>
                        <TableCell>{conversion.cloneName}</TableCell>
                        <TableCell className="text-right">
                            <Badge className={
                                conversion.status === "COMPLETED" ? "bg-[#33ff66]" : 
                                (conversion.status === "FAILED" || conversion.status === "CANCELLED"
                                    ? "bg-destructive" : "bg-[#6699ff]")
                            }>
                                {conversion.status}
                            </Badge>
                        </TableCell>   
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}