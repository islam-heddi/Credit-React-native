import { UserPayload } from "@/store/store";
import { useRouter } from "expo-router";
import { ExternalLink, Info, LockKeyhole, Sparkles } from "lucide-react-native";
import { useEffect } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
export default function About(){
    const user = useSelector((state: UserPayload) => state.user.value);
    const route = useRouter();
    useEffect(() => {
        if(user.isAuthed){
            route.push("/private/money");
        }
    },[route, user]);
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#f6faf8" }}
            contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ alignItems: "center", marginBottom: 34, paddingTop: 20 }}>
                <View style={{ backgroundColor: "#d9f5ed", borderRadius: 20, padding: 14 }}>
                    <Info color="#0f766e" size={30} strokeWidth={2.3} />
                </View>
                <Text style={{ color: "#102a2a", fontSize: 34, fontWeight: "800", marginTop: 16 }}>
                    About Credit
                </Text>
                <Text style={{ color: "#6b7c7a", fontSize: 16, lineHeight: 24, marginTop: 10, textAlign: "center" }}>
                    A calmer way to keep track of money lent to others.
                </Text>
            </View>

            <View style={{ backgroundColor: "#0f766e", borderRadius: 22, marginBottom: 18, padding: 22 }}>
                <Sparkles color="#b9f3e2" size={22} />
                <Text style={{ color: "#ffffff", fontSize: 22, fontWeight: "800", lineHeight: 29, marginTop: 18 }}>
                    Know what is owed, without the mental load.
                </Text>
                <Text style={{ color: "#d9f5ed", fontSize: 15, lineHeight: 23, marginTop: 10 }}>
                    Credit helps you record each loan, remember who owes you, and stay on top of your lending habits.
                </Text>
            </View>

            <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 18, borderWidth: 1, marginBottom: 18, padding: 20 }}>
                <Text style={{ color: "#102a2a", fontSize: 17, fontWeight: "800", marginBottom: 16 }}>
                    Built with care
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                    {["React Native", "Expo", "Redux", "SQLite"].map((technology) => (
                        <View key={technology} style={{ backgroundColor: "#eef8f5", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 }}>
                            <Text style={{ color: "#0f766e", fontSize: 13, fontWeight: "700" }}>{technology}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={{ alignItems: "center", borderTopColor: "#d8e6e1", borderTopWidth: 1, paddingTop: 22 }}>
                <LockKeyhole color="#0f766e" size={20} />
                <Text style={{ color: "#254342", fontSize: 14, fontWeight: "700", marginTop: 10 }}>
                    Your financial notes stay on your device.
                </Text>
                <Text style={{ color: "#718482", fontSize: 13, marginTop: 7 }}>
                    Created by Heddi Islam
                </Text>
                <TouchableOpacity
                    accessibilityRole="link"
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL("https://github.com/islam-heddi/MyMoney-React-native")}
                    style={{ alignItems: "center", flexDirection: "row", gap: 8, marginTop: 18 }}
                >
                    <ExternalLink color="#0f766e" size={18} />
                    <Text style={{ color: "#0f766e", fontSize: 14, fontWeight: "800" }}>View the project on GitHub</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}