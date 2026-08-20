import { UserModel } from "@/model/User";
import { UserPayload } from "@/store/store";
import { create } from "@/store/userSlice";
import { IUser } from "@/types/User";
import { useRouter } from "expo-router";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react-native";
import { useEffect, useState, useTransition } from "react";
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
export default function Login(){
    const user = useSelector((state: UserPayload) => state.user.value);
    const dispatch = useDispatch();
    const db: SQLiteDatabase = useSQLiteContext();
    const route = useRouter()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, startTransition] = useTransition();
    useEffect(() => {
        if(user.isAuthed){
            route.push("/private/money");
        }
    },[route, user]);
    const submitData = async () : Promise<unknown> => {
        if(username.length < 4) return Alert.alert("Error","Username must be atleast 4 letters");
        if(password.length < 4) return Alert.alert("Error","Password must be atleast 4 letters");
        startTransition(async () => {
            try {
                const userModel = UserModel.getInstance(db);
                const user: IUser|unknown = await userModel.findUserPassword(username, password);
                if(user instanceof Error) throw new Error(user.message);
                route.push("/private/money")
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: "#f6faf8" }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, padding: 24 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1, justifyContent: "space-between", paddingTop: 24, paddingBottom: 12 }}>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 42 }}>
                            <View style={{ backgroundColor: "#d9f5ed", borderRadius: 14, padding: 10 }}>
                                <KeyRound size={24} color="#0f766e" strokeWidth={2.5} />
                            </View>
                            <Text style={{ fontSize: 24, fontWeight: "800", color: "#102a2a", letterSpacing: 0 }}>
                                Credit
                            </Text>
                        </View>

                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ fontSize: 34, lineHeight: 40, fontWeight: "800", color: "#102a2a" }}>
                                Welcome back.
                            </Text>
                            <Text style={{ marginTop: 10, color: "#6b7c7a", fontSize: 16, lineHeight: 24 }}>
                                Keep your lending life clear and in control.
                            </Text>
                        </View>

                        <View style={{ gap: 20 }}>
                            <View>
                                <Text style={{ marginBottom: 8, color: "#254342", fontSize: 13, fontWeight: "700" }}>
                                    USERNAME
                                </Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="Enter your username"
                                    placeholderTextColor="#9aaba8"
                                    value={username}
                                    onChangeText={setUsername}
                                    style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 14, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 16, paddingVertical: 15 }}
                                />
                            </View>
                            <View>
                                <Text style={{ marginBottom: 8, color: "#254342", fontSize: 13, fontWeight: "700" }}>
                                    PASSWORD
                                </Text>
                                <TextInput
                                    autoCapitalize="none"
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9aaba8"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 14, borderWidth: 1, color: "#102a2a", fontSize: 16, paddingHorizontal: 16, paddingVertical: 15 }}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            accessibilityRole="button"
                            disabled={loading}
                            onPress={submitData}
                            activeOpacity={0.85}
                            style={{ alignItems: "center", backgroundColor: loading ? "#8ccfc0" : "#0f766e", borderRadius: 14, flexDirection: "row", justifyContent: "center", marginTop: 28, paddingVertical: 16 }}
                        >
                            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "800" }}>
                                {loading ? "Signing in..." : "Sign in"}
                            </Text>
                            {!loading && <ArrowRight color="#ffffff" size={20} style={{ marginLeft: 8 }} />}
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 48 }}>
                        <View style={{ alignItems: "center", flexDirection: "row", gap: 6, marginBottom: 18 }}>
                            <ShieldCheck color="#0f766e" size={16} />
                            <Text style={{ color: "#718482", fontSize: 13 }}>Your data stays private</Text>
                        </View>
                        <TouchableOpacity onPress={() => route.push("/register")} activeOpacity={0.7}>
                            <Text style={{ color: "#0f766e", fontSize: 15, fontWeight: "700" }}>
                                New to Credit? Create an account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}