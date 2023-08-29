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
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, HelpCircleIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ClonesTableProps {
    userData: {
        clones: any[];
        jobs: any[];
    }
}

export const ClonesTable = ({ userData }: ClonesTableProps) => {
    const router = useRouter();
    const [pageIndex, setPageIndex] = useState(0);
    const rowsPerPage = 12;

    const rows = userData.jobs ? 
        [...userData.jobs, ...userData.clones].sort((a, b) => b.createdAt - a.createdAt)
        : userData.clones;
    const numPages = Math.ceil(rows.length / rowsPerPage);

    console.log(rows);
 
    return (
        <>
            <div className="text-center mb-4 text-muted-foreground">
                {!rows?.length ? <>Need a voice clone? Go to the <b>Create a Clone</b> tab.</>
                    : 
                    <>
                        <div className="flex items-center justify-center gap-2">
                            When your clone is ready, click the 
                            <div className="inline-block"><PlayIcon /></div> icon to hear sample audios. 
                        </div>
                        <p>Then go to the <Link href="/convert" className="font-bold">
                            Convert</Link> page to convert songs.
                        </p>
                    </>}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[8em]">Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right"><div className="pr-2">Status</div></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.slice(pageIndex * rowsPerPage, (pageIndex+1) * rowsPerPage).map((row) => {
                        if (!row?.status) {
                            return <TableRow
                                    className="cursor-pointer"
                                    onClick={() => { router.push(`/clone/result?id=${row.id}`) }}
                                >
                                <TableCell className="font-medium">
                                    {format(row.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className="bg-[#33ff66] text-black">
                                        READY
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/clone/result?id=${row.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <PlayIcon />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        } else {
                            return <TableRow>
                                <TableCell className="font-medium">
                                    {format(row.createdAt, 'MM/dd/yyyy')}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell className="text-right">
                                    <ProgressCard 
                                        process="Cloning" apiEndpoint="/api/clone/status" apiId={row.id}
                                        onStatusChange={() => router.refresh()}
                                        badgeOnly={true}
                                        initStatus={row.status}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link href={`/clone/result?id=${row.id}`}>
                                        <Button variant="ghost" size="icon">
                                            <HelpCircleIcon />
                                        </Button>
                                    </Link>
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