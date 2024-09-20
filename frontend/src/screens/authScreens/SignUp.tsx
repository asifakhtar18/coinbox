import { useEffect } from "react"
import { SafeAreaView, Text, Platform, TouchableOpacity, View, KeyboardAvoidingView, ActivityIndicator, } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Controller, useForm } from "react-hook-form"
import { registerSchema } from "../../schema/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"


import InputField from "../../components/input-fields/InputFields"
import { CATButton } from "../../components/buttons/CATButton"
import { setUserEmail } from "../../store/slices/authSlice"
import { icons, theme } from "../../contants"
import { useRegisterMutation } from "../../store/index"
import { useSignUp } from "../../hooks/auth/useSignUp"

declare interface useData {
    email: string
    password: string
    name: string
}

const SignUp = () => {

    const { navigation, registerResult, onSubmit } = useSignUp()

    const { isLoading: isRegistering, isError: isRegisterError } = registerResult

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),

    })


    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.white, alignItems: "center" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >


            <SafeAreaView
                style={{ width: "100%", backgroundColor: theme.white, gap: 15, paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: theme.white, alignItems: "center", width: "100%", height: "100%" }} >

                    <View style={{ paddingLeft: 20, paddingRight: 20 }} >
                        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 50, color: theme.primaryText, fontFamily: "JakartaBold" }}>Sign Up</Text>
                        <Text style={{ color: theme.secondaryText, marginBottom: 10, fontWeight: "300", height: 24, fontFamily: "JakartaSemiBold" }}>Please enter your details to sign up.</Text>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputField
                                    leftIcon={icons.user}
                                    placeholder="Enter your name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}

                                />
                            )}
                        />
                        {errors.name && <Text style={{ color: "red", fontFamily: "Jakarta" }}>{errors.name?.message?.toString()}</Text>}
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
                    </View>

                    {isRegisterError &&

                        <Text style={{ color: "red", fontFamily: "Jakarta" }}>
                            {registerResult?.error?.data?.message || "Something went wrong"}
                        </Text>
                    }



                    <CATButton btnType="primary" vairiant="large" title="Sign Up"
                        onPress={handleSubmit(onSubmit)}
                        disabled={isRegistering}
                        style={{ marginTop: 20, width: "100%" }}
                    />

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                        <Text style={{ color: theme.secondaryText, fontWeight: "300", fontFamily: "Jakarta" }}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                            <Text style={{ color: theme.primary, fontWeight: "bold", }}> Log In</Text>
                        </TouchableOpacity>
                    </View>

                </View >
            </SafeAreaView>
        </KeyboardAvoidingView >
    )
}

export default SignUp