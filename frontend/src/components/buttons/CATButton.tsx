import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { theme } from "../../contants";


declare interface CATButtonProps extends TouchableOpacityProps {
    onPress: () => void
    title: string
    btnType: "primary" | "secondary" | "outline"
    vairiant: "small" | "medium" | "large"
    style?: {}

}

const getBgColor = (color: string) => {
    switch (color) {
        case "primary":
            return theme.primary
        case "secondary":
            return theme.secondary
        case "outline":
            return theme.white

    }
}

const getTextColor = (color: string) => {
    switch (color) {
        case "primary":
            return theme.white
        case "secondary":
            return theme.primary
        case "outline":
            return theme.primary
    }
}

const getWidth = (vairiant: string) => {
    switch (vairiant) {
        case "small":
            return "auto"
        case "medium":
            return "40%"
        case "large":
            return "85%"
    }
}

export const CATButton = ({ onPress, title, btnType, vairiant, style = {}, ...props }: CATButtonProps) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: getBgColor(btnType),
                width: getWidth(vairiant),
                height: 48,
                borderRadius: 48,
                zIndex: 1,
                elevation: btnType === "primary" ? 3 : 0,
                shadowColor: '#000',
                justifyContent: "center",
                alignItems: "center",
                ...style
            }}
            onPress={onPress}
            {...props}

        >
            <Text style={{ color: getTextColor(btnType), textAlign: "center", fontFamily: "Poppins", fontSize: 18, fontWeight: "bold" }}>{title}</Text>
        </TouchableOpacity>
    )
}