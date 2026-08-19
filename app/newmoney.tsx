import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

export default function NewMoney(){
    const db = useSQLiteContext();
    const user = useSelector((state: UserPayload) => state.user.value)
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>();
    const [loading, startTransition] = useTransition();
    const route = useRouter();
    const submitData = async () => {
        if(!name) return Alert.alert("Error", "name is missing");
        if(!amount) return Alert.alert("Error", "amount is missing");
        startTransition(async () => {
            try {
                const moneyModel = MoneyModel.getInstance(db);
                await moneyModel.addNewMoney(db, user.id, name, amount);
                Alert.alert("Success","successfully added");
                route.push("/money")
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        })
    }

    return(
    <ScrollView>
        <View>
            <Text>Add a new money</Text>
            <Text>Name</Text>
            <TextInput value={name} onChangeText={(e) => setName(e)} placeholder="from who ? type the name" />
            <Text>Amount $</Text>
            <TextInput placeholder="Amount" keyboardType="numeric" value={amount?.toString()} onChangeText={(e) => setAmount(parseInt(e))}  />
            <Button title={loading? "Loading..." :"Submit"} disabled={loading} onPress={() => submitData()} />
        </View>
    </ScrollView>)
}