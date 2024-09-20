import { useEffect, useState } from "react"
import { Button, SafeAreaView, Text, Platform, TouchableOpacity, View, KeyboardAvoidingView, } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Controller, useForm } from "react-hook-form"
import { forgotPasswordSchema, loginSchema } from "../../schema/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"


import { icons, theme } from "../../contants"
import { CATButton } from "../../components/buttons/CATButton"
import InputField from "../../components/input-fields/InputFields"
import Modal from "../../components/modals/Modal"


import { useLoginMutation, useForgotPasswordMutation } from "../../store"
import { useDispatch } from "react-redux"
import { setIsSignedIn, setToken, setUser, setUserEmail } from "../../store/slices/authSlice"
import { useAppContext } from "../../context/AppContext"

const SignIn = () => {
    const navigation = useNavigation();

    const { forgotPassword: isForgotPassword, setForgotPassword: setIsForgotPassword } = useAppContext()

    const schema = isForgotPassword ? zodResolver(forgotPasswordSchema) : zodResolver(loginSchema)
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: schema,

    })
    const dispatch = useDispatch()
    const [login, loginResult] = useLoginMutation()
    const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation()

    const onSubmit = async (data: any) => {
        if (isForgotPassword) {
            await forgotPassword(data);
            dispatch(setUserEmail(data.email))
        }
        else {
            await login(data)
        }
    }

    useEffect(() => {
        if (loginResult.isSuccess) {
            console.log(loginResult)
            dispatch(setIsSignedIn(true))
            dispatch(setToken(loginResult.data.token))
            dispatch(setUser(loginResult.data.user))
            return;
        }
        if (forgotPasswordResult.isSuccess && isForgotPassword) {
            console.log(forgotPasswordResult)
            navigation.navigate("verification")
        }
    }, [loginResult, forgotPasswordResult])

    const onForgotPassword = async () => {
        setIsForgotPassword(true)

    }






    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.white, alignItems: "center" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView style={{ width: "100%", backgroundColor: theme.white, gap: 15, paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: theme.white, alignItems: "center" }} >

                    <View style={{ paddingLeft: 20, paddingRight: 20 }} >
                        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 50, color: theme.primaryText, fontFamily: "JakartaBold" }}>{isForgotPassword ? "Forgot Password" : "Welcome👋"}</Text>
                        <Text style={{ color: theme.secondaryText, marginBottom: 10, fontWeight: "300", height: 24, fontFamily: "JakartaSemiBold" }}>{isForgotPassword ? "Please enter your registered email address below. " : "Log in to your account."}</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    leftIcon={icons.email}
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}


                                />
                            )}
                        />
                        {errors.email && <Text style={{ color: "red", fontFamily: "Jakarta" }}>{errors.email?.message}</Text>}

                        {!isForgotPassword && (
                            <>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputField
                                            leftIcon={icons.lock}
                                            placeholder="Enter your password"
                                            secureTextEntry={true}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.password && <Text style={{ color: "red", fontFamily: "Jakarta" }}>{errors.password?.message}</Text>}
                            </>
                        )}
                    </View>

                    {!isForgotPassword && (
                        <>
                            <TouchableOpacity
                                onPress={onForgotPassword}
                                style={{
                                    alignSelf: "flex-start", marginTop: 10,

                                }}>
                                <Text style={{ color: theme.primary, fontWeight: "bold", }}>Forgot Password ?</Text>
                            </TouchableOpacity>

                            {loginResult.isError && <Text style={{ color: "red", fontFamily: "Jakarta" }}>{loginResult?.error?.data?.message}</Text>}
                        </>
                    )}

                    {forgotPasswordResult.isError && <Text style={{ color: "red", fontFamily: "Jakarta" }}>{forgotPasswordResult?.error?.data?.message}</Text>}

                    <CATButton btnType="primary" vairiant="large" title={isForgotPassword ? "Confirm" : "Login"}
                        onPress={handleSubmit(onSubmit)}
                        style={{ marginTop: 20, width: "100%" }}
                    />

                    {
                        isForgotPassword && (
                            <CATButton
                                btnType="outline"
                                vairiant="large"
                                title="Cancel"
                                onPress={() => setIsForgotPassword(false)}
                                style={{ width: "100%" }}
                            />
                        )
                    }

                    {!isForgotPassword && (
                        <>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ color: theme.secondaryText, fontWeight: "300", fontFamily: "Jakarta" }}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                                    <Text style={{ color: theme.primary, fontWeight: "bold", }}> Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                </View >



            </SafeAreaView>
        </KeyboardAvoidingView >
    )
}

export default SignIn