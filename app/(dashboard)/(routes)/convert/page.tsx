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
import { useProModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getClones } from "@/lib/runpod";
import ConvertDashboard from "@/components/convert-dashboard";

const getUserData = async () => {
  const { userId } = auth();
  if (userId === null) return { cloneNames: [] };

  const clones = await getClones({ userId });
  return { cloneNames: clones.map(clone => clone.name) };
}

const ConvertPage = async () => {
  const userData = await getUserData();

  return (
    <ConvertDashboard userData={userData} />
  )
}

export default ConvertPage;