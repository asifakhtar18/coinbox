import { Image, ImageProps, ImageSourcePropType, TouchableOpacity, StyleProp, ImageStyle, GestureResponderEvent } from "react-native";

declare interface IconButtonProps extends ImageProps {
    source: ImageSourcePropType
    height?: number
    width?: number
    onPress?: (location: String) => void
    style?: StyleProp<ImageStyle>
}

const IconButton = ({ source, onPress, height = 24, width = 24, }: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={source} style={{
                height: height,
                width: width,

            }} />
        </TouchableOpacity >
    )
}

export default IconButton;