import type { IMoney } from "@/types/Money";
import { CheckCircle2, Clock3 } from "lucide-react-native";
import { Text, View } from "react-native";

export default function TotalMoney({data}:{data:IMoney[]}){
    const totalDone = data.filter(value => Boolean(value.isDone)).reduce((acc, money) => acc + money.amount, 0);
    const totalUndone = data.filter(value => !Boolean(value.isDone)).reduce((acc, money) => acc + money.amount, 0);
    return (
        <View style={{
            backgroundColor: "#ffffff",
            flexDirection: "row",
            gap: 10,
            padding: 12,
        }}>
            <View style={{ backgroundColor: "#eef8f5", borderRadius: 14, flex: 1, padding: 14 }}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <CheckCircle2 color="#0f766e" size={17} />
                    <Text style={{ color: "#4e6966", fontSize: 12, fontWeight: "700", marginLeft: 7 }}>COMPLETED</Text>
                </View>
                <Text style={{ color: "#102a2a", fontSize: 20, fontWeight: "800", marginTop: 12 }}>{totalDone} DZ</Text>
            </View>

            <View style={{ backgroundColor: "#fff8e7", borderRadius: 14, flex: 1, padding: 14 }}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Clock3 color="#a16207" size={17} />
                    <Text style={{ color: "#806b43", fontSize: 12, fontWeight: "700", marginLeft: 7 }}>OPEN</Text>
                </View>
                <Text style={{ color: "#102a2a", fontSize: 20, fontWeight: "800", marginTop: 12 }}>{totalUndone} DZ</Text>
            </View>
        </View>
    )
}