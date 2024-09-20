import { View, Text, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"

import IconButton from "../buttons/IconButton"
import { icons, theme } from "../../contants"

export const Header = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ justifyContent: "space-between", flexDirection: "row", padding: 20, backgroundColor: theme.white }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: theme.primaryText,
                }}
            ></Text>
            <View style={{ flexDirection: "row", gap: 24 }}>
                <IconButton source={icons.bell} height={20} width={20} onPress={() => navigation.navigate("notification")} />
                <IconButton source={icons.adduser} height={20} width={20} onPress={() => navigation.navigate("addrequest")} />
            </View>
        </SafeAreaView>
    )
}