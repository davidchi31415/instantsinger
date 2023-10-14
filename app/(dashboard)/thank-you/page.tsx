import { currentUser } from "@clerk/nextjs";
import { ThankYouView } from "./view";

const getEmail = async () => {
    const user = await currentUser();
    if (!user) return;
    return user.emailAddresses[0].emailAddress;
}

const ThankYouPage = async () => {
    const email = await getEmail();

    return <ThankYouView email={email} />
}

export default ThankYouPage;