import { View, Keyboard, TextInput, Text, StyleSheet, Image, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, ImageProps } from "react-native"
import { theme } from "../../contants";


declare interface InputFieldProps {
    label?: string,
    placeholder?: string,
    leftIcon?: ImageProps,
    rightIcon?: ImageProps,
    secureTextEntry?: boolean,
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "number-pad"
}

const InputField = ({
    leftIcon,
    rightIcon,
    label,
    placeholder,
    secureTextEntry = false,
    keyboardType = "default",
    ...props
}: InputFieldProps) => {

    return (
        <TouchableWithoutFeedback >
            <View style={styles.container}>
                <View>
                    {label && <Text style={styles.label}>{label}</Text>}
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", }}>
                    {leftIcon && <Image source={leftIcon} style={[styles.icons, { margin: 10 }]} />}
                    <TextInput
                        style={styles.input}
                        {...props}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={theme.mediumGray}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                    />
                    {rightIcon && <Image source={rightIcon} style={[styles.icons, { margin: 5 }]} />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default InputField

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.white,
        height: 50,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 16,
        marginVertical: 5,
        color: theme.darkGray,
    },

    label: {
        color: theme.primaryText,
        fontWeight: "600",
        fontSize: 18
    },

    icons: {
        height: 20,
        width: 20,
        resizeMode: "contain",
        tintColor: theme.darkGray
    },
    input: {
        width: "100%",
        height: "100%",
        fontSize: 15,
        fontWeight: "300",
        color: theme.primaryText,
    }
})