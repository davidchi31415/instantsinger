import { CloneDashboard } from "./clone-dashboard"
import ConvertDashboard from "./convert-dashboard"

export const Dashboard = ({ userData }) => {
    if (userData.clone) {
        return (
            <ConvertDashboard userData={userData} />
        )
    }

    return (
        <CloneDashboard userData={userData} />
    )
}