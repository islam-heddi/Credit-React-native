import { UserModel } from "@/model/User";
import { UserPayload } from "@/store/store";
import { create } from "@/store/userSlice";
import { useSQLiteContext } from "expo-sqlite";
import { SettingsIcon } from "lucide-react-native";
import { useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function Settings(){
    const db = useSQLiteContext();
    const user = useSelector((state: UserPayload) => state.user.value);
    const [username, setUsername] = useState<string>(user.username);
    const [password, setPassword] = useState<string>("");
    const [passwordU, setPasswordU] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, startTranstion] = useTransition();
    const dispatch = useDispatch();
    const changeUsername = () => {
        if(!username) return Alert.alert("Error", "enter the username");
        if(!passwordU) return Alert.alert("Error", "enter the password")
        startTranstion(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                const result = await userModel.updateUsername(user.id.toString(), username, passwordU)
                if(result instanceof Error) throw new Error((result as Error).message);
                Alert.alert("Success", "update successfully");
                dispatch(create({
                    id: user.id,
                    username,
                    isAuthed:true
                }));
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        })
    }

    const changePassword = () => {
        if(!password) return Alert.alert("Error", "enter the password")
        if(!newPassword) return Alert.alert("Error", "enter the new password")
        if(!confirmPassword) return Alert.alert("Error", "enter the confirm password")
        if(confirmPassword !== newPassword) return Alert.alert("Error", "the confirm password does not match the new password");

        startTranstion(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                const result = await userModel.updatePassword(user.id.toString(), password,newPassword);
                if(result instanceof Error) throw new Error(result.message);
                Alert.alert("Success", "password updated successfully");
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        })
    }

    return(
    <ScrollView>
        <View>
            <View>
                <SettingsIcon />
                <Text>Settings</Text>
            </View>
            <View>
                <Text>Change the username</Text>
                <Text>Username</Text>
                <TextInput placeholder="Enter the username" value={username} onChangeText={(e) => setUsername(e)} />
                <Text>Password</Text>
                <TextInput secureTextEntry={true} placeholder="Enter the current Password" value={passwordU} onChangeText={(e) => setPasswordU(e)} />
                <Button onPress={() => changeUsername()} disabled={loading} title={loading? "Loading..." : "submit"} />
            </View>
            <View>
                <Text>Change the password</Text>
                <Text>Password</Text>
                <TextInput secureTextEntry={true} placeholder="Enter the current password" value={password} onChangeText={(e) => setPassword(e)} />
                <Text>New Password</Text>
                <TextInput secureTextEntry={true} placeholder="Enter the new Password" value={newPassword} onChangeText={(e) => setNewPassword(e)} />           
                <Text>Confirm Password</Text>
                <TextInput secureTextEntry={true} placeholder="Enter the Confrim Password" value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} />
                <Button onPress={() => changePassword()} title={loading? "Loading..." : "submit"} disabled={loading} />
            </View>

            </View>
            
    </ScrollView>)
}