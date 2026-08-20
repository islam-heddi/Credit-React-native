import { UserModel } from "@/model/User";
import { UserPayload } from "@/store/store";
import { create } from "@/store/userSlice";
import { IUser } from "@/types/User";
import { useRouter } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { CircleUser } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function Register(){
    const user = useSelector((state: UserPayload) => state.user.value);
    const dispatch = useDispatch();
    const db: SQLiteDatabase = useSQLiteContext()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const route =useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if(user.isAuthed){
            route.push("/private/money");
        }
    },[user]);
    const submitData = async () : Promise<void> => {
        if(username.length < 4) return Alert.alert("Error","Username must be atleast 4 letters");
        if(password.length < 4) return Alert.alert("Error","Password must be atleast 4 letters");
        if(password !== confirmPassword) return Alert.alert("Error","The confirm password does not match");
        setLoading(true);
        try {
            const userModel = UserModel.getInstance(db);
            const user = await userModel.addUser(username, password) as IUser;
            route.push("/private/money")
            Alert.alert("Success",`Yay! submitted ${username}`);
            dispatch(create({
                id: user.id,
                username,
                isAuthed: true
            }));
        } catch (error) {
            Alert.alert("Error", `Cannot register ${error}`)
        } finally {
            setLoading(false);
        }
    }

    return(
        <ScrollView>
            
            <View style={{
                flex: 1,
                flexDirection: "column",
                margin: 10,
                gap: 10,
                padding: 10
            }}>
                <CircleUser style={{alignSelf: "center"}} size={200}  />
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