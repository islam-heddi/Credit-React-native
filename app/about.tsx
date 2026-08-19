import { Text, View } from "react-native"

export default function About(){

    return (
        <View>
            <Text style={{fontSize: 20}}>About Credit app</Text>
            <Text style={{margin: 10}}>Credit is an application for managing your finances.</Text>
            <Text style={{margin: 10}}>if you sold someone on credit then this app for you to track it.</Text>
            <Text style={{margin: 10}}>This app is built using React Native, Expo, Redux, and SQLite.</Text>
            <Text style={{margin: 10}}>This app is open source and you can find the source code on GitHub.</Text>
            <Text style={{margin: 10}}>This app is built by <Text style={{fontWeight: "bold"}}>Heddi islam</Text>.</Text>
            <Text style={{margin: 10}}>Github Repo: https://github.com/islam-heddi/MyMoney-React-native.</Text>
        </View>
    )
}