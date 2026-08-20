import { UserPayload } from "@/store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HandCoins } from "lucide-react-native";
import { useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function Detail() {
    const route = useRouter();
    const user = useSelector((state: UserPayload) => state.user.value);
    useEffect(() => {
        if(!user.isAuthed){
            route.push("/");
            Alert.alert("Error", "Please authenticate");
        }
    },[user]);
    const {MoneyId,
        fromPerson,
        amount,
        createDate,
        isDone
    }=useLocalSearchParams();
    return (
        <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: "column",

            }}>
                <HandCoins size={100} style={{
                    alignSelf: "center",
                    margin: 10
                }} />
                <Text style={{fontSize: 20, alignSelf: "center", margin: 10}}>Detail</Text>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "white"

                }}>
                    <Text>Money Id</Text>
                    <Text>{MoneyId}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "#ededed"

                }}>
                    <Text>from</Text>
                    <Text>{fromPerson}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "white"

                }}>
                    <Text>amount</Text>
                    <Text>{amount}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "#ededed"

                }}>
                    <Text>Since</Text>
                    <Text>{createDate}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    backgroundColor: "white"

                }}>
                    <Text>Refunded</Text>
                    <Text>{isDone == "true"? "Yes": "No"}</Text>
                </View>
            </View>
        </ScrollView>
    );
}