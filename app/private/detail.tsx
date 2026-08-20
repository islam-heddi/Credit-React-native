import { UserPayload } from "@/store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, CalendarDays, CheckCircle2, HandCoins, UserRound } from "lucide-react-native";
import { useEffect } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function Detail() {
    const route = useRouter();
    const user = useSelector((state: UserPayload) => state.user.value);
    useEffect(() => {
        if(!user.isAuthed){
            route.push("/");
            Alert.alert("Error", "Please authenticate");
        }
    },[route, user]);
    const {MoneyId,
        fromPerson,
        amount,
        createDate,
        isDone
    }=useLocalSearchParams();
    const isRefunded = isDone === "true";

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#f6faf8" }}
            contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30, paddingTop: 12 }}>
                <Pressable
                    accessibilityLabel="Go back"
                    accessibilityRole="button"
                    onPress={() => route.back()}
                    style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 12, borderWidth: 1, padding: 10 }}
                >
                    <ArrowLeft color="#0f766e" size={20} />
                </Pressable>
                <Text style={{ color: "#102a2a", fontSize: 24, fontWeight: "800", marginLeft: 14 }}>Loan detail</Text>
            </View>

            <View style={{ alignItems: "center", backgroundColor: "#0f766e", borderRadius: 22, marginBottom: 20, padding: 24 }}>
                <View style={{ backgroundColor: "#d9f5ed", borderRadius: 18, padding: 13 }}>
                    <HandCoins color="#0f766e" size={31} strokeWidth={2.2} />
                </View>
                <Text style={{ color: "#b9f3e2", fontSize: 13, fontWeight: "700", marginTop: 17 }}>TOTAL AMOUNT</Text>
                <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: "800", marginTop: 5 }}>{amount} DZ</Text>
                <View style={{ alignItems: "center", backgroundColor: isRefunded ? "#b9f3e2" : "#fce9b5", borderRadius: 20, flexDirection: "row", marginTop: 15, paddingHorizontal: 12, paddingVertical: 8 }}>
                    <CheckCircle2 color={isRefunded ? "#0f766e" : "#a16207"} size={16} />
                    <Text style={{ color: isRefunded ? "#0f766e" : "#854d0e", fontSize: 13, fontWeight: "800", marginLeft: 6 }}>
                        {isRefunded ? "Refunded" : "Awaiting repayment"}
                    </Text>
                </View>
            </View>

            <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 18, borderWidth: 1, padding: 20 }}>
                <Text style={{ color: "#102a2a", fontSize: 18, fontWeight: "800", marginBottom: 18 }}>Details</Text>
                <View style={{ alignItems: "center", flexDirection: "row", paddingVertical: 13 }}>
                    <UserRound color="#0f766e" size={20} />
                    <View style={{ flex: 1, marginLeft: 13 }}>
                        <Text style={{ color: "#718482", fontSize: 12, fontWeight: "700" }}>BORROWER</Text>
                        <Text style={{ color: "#102a2a", fontSize: 16, fontWeight: "700", marginTop: 4 }}>{fromPerson}</Text>
                    </View>
                </View>
                <View style={{ borderTopColor: "#edf3f1", borderTopWidth: 1, flexDirection: "row", paddingVertical: 13 }}>
                    <CalendarDays color="#0f766e" size={20} />
                    <View style={{ flex: 1, marginLeft: 13 }}>
                        <Text style={{ color: "#718482", fontSize: 12, fontWeight: "700" }}>RECORDED ON</Text>
                        <Text style={{ color: "#102a2a", fontSize: 16, fontWeight: "700", marginTop: 4 }}>{createDate}</Text>
                    </View>
                </View>
                <View style={{ borderTopColor: "#edf3f1", borderTopWidth: 1, flexDirection: "row", paddingTop: 13 }}>
                    <HandCoins color="#0f766e" size={20} />
                    <View style={{ flex: 1, marginLeft: 13 }}>
                        <Text style={{ color: "#718482", fontSize: 12, fontWeight: "700" }}>REFERENCE</Text>
                        <Text style={{ color: "#102a2a", fontSize: 16, fontWeight: "700", marginTop: 4 }}>#{MoneyId}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}