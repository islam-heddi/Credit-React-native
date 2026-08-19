import { UserModel } from "@/model/User";
import { create } from "@/store/userSlice";
import { IUser } from "@/types/User";
import { useRouter } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { Key } from "lucide-react-native";
import { useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Login(){
    const dispatch = useDispatch();
    const db: SQLiteDatabase = useSQLiteContext();
    const route = useRouter()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, startTransition] = useTransition();

    const submitData = async () : Promise<unknown> => {
        if(username.length < 4) return Alert.alert("Error","Username must be atleast 4 letters");
        if(password.length < 4) return Alert.alert("Error","Password must be atleast 4 letters");
        startTransition(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                const user: IUser|unknown = await userModel.findUserPassword(username, password);
                if(!user) throw new Error(user as string);
                route.push("/money")
                Alert.alert("Success",`Yay! welcome back ${(user as IUser).username}`);
                dispatch(create({
                    username: (user as IUser).username,
                    id: (user as IUser).id,
                    isAuthed: true
                }));
            } catch (error) {
                Alert.alert("Error", `${error}`);
            }
        })
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
                <Key style={{alignSelf: "center"}} size={200}  />
                <Text>Begin with completing your information below:</Text>
                <Text>Username:</Text>
                <TextInput placeholder="Enter your username" value={username} onChangeText={(e) => setUsername(e)} />
                <Text>Password:</Text>
                <TextInput secureTextEntry={true} placeholder="Enter your password" value={password} onChangeText={(e) => setPassword(e)} />
                <View style={{
                    flex: 1,
                    gap: 16
                }}>

                <Button disabled={loading} title={loading? "Loading..." :"Login"} onPress={() => submitData()} />
                <Button title="New Account" onPress={() => route.push("/register")} />

                </View>
                
            </View>
        </ScrollView>
    )
}