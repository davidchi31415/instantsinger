import { Button } from "@/components/ui/button";
import Link from "next/link";

const SourcesPage = async () => {
    return (
        <div className="h-full pt-16 px-6 bg-[#163B8D] w-full" >
            <div className="max-w-3xl p-6 rounded-md bg-white mx-auto ">
                <div className="text-3xl font-medium text-center">Sample Songs We Use</div>
                <div className="mt-4">
                    <p>We use multiple copyright-free songs to demonstrate
                        the capabilities of our services. We hereby give credit to the sources
                        from which we obtained these samples.
                    </p>
                    <p><b>Disclaimer</b>: We do not claim ownership of, nor do we take profit from, the following songs.</p>
                    <p>If you have any questions or concerns, please contact us at support@instantsinger.com</p>
                    <div className="mt-4 p-4 shadow-xl rounded-lg border-2 border-primary flex justify-between items-center flex-wrap gap-2">
                        <div className="max-w-md">
                            <p><b>Jens East - Running (ft. Elske)</b></p>
                        </div>
                        <Link href="https://www.youtube.com/watch?v=JW6zb8CU3s8&list=PLposWV9__rjxwACzVUqGrFIhEPqm0F5Im&index=14">
                            <Button>Source</Button>
                        </Link>
                    </div>
                    <div className="mt-4 p-4 shadow-xl rounded-lg border-2 border-primary flex justify-between items-center flex-wrap gap-2">
                        <div className="max-w-md">
                            <p><b>Jens East - As Long As You Need Us (ft. Jason Fredrick)</b></p>
                        </div>
                        <Link href="https://www.youtube.com/watch?v=DCa1kHpxHxo">
                            <Button>Source</Button>
                        </Link>
                    </div>
                    <div className="mt-4 p-4 shadow-xl rounded-lg border-2 border-primary flex justify-between items-center flex-wrap gap-2">
                        <div className="max-w-md">
                            <p><b>Camilla North x Jens East - Invisible</b></p>
                        </div>
                        <Link href="https://www.youtube.com/watch?v=AO9PqCKOz_k&list=PLposWV9__rjxwACzVUqGrFIhEPqm0F5Im&index=12">
                            <Button>Source</Button>
                        </Link>
                    </div>
                    <div className="mt-4 p-4 shadow-xl rounded-lg border-2 border-primary flex justify-between items-center flex-wrap gap-2">
                        <div className="max-w-md">
                            <p><b>NEFFEX - Blow Up</b></p>
                        </div>
                        <Link href="https://www.youtube.com/watch?v=dC1s0tSsTjo">
                            <Button>Source</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SourcesPage;