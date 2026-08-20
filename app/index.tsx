import { UserPayload } from "@/store/store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function Index() {
  const user = useSelector((state: UserPayload)=> state.user.value);
  const route = useRouter();
  useEffect(() => {
    if(user.isAuthed){
      route.push("/private/money");
    }
  },[user])
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
        <Button title="Start" onPress={() => route.push("/login")} />      
      </View>
  );
}
