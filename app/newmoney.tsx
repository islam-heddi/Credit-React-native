import { useState, useTransition } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

export default function NewMoney(){
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>();
    const [loading, startTransition] = useTransition()
    const submitData = async () => {
        // later
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