import { View, ScrollView, SafeAreaView } from "react-native"
import { Stack, useRouter } from "expo-router"
import { useState } from "react"
import { ScreenHeaderBtn } from "../components/ScreenHeaderBtn";
import { Hero } from "../components/Hero";
import { Category } from "../components/Category";
import menu from "../assets/menu.png"
import logo from "../assets/quiz-icon.jpg"
import Footer from "../components/Footer";

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{flex:1}}>
            <Stack.Screen
            options={{
                headerStyle: { backgroundColor: "#FAFAFC" },
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={logo} content="Quizy App"/>
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={menu}/>
                ),
                headerTitle: "",
            }}/>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View
                style={{
                        flex: 1,
                        padding: 0
                    }}>

                    <Hero/>
                    <Category/>
                    <Footer/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home;