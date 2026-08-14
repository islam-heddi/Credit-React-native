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
        <Text style={{fontSize: 30, alignSelf: "center"}}>My Money</Text>
        <Image source={require("../assets/images/coin.png")} style={{
          width: 300,
          height: 300,
           alignSelf: "center"
        }} />
        <Button title="Start" onPress={() => route.push("/register")} />      
      </View>
  );
}
