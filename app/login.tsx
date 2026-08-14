import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
export default function Register(){
    const route = useRouter()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const submitData = () : unknown => {
        if(username.length < 4) return Alert.alert("Error","Username must be atleast 4 letters");
        if(password.length < 4) return Alert.alert("Error","Password must be atleast 4 letters");
        Alert.alert("Success",`Yay! submitted ${username}`);
    }

    return(
        <ScrollView>
            <View style={{
                margin: 10,
                padding: 10
            }}>
                <Text>Begin with completing your information below:</Text>
                <Text>Username:</Text>
                <TextInput placeholder="Enter your username" value={username} onChangeText={(e) => setUsername(e)} />
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} placeholder="Enter your password" value={password} onChangeText={(e) => setPassword(e)} />
                <View style={{
                    flex: 1,
                    gap: 16
                }}>

                <Button title="Login" onPress={() => submitData()} />
                <Button title="New Account" onPress={() => route.push("/register")} />

                </View>
                
            </View>
        </ScrollView>
    )
}