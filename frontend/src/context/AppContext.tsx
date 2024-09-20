import { useContext, useState, createContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
export interface AppContextProps {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    forgotPassword: boolean;
    setForgotPassword: (setForgotPassword: boolean) => void
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppContextProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);


    return (
        <AppContext.Provider
            value={{

                isLoading,
                setIsLoading,
                forgotPassword,
                setForgotPassword
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

