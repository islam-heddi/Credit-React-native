import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowRight, Banknote, NotepadText, UserRound } from "lucide-react-native";
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
import { useSelector } from "react-redux";
export default function UpdateMoney(){
    const db = useSQLiteContext();
    const user = useSelector((state: UserPayload) => state.user.value);
    const {lName, lAmount, MoneyId} = useLocalSearchParams();
    const [name, setName] = useState<string>(lName as string);
    const [amount, setAmount] = useState<string>(lAmount as string);
    const [loading, startTransition] = useTransition();
    const route = useRouter();
    useEffect(() => {
        if(!user.isAuthed){
            route.push("/");
            Alert.alert("Error", "Please authenticate");
        }
    },[route, user]);
    const submitData = async () => {
        if(!name) return Alert.alert("Error", "name is missing");
        if(!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) return Alert.alert("Error", "Enter a valid amount");
        startTransition(async () => {
            try {
                const moneyModel = MoneyModel.getInstance(db);
                await moneyModel.updateMoney(db,parseInt(MoneyId as string), name, amount);
                Alert.alert("Success","successfully updated");
                route.push("/private/money")
            } catch (error) {
                Alert.alert("Error", `${error}`)
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
            <View style={{ flex: 1, paddingTop: 20 }}>
                <View style={{ alignItems: "center", marginBottom: 36 }}>
                    <View style={{ backgroundColor: "#d9f5ed", borderRadius: 20, padding: 15 }}>
                        <NotepadText color="#0f766e" size={34} strokeWidth={2.2} />
                    </View>
                    <Text style={{ color: "#102a2a", fontSize: 32, fontWeight: "800", marginTop: 16 }}>Edit loan</Text>
                    <Text style={{ color: "#6b7c7a", fontSize: 15, lineHeight: 23, marginTop: 8, textAlign: "center" }}>
                        Keep the details accurate as things change.
                    </Text>
                </View>

                <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 20, borderWidth: 1, padding: 20 }}>
                    <Text style={{ color: "#102a2a", fontSize: 18, fontWeight: "800", marginBottom: 20 }}>Loan details</Text>

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8 }}>WHO IS BORROWING?</Text>
                    <View style={{ alignItems: "center", backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 14, borderWidth: 1, flexDirection: "row", marginBottom: 20, paddingHorizontal: 14 }}>
                        <UserRound color="#0f766e" size={19} />
                        <TextInput
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter their name"
                            placeholderTextColor="#9aaba8"
                            style={{ color: "#102a2a", flex: 1, fontSize: 16, paddingHorizontal: 11, paddingVertical: 15 }}
                        />
                    </View>

                    <Text style={{ color: "#254342", fontSize: 13, fontWeight: "700", marginBottom: 8 }}>AMOUNT</Text>
                    <View style={{ alignItems: "center", backgroundColor: "#f6faf8", borderColor: "#d8e6e1", borderRadius: 14, borderWidth: 1, flexDirection: "row", paddingHorizontal: 14 }}>
                        <Banknote color="#0f766e" size={19} />
                        <TextInput
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0.00"
                            placeholderTextColor="#9aaba8"
                            style={{ color: "#102a2a", flex: 1, fontSize: 19, fontWeight: "700", paddingHorizontal: 11, paddingVertical: 15 }}
                        />
                        <Text style={{ color: "#718482", fontSize: 14, fontWeight: "700" }}>DZ</Text>
                    </View>

                    <TouchableOpacity
                        accessibilityRole="button"
                        disabled={loading}
                        onPress={submitData}
                        activeOpacity={0.85}
                        style={{ alignItems: "center", backgroundColor: loading ? "#8ccfc0" : "#0f766e", borderRadius: 14, flexDirection: "row", justifyContent: "center", marginTop: 28, paddingVertical: 16 }}
                    >
                        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "800" }}>{loading ? "Saving..." : "Save changes"}</Text>
                        {!loading && <ArrowRight color="#ffffff" size={20} style={{ marginLeft: 8 }} />}
                    </TouchableOpacity>
                </View>

                <Text style={{ color: "#718482", fontSize: 13, lineHeight: 20, marginTop: 18, textAlign: "center" }}>
                    Your updated details will appear in your repayment list.
                </Text>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>)
}