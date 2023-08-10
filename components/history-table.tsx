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

interface HistoryTableProps {
    userData: {
        conversions: any[];
        currentJob: any;
    }
}

export const HistoryTable = ({ userData }: HistoryTableProps) => {
    const [conversionStatus, setConversionStatus] = useState<string>(
        userData.currentJob !== null ? userData.currentJob.status : ""
    )

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
                {userData.currentJob !== null ?
                    <TableRow>
                        <TableCell className="font-medium">
                            {format(userData.currentJob.createdAt, 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell>{userData.currentJob.songName}</TableCell>
                        <TableCell>{userData.currentJob.cloneName}</TableCell>
                        <TableCell className="text-right">
                            <ProgressCard 
                                process="Cloning" apiEndpoint="/api/clone/status"
                                initStatus={conversionStatus}
                                onStatusChange={setConversionStatus}
                                badgeOnly={true}
                            />
                        </TableCell>   
                    </TableRow>
                    : ""}
                {userData.conversions.map((conversion) =>
                    <TableRow>
                        <TableCell className="font-medium">
                            {format(conversion.createdAt, 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell>{conversion.songName}</TableCell>
                        <TableCell>{conversion.cloneName}</TableCell>
                        <TableCell className="text-right">
                            <Badge className="bg-[green]">{conversion.status}</Badge>
                        </TableCell>   
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}