import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

export default function UpdateMoney(){
    const db = useSQLiteContext();
    const user = useSelector((state: UserPayload) => state.user.value);
    const {lName, lAmount, MoneyId} = useLocalSearchParams();
    const [name, setName] = useState<string>(lName as string);
    const [amount, setAmount] = useState<string>(lAmount as string);
    const [loading, startTransition] = useTransition();
    const route = useRouter();
    const submitData = async () => {
        if(!name) return Alert.alert("Error", "name is missing");
        if(!amount) return Alert.alert("Error", "amount is missing");
        startTransition(async () => {
            try {
                const moneyModel = MoneyModel.getInstance(db);
                await moneyModel.updateMoney(db,parseInt(MoneyId as string), name, amount);
                Alert.alert("Success","successfully updated");
                route.push("/money")
            } catch (error) {
                Alert.alert("Error", `${error}`)
            }
        })
    }

    return(
    <ScrollView>
        <View>
            <Text>Update</Text>
            <Text>Name</Text>
            <TextInput value={name} onChangeText={(e) => setName(e)} placeholder="from who ? type the name" />
            <Text>Amount $</Text>
            <TextInput placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={(e) => setAmount(e)}  />
            <Button title={loading? "Loading..." :"Submit"} disabled={loading} onPress={() => submitData()} />
        </View>
    </ScrollView>)
}