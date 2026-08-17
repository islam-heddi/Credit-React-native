import { UserModel } from "@/model/User";
import { useRouter } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
export default function Register(){
    const db: SQLiteDatabase = useSQLiteContext()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const route =useRouter()

    const submitData = async () : Promise<unknown> => {
        try {
            if(username.length < 4) return Alert.alert("Error","Username must be atleast 4 letters");
            if(password.length < 4) return Alert.alert("Error","Password must be atleast 4 letters");
            if(password !== confirmPassword) return Alert.alert("Error","The confirm password does not match");
            
            const userModel = UserModel.getInstance(db);
            await userModel.addUser(username, password);
            Alert.alert("Success",`Yay! submitted ${username}`);
        } catch (error) {
            Alert.alert("Error", `Cannot register ${error}`)
        }
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
                <Text>Confirm your password:</Text>
                <TextInput secureTextEntry={true} placeholder="Confirm your password" value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)}/>
                <View style={{
                    flex: 1,
                    gap: 16
                }}>
                <Button title="Register" onPress={() => submitData()} />
                <Button title="Sign in" onPress={() => route.push("/login")} />
                </View>
            </View>
        </ScrollView>
    )
}