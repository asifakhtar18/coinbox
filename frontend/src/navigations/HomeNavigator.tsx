import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Group, Chat, Profile } from '../screens/homeScreens';
import { icons, theme } from '../contants';
import { Image, Platform, Text, View } from 'react-native';
import Notification from '../screens/homeScreens/Notification';
import AddRequest from '../screens/homeScreens/AddRequest';
import { Header } from '../components/header/Header';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeNavigation = () => {
    return (
        <>
            <Header />
            <Stack.Navigator initialRouteName="home" screenOptions={{
                headerShown: false,
                animation: Platform.OS === "ios" ? "default" : "slide_from_right",
                statusBarColor: theme.white,
                statusBarStyle: "dark",
                statusBarAnimation: "slide",
                contentStyle: {
                    backgroundColor: theme.secondary
                }
            }} >
                <Stack.Screen name="homeTab" component={HomeTab} />
                <Stack.Screen name="notification" component={Notification} />
                <Stack.Screen name="addrequest" component={AddRequest} />
            </Stack.Navigator>


        </>
    );
};


const HomeTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            sceneContainerStyle={{ backgroundColor: theme.white }}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: theme.white,
                    justifyContent: "space-between",
                    elevation: 0,
                },
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused }) => {
                    let tabIcon
                    let tabName
                    switch (route.name) {
                        case "home":
                            tabIcon = focused ? icons.homeFilled : icons.home
                            tabName = "Home"
                            break;

                        case "profile":
                            tabIcon = focused ? icons.userFilled : icons.user
                            tabName = "Profile"
                            break;

                        case "chat":
                            tabIcon = focused ? icons.chatFilled : icons.chat
                            tabName = "Chats"
                            break;

                        case "group":
                            tabIcon = focused ? icons.groupFilled : icons.group
                            tabName = "Groups"
                            break;

                    }
                    return <View
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            gap: 5,
                            backgroundColor: focused ? theme.primary : "transparent",
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            borderRadius: 20,
                        }} >
                        <Image
                            source={tabIcon}
                            style={{
                                width: 16,
                                height: 16,
                                opacity: focused ? 1 : 0.5,
                                tintColor: focused ? theme.white : theme.black
                            }}
                        />
                        {focused && <Text style={{ color: theme.white, fontSize: 12, fontWeight: "600" }}>{tabName}</Text>}
                    </View>

                },
            })}

        >
            <Tab.Screen
                options={{ tabBarShowLabel: false, }}
                name="home"
                component={Home}
            />
            <Tab.Screen
                options={{ tabBarShowLabel: false, }}
                name="group"
                component={Group}
            />
            <Tab.Screen
                options={{ tabBarShowLabel: false, }}
                name="chat"
                component={Chat}
            />
            <Tab.Screen
                options={{ tabBarShowLabel: false, }}
                name="profile"
                component={Profile} />
        </Tab.Navigator>
    )
}


export default HomeNavigation