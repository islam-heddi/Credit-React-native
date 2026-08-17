import { UserModel } from "@/model/User";
import { create } from "@/store/userSlice";
import { useRouter } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
export default function Register(){
    const dispatch = useDispatch();
    const db: SQLiteDatabase = useSQLiteContext()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const route =useRouter()
    const [loading, startTransition] = useTransition()

    const submitData = async () : Promise<unknown> => {
        if(username.length < 4) return Alert.alert("Error","Username must be atleast 4 letters");
        if(password.length < 4) return Alert.alert("Error","Password must be atleast 4 letters");
        if(password !== confirmPassword) return Alert.alert("Error","The confirm password does not match");
        startTransition(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                await userModel.addUser(username, password);
                route.push("/money")
                Alert.alert("Success",`Yay! submitted ${username}`);
                dispatch(create({
                    username,
                    isAuthed: true
                }));
            } catch (error) {
                Alert.alert("Error", `Cannot register ${error}`)
            }
        })
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
                <Button disabled={loading} title={loading? "Loading...": "Register"} onPress={() => submitData()} />
                <Button title="Sign in" onPress={() => route.push("/login")} />
                </View>
            </View>
        </ScrollView>
    )
}