
import AuthNavigator from "./AuthNavigator";
import HomeNavigation from "./HomeNavigator";
import { useAuth } from "../store/slices/authSlice";

const AppNavigator = () => {
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <HomeNavigation />
    }

    return <AuthNavigator />

}

export default AppNavigator