import { View, Text, SafeAreaView } from "react-native";
import { theme } from "../../contants";

const HeroCard = () => {
    return (
        <SafeAreaView style={{
            width: "100%",
            height: "auto",
        }}>
            <View
                style={{
                    padding: 20,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    borderColor: theme.border,
                    borderWidth: 1,
                    backgroundColor: theme.primary,
                    elevation: 2,
                }}
            >
                <Text style={{ fontSize: 14, fontWeight: "700", color: theme.lightGray + "80" }}>Upcoming Payment</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ paddingVertical: 8 }}>
                        <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.white }}>Lions Club</Text>
                        <Text style={{ fontSize: 14, fontWeight: "200", color: theme.lightGray }}>This is a description</Text>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: theme.secondary + "80", marginTop: 10 }}>Sep 21, 2022</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>

                        <Text style={{ fontSize: 12, fontWeight: "500", color: theme.lightGray }}>
                            Amount
                        </Text>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                color: theme.white,
                                marginRight: 10,
                                marginBottom: 10
                            }}>

                            $100
                        </Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}


export default HeroCard