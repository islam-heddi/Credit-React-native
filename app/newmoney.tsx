import { MoneyModel } from "@/model/Money";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";

export default function NewMoney(){
    const db = useSQLiteContext();
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>();
    const [loading, startTransition] = useTransition()
    const submitData = async () => {
        if(!name) return Alert.alert("Error", "name is missing");
        if(!amount) return Alert.alert("Error", "amount is missing");
        startTransition(async () => {
            try {
                const moneyModel = MoneyModel.getInstance(db);
                
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
            <Button title="Submit" />
        </View>
    </ScrollView>)
}