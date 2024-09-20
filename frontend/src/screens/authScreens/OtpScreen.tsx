import { useEffect, } from "react"
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    Alert
} from "react-native"
import { useDispatch, } from "react-redux"

import { CATButton } from "../../components/buttons/CATButton"
import InputField from "../../components/input-fields/InputFields"

import { useResetPasswordMutation, useVerifyEmailMutation } from "../../store"


import { icons, theme } from "../../contants"
import { useNavigation } from "@react-navigation/native"
import { setIsSignedIn, useAuth } from "../../store/slices/authSlice"
import { useAppContext } from "../../context/AppContext"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema } from "../../schema/authSchema"

const OTPVerification = () => {
    const { userEmail } = useAuth()
    const { forgotPassword, setForgotPassword } = useAppContext()
    const [verifyEmail, verifyEmailResult] = useVerifyEmailMutation()
    const [resetPassword, resetPasswordResult] = useResetPasswordMutation()

    const schema = forgotPassword ? zodResolver(resetPasswordSchema) : zodResolver(verifyEmailSchema)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: schema,
    })

    const navigation = useNavigation()
    const dispatch = useDispatch();

    useEffect(() => {
        if (verifyEmailResult.isSuccess) {
            dispatch(setIsSignedIn(true))
        }
        if (resetPasswordResult.isSuccess) {
            Alert.alert("Password Reset Successful", "Please login with your new password")
            setForgotPassword(false)
            navigation.navigate("signin")
        }
    }, [verifyEmailResult, resetPasswordResult])


    const handleEmailVerification = async (data: any) => {

        if (forgotPassword) {
            console.log(data)
            await resetPassword({ email: userEmail, password: data.password, otp: data.otp });
            return;
        } else {
            await verifyEmail({ email: userEmail, otp: data.otp })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, height: "100%", backgroundColor: theme.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.white} />
            <View style={{ flex: 1, padding: 20, gap: 10 }}>
                <Image source={icons.left} style={{ resizeMode: "contain", width: 20, height: 20, marginTop: 10 }} />
                <View>
                    <TouchableOpacity onPress={navigation.goBack} style={{ flexDirection: "row", alignItems: "center", gap: 5, alignContent: "center" }}>
                        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.primaryText }}>{forgotPassword ? "Reset Password" : "Verify Email"}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: theme.secondaryText, flexWrap: "wrap", }}>Please enter the code sent to {userEmail} </Text>
                </View>
                <>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                placeholder="Enter OTP"
                                leftIcon={icons.lock}
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                maxLength={6}
                            />
                        )}
                        name="otp"
                        rules={{ required: true }}
                    />
                    {errors.otp && <Text style={{ color: "red" }}>{errors.otp?.message}</Text>}

                </>

                {forgotPassword &&
                    <>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    placeholder="Enter New Password"
                                    leftIcon={icons.lock}
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="default"

                                />
                            )}
                            name="password"
                            rules={{ required: true }}
                        />

                        {errors.password && <Text style={{ color: "red" }}>{errors.password?.message}</Text>}
                    </>
                }

                {verifyEmailResult.isError && <Text style={{ color: "red" }}>{verifyEmailResult.error.data.message}</Text>}
                {resetPasswordResult.isError && <Text style={{ color: "red" }}>{resetPasswordResult.error.data.message}</Text>}
                <CATButton
                    title="Submit"
                    onPress={handleSubmit(handleEmailVerification)}
                    btnType="primary"
                    style={{ marginTop: 20, width: "100%" }}
                    vairiant="large"

                />
                <CATButton
                    btnType="outline"
                    vairiant="large"
                    title="Cancel"
                    onPress={() => navigation.canGoBack() && navigation.goBack()}
                    style={{ width: "100%" }}
                />

            </View>
        </SafeAreaView>
    )
}

export default OTPVerification