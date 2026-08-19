import { useRouter } from "expo-router";
import React from "react";
import { Button, Image, Text, View } from "react-native";
export default function Index() {
  const route = useRouter()
  return (
    <View  style={{ 
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: '#fff',
      gap:10,
      padding: 20,
    }}>
        <Text style={{fontSize: 30, alignSelf: "center"}}>Credit</Text>
        <Image source={require("../assets/images/coin.png")} style={{
          width: 300,
          height: 300,
           alignSelf: "center"
        }} />
        <Text>Welcome to Credit, an application for managing your finances.</Text>
        <Text>if you sold someone on credit then this app for you to track it.</Text>
        <Button title="Start" onPress={() => route.push("/register")} />      
      </View>
  );
}
