import type { IMoney } from "@/types/Money";
import { Text, View } from "react-native";

export default function TotalMoney({data}:{data:IMoney[]}){
    const totalDone = data.filter(value => value.isDone == true).reduce((acc, money) => acc + money.amount, 0);
    const totalUndone = data.filter(value => value.isDone == false).reduce((acc, money) => acc + money.amount, 0);
    return (
        <View style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#ededed"
        }}>
            <Text>Total Done</Text>
            <Text>{totalDone} DZ</Text>
            
            <Text>Total Undone</Text>
            <Text>{totalUndone} DZ</Text>
        </View>
    )
}