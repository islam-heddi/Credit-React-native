import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import type { IMoney } from "@/types/Money";
import { numberOfPage, pagination } from "@/utils/pagination";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Check, SquarePen, Trash2 } from "lucide-react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
export function DataWithPagination({data, onDeleted, doneFilter}: {
  data: IMoney[];
  onDeleted: (id: number) => void;
  doneFilter?: boolean;
}) {
  const user = useSelector((state: UserPayload) => state.user.value);
  const db = useSQLiteContext();
  const route = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [mdata, setMdata] = useState<IMoney[]>([])
    useEffect(() => {
      const totalPages = parseInt(numberOfPage(data).toString());
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      } else if(currentPage >= 1 && currentPage <= totalPages){
        setMdata(pagination(currentPage, data))
      }
    },[currentPage, data]);

    const makeItDone = async (id: number) => {
      try {
        const moneyModel = MoneyModel.getInstance(db);
        await moneyModel.updateDoneToTrueMoney(id, user.id);
        Alert.alert("Success", "You make it done.");
        onDeleted(id); // NOTE: the onDeleted callback will delete the item from the list and its not from the database.
      } catch (error) {
        Alert.alert("Error", `${error}`)
      }
    }


    const deleteRowAlert =(id: number) => {
      if(!id) return Alert.alert("id not provided");
        Alert.alert(
        "Confirm Action",                 // Title of the dialog box
        "Are you sure you want to delete?", // Description message
        [
          {
            text: "Cancel",
            onPress: () => console.log("User canceled"),
            style: "cancel"               // iOS styling layout hint
          },
          { 
            text: "Confirm", 
            onPress: async () => {
              try {
                  const moneyModel = MoneyModel.getInstance(db);
                  await moneyModel.deleteMoney(id, user.id)
                  onDeleted(id);
                  Alert.alert("Success", "You have been deleted successfully.");
                } catch (error) {
                 Alert.alert("Error", "Error while deleting try again.")
              }
            },
            style: "default"              // Can also use 'destructive' for delete actions
          }
        ],
        { cancelable: true }              // Allows Android users to dismiss by clicking outside
      );
    }

    return <>
        {mdata.filter(value => value.isDone == (doneFilter||false)).map((value, index) => <Fragment key={index}>
          <View style={{flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: 3,
              backgroundColor: index%2? "#fff": "#ededed"
          }}>
            <View style={{
              flex:1,
              justifyContent: "space-between",
              flexDirection: "row",
              margin: 6,
              alignItems: "center"
            }}>
              <View style={{
                flex: 0,
                justifyContent: "center",
              }}>
                <Pressable onPress={() => route.push({
                  pathname:"/detail",
                  params: {
                    MoneyId: value.id,
                    fromPerson: value.fromPerson,
                    amount: value.amount,
                    createDate: value.createDate,
                    isDone: value.isDone? "true" : "false"
                  }
                })}>
                <Text>{value.fromPerson}</Text>
                <Text>in {value.createDate}</Text>
                </Pressable>
              </View>
              <Text>{value.amount} DZ</Text>
            </View>
            <View style={{
              flex: 0,
              flexDirection: "row",
              gap: 3
            }}>
              
              <Pressable onPress={() => makeItDone(value.id as number)} style={{
                backgroundColor: "#b2ff89",
                padding: 4,
              }}>
                <Text style={{color: "white"}}><Check /></Text>
              </Pressable>
              <Pressable onPress={() => route.push({
                pathname: "/updateMoney",
                params: {
                  MoneyId: value.id,
                  lName: value.fromPerson,
                  lAmount: value.amount,
                }
              })} style={{
                backgroundColor: "#89c8ff",
                padding: 4,
              }}>
                <Text style={{color: "white"}}><SquarePen /></Text>
              </Pressable>
              <Pressable onPress={() => deleteRowAlert(value.id as number)} style={{
                backgroundColor: "#ff0202",
                padding: 4,
              }}>
                <Text style={{color: "white"}}><Trash2 /></Text>
              </Pressable>
            </View>
          </View>
        </Fragment>)}
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 4
        }}>
            <Pressable onPress={() => currentPage > 1 ? setCurrentPage(p => p-1): setCurrentPage(1)}>
            <Text>&lt;&lt; Previous </Text>
            </Pressable>
            <Text style={{
                borderColor: "black",
                borderWidth: 1,
                padding: 2,
                margin: 2
            }}>{currentPage}</Text>
            <Text>/ {parseInt(numberOfPage(data).toString())}</Text>
            <Pressable onPress={() => currentPage >= parseInt(numberOfPage(data).toString())? setCurrentPage(parseInt(numberOfPage(data).toString())): setCurrentPage(p => p+1)}>
            <Text>Next &gt;&gt; </Text>
            </Pressable>
        </View>
    </>
}