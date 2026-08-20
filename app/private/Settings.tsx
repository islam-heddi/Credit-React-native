import { UserModel } from "@/model/User";
import { UserPayload } from "@/store/store";
import { create } from "@/store/userSlice";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from "lucide-react-native";
import { useState, useTransition } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
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
        if (!username) return Alert.alert("Error", "enter the username");
        if (!passwordU) return Alert.alert("Error", "enter the password");

        startTranstion(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                const result = await userModel.updateUsername(user.id.toString(), username, passwordU);
                if (result instanceof Error) throw new Error((result as Error).message);
                Alert.alert("Success", "update successfully");
                dispatch(create({
                    id: user.id,
                    username,
                    isAuthed: true,
                }));
            } catch (error) {
                Alert.alert("Error", `${error}`);
            }
        });
    };

    const changePassword = () => {
        if (!password) return Alert.alert("Error", "enter the password");
        if (!newPassword) return Alert.alert("Error", "enter the new password");
        if (!confirmPassword) return Alert.alert("Error", "enter the confirm password");
        if (confirmPassword !== newPassword) return Alert.alert("Error", "the confirm password does not match the new password");

        startTranstion(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                const result = await userModel.updatePassword(user.id.toString(), password, newPassword);
                if (result instanceof Error) throw new Error(result.message);
                Alert.alert("Success", "password updated successfully");
            } catch (error) {
                Alert.alert("Error", `${error}`);
            }
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: "#f6faf8" }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ alignItems: "center", marginBottom: 24 }}>
                    <View style={{ backgroundColor: "#d9f5ed", borderRadius: 18, padding: 14 }}>
                        <ShieldCheck color="#0f766e" size={28} strokeWidth={2.2} />
                    </View>
                    <Text style={{ color: "#102a2a", fontSize: 32, fontWeight: "800", marginTop: 16 }}>Settings</Text>
                    <Text style={{ color: "#6b7c7a", fontSize: 15, lineHeight: 23, marginTop: 8, textAlign: "center" }}>
                        Manage your account in one place.
                    </Text>
                </View>

                <View style={{ backgroundColor: "#0f766e", borderRadius: 18, marginBottom: 20, padding: 18 }}>
                    <Text style={{ color: "#b9f3e2", fontSize: 12, fontWeight: "700", letterSpacing: 0.5 }}>ACCOUNT INFO</Text>
                    <Text style={{ color: "#ffffff", fontSize: 22, fontWeight: "800", marginTop: 10 }}>{user.username}</Text>
                    <View style={{ alignItems: "center", backgroundColor: "rgba(255,255,255,0.14)", borderRadius: 999, flexDirection: "row", marginTop: 10, paddingHorizontal: 10, paddingVertical: 6, alignSelf: "flex-start" }}>
                        <View style={{ backgroundColor: "#b9f3e2", borderRadius: 999, height: 8, width: 8 }} />
                        <Text style={{ color: "#e6fff8", fontSize: 12, fontWeight: "700", marginLeft: 8 }}>Active account</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 20, borderWidth: 1, marginBottom: 20, padding: 20 }}>
                    <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 16 }}>
                        <UserRound color="#0f766e" size={18} />
                        <Text style={{ color: "#102a2a", fontSize: 18, fontWeight: "800", marginLeft: 10 }}>Change username</Text>
                    </View>

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8 }}>USERNAME</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter the username"
                        placeholderTextColor="#9aaba8"
                        style={{ backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 12, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 14, paddingVertical: 14 }}
                    />

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8, marginTop: 18 }}>PASSWORD</Text>
                    <TextInput
                        secureTextEntry
                        value={passwordU}
                        onChangeText={setPasswordU}
                        placeholder="Enter the current password"
                        placeholderTextColor="#9aaba8"
                        style={{ backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 12, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 14, paddingVertical: 14 }}
                    />

                    <TouchableOpacity
                        accessibilityRole="button"
                        disabled={loading}
                        onPress={changeUsername}
                        activeOpacity={0.85}
                        style={{ alignItems: "center", backgroundColor: loading ? "#8ccfc0" : "#0f766e", borderRadius: 12, flexDirection: "row", justifyContent: "center", marginTop: 22, paddingVertical: 14 }}
                    >
                        <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "800" }}>{loading ? "Updating..." : "Update username"}</Text>
                        {!loading && <ArrowRight color="#ffffff" size={18} style={{ marginLeft: 8 }} />}
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 20, borderWidth: 1, padding: 20 }}>
                    <View style={{ alignItems: "center", flexDirection: "row", marginBottom: 16 }}>
                        <LockKeyhole color="#0f766e" size={18} />
                        <Text style={{ color: "#102a2a", fontSize: 18, fontWeight: "800", marginLeft: 10 }}>Change password</Text>
                    </View>

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8 }}>CURRENT PASSWORD</Text>
                    <TextInput
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter the current password"
                        placeholderTextColor="#9aaba8"
                        style={{ backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 12, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 14, paddingVertical: 14 }}
                    />

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8, marginTop: 18 }}>NEW PASSWORD</Text>
                    <TextInput
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter the new password"
                        placeholderTextColor="#9aaba8"
                        style={{ backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 12, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 14, paddingVertical: 14 }}
                    />

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8, marginTop: 18 }}>CONFIRM PASSWORD</Text>
                    <TextInput
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm new password"
                        placeholderTextColor="#9aaba8"
                        style={{ backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 12, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 14, paddingVertical: 14 }}
                    />

                    <TouchableOpacity
                        accessibilityRole="button"
                        disabled={loading}
                        onPress={changePassword}
                        activeOpacity={0.85}
                        style={{ alignItems: "center", backgroundColor: loading ? "#8ccfc0" : "#0f766e", borderRadius: 12, flexDirection: "row", justifyContent: "center", marginTop: 22, paddingVertical: 14 }}
                    >
                        <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "800" }}>{loading ? "Updating..." : "Update password"}</Text>
                        {!loading && <ArrowRight color="#ffffff" size={18} style={{ marginLeft: 8 }} />}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}