import { useState } from "react"
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { pickSingle } from "react-native-document-picker"

import { images, theme } from "../../contants"
import { CATButton } from "../../components/buttons/CATButton"
import { initializeAuthState } from "../../store"
import { uploadFile } from "../../services/s3Service"
import { openPicker } from "react-native-image-crop-picker"

const Profile = () => {
    const [profilePic, setProfilePic] = useState("")
    const dispatch = useDispatch()

    const handleUploadProfilePic = async () => {
        try {
            const result = await openPicker({
                width: 300,
                height: 300,
                cropping: true
            })

            setProfilePic(result.path)

            const file = {
                uri: result.path,
                name: result.path.split("/").pop() || "image",
                type: result.mime,
            }
            await uploadFile(file)



        } catch (error) {
            console.log(error)
        }
    }


    const handleSignOut = () => {
        dispatch(initializeAuthState())
    }

    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: theme.white }}>
                <View style={{ width: "100%", alignItems: "center" }} >
                    <TouchableOpacity
                        onPress={handleUploadProfilePic}
                    >
                        {!profilePic && <Image source={images.avatar} style={{ width: 100, height: 100, borderRadius: 50 }} />}
                        {profilePic && <Image source={{ uri: profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />}

                    </TouchableOpacity>
                </View>
                <Button title="Remove" onPress={() => setProfilePic("")} />
                <CATButton title="Sign Out" btnType="outline" vairiant="large" onPress={handleSignOut} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile