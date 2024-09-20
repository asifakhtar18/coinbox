import { Image, StyleSheet, Text, View } from "react-native"
import { icons, theme } from "../../contants"
import { useMemo } from "react"


declare interface GroupCardProps {
    groupName: string
    payementDate: string
    amount: String,
    totalMembers: number
}

const GroupCard = ({
    groupName,
    payementDate,
    amount,
    totalMembers

}: GroupCardProps) => {
    return (
        <View
            style={styles.container}
        >
            <View  >
                <Text style={styles.HeroText}>{groupName}</Text>
                <Text style={styles.secondaryText}>{payementDate}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <Image
                        source={icons.userFilled}
                        style={{
                            width: 12, height: 12, tintColor: theme.darkGray
                        }}
                    />
                    <Text style={{ fontSize: 16, fontWeight: "600", color: theme.primaryText + "80" }}>
                        {totalMembers}
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, fontWeight: "500", color: theme.secondaryText }}>Amount</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.accentGreen }}>{amount}</Text>
            </View>
        </View >
    )
}

export default GroupCard

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.white,
        borderRadius: 20,
        borderColor: theme.border,
        borderWidth: 0.1,
        elevation: 1,
        marginVertical: 4
    },

    HeroText: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.primaryText,
        paddingBottom: 4
    },

    secondaryText: {
        fontSize: 12,
        fontWeight: "300",
        color: theme.secondaryText
    }



})