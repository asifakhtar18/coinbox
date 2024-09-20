import React, { useEffect } from "react"
import { SafeAreaView, Text, View, ScrollView } from "react-native"

import HeroCard from "../../components/cards/HeroCard"
import GroupCard from "../../components/cards/GroupCard"
import groupsData from "../../contants/fakeData"
import { theme } from "../../contants"

import { setUser, useAuth, useGetUserDetailsQuery, } from "../../store"
import { useDispatch } from "react-redux"


const Home = () => {
    const dispatch = useDispatch()
    const { token, user } = useAuth()

    const { isLoading, data } = useGetUserDetailsQuery(token, {
        skip: !token,
        refetchOnMountOrArgChange: true
    })



    useEffect(() => {
        if (data) {
            dispatch(setUser(data.user))
        }
    }, [data])




    return (
        <SafeAreaView>
            <Text style={{ fontSize: 24, paddingHorizontal: 20, fontWeight: "bold", color: theme.primaryText, marginTop: 10 }}>{user?.name}</Text>
            <HeroCard />
            <Text style={{ fontSize: 24, paddingHorizontal: 20, fontWeight: "bold", color: theme.primaryText, marginTop: 10 }}>Recent Groups</Text>
            <ScrollView>
                {groupsData.slice(0, 3).map((group, index) => {
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
                            {index == 3 && <View style={{ height: 50, marginBottom: 20, width: "100%" }} />}
                        </React.Fragment>
                    )
                })}
            </ScrollView>

        </SafeAreaView>
    )
}

export default Home