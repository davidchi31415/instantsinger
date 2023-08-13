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

interface ClonesTableProps {
    userData: {
        clones: any[];
        currentJob: any;
    }
    currentJobStatus: string;
    onCurrentJobUpdate: Function;
}

export const ClonesTable = ({ userData, currentJobStatus, onCurrentJobUpdate }: ClonesTableProps) => {
    return (
        <Table>
            <TableCaption>Need a voice clone? Go to the <b>Create a Clone</b> tab.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[8em]">Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right"><div className="pr-2">Status</div></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userData.currentJob !== null ?
                    <TableRow>
                        <TableCell className="font-medium">
                            {format(userData.currentJob.createdAt, 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell>{userData.currentJob.name}</TableCell>
                        <TableCell className="text-right">
                            <ProgressCard 
                                process="Cloning" apiEndpoint="/api/clone/status" apiId={userData.currentJob.id}
                                initStatus={currentJobStatus}
                                onStatusChange={onCurrentJobUpdate}
                                badgeOnly={true}
                            />
                        </TableCell>   
                    </TableRow>
                    : ""}
                {userData.clones.map((clone) =>
                    <TableRow>
                        <TableCell className="font-medium">
                            {format(clone.createdAt, 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell>{clone.name}</TableCell>
                        <TableCell className="text-right">
                            <Badge className="bg-[green]">READY</Badge>
                        </TableCell>   
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}