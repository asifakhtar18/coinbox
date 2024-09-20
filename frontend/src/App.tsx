import React from "react"
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { store, persistor } from "./store";
import AppNavigator from "./navigations";
import { AppContextProvider } from "./context/AppContext";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <AppContextProvider>
                        <StatusBar barStyle="dark-content" backgroundColor={"white"} />
                        <AppNavigator />
                    </AppContextProvider>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App