import { ScrollView, Text, View } from "react-native"
import { icons, theme } from "../../contants"
import groupsData from "../../contants/fakeData"
import GroupCard from "../../components/cards/GroupCard"
import InputField from "../../components/input-fields/InputFields"
import React from "react"
import SearchBox from "../../components/input-fields/SearchBox"

const Group = () => {
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.primaryText, }}>All Groups</Text>
                <SearchBox />
            </View>
            <ScrollView
                style={{
                    width: "100%",
                }}
            >
                {groupsData.map((group, index) => {
                    return (
                        <React.Fragment
                            key={index}
                        >
                            <GroupCard
                                groupName={group.name}
                                payementDate={group.paymentDate}
                                amount={group.amountPerMonth}
                                totalMembers={group.numberOfMembers}
                                key={index}
                            />
                            {index == groupsData.length - 1 && <View style={{ height: 100 }} />}

                        </ React.Fragment>
                    )
                })}

            </ScrollView>
        </View>
    )
}

export default Group