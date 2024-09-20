import React from "react"
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { styles } from "../../styles/welcomeStyle"
import { CATButton } from "../../components/buttons/CATButton"
import { images, theme } from "../../contants"
import { useAppContext } from "../../context/AppContext"
const Welcome: React.FC = () => {
    const navigation = useNavigation()
    const handlePress = (location: string) => {
        navigation.navigate(location)
    }
    return (

        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.white} />
            <Image style={styles.welcomeLogo} source={images.welcomeImage} resizeMode="contain" />
            <Text style={styles.brandName}>CoinBox</Text>
            <Text style={styles.welcomText}>Collecting funds just got easier!</Text>
            <View style={{ width: "100%", alignItems: "center", bottom: 20, position: "absolute", gap: 10 }}>
                <CATButton
                    btnType="primary"
                    vairiant="large"
                    onPress={() => handlePress("signup")} title="Get Started"
                />
                <CATButton
                    btnType="secondary"
                    vairiant="large"
                    onPress={() => handlePress("signin")} title="Login"
                />
            </View>
        </SafeAreaView>
    )
}

export default Welcome