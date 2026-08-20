import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import type { IMoney } from "@/types/Money";
import { numberOfPage, pagination } from "@/utils/pagination";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, ArrowRight, Check, SquarePen, Trash2 } from "lucide-react-native";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
export function DataWithPagination({data, onDeleted, doneFilter, onDone}: {
  data: IMoney[];
  onDeleted: (id: number) => void;
  doneFilter?: boolean;
  onDone: (id: number) => void;
}) {
  const user = useSelector((state: UserPayload) => state.user.value);
  const db = useSQLiteContext();
  const route = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [mdata, setMdata] = useState<IMoney[]>([])
    const filteredData = useMemo(
      () => data.filter(value => Boolean(value.isDone) === (doneFilter || false)),
      [data, doneFilter]
    );
    const totalPages = numberOfPage(filteredData);
    useEffect(() => {
      if (totalPages === 0) {
        setCurrentPage(1);
        setMdata([]);
      } else if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      } else if (currentPage >= 1 && currentPage <= totalPages) {
        setMdata(pagination(currentPage, filteredData))
      }
    },[currentPage, filteredData, totalPages]);

    const makeItDone = async (id: number) => {
      try {
        const moneyModel = MoneyModel.getInstance(db);
        await moneyModel.updateDoneToTrueMoney(id, user.id);
        Alert.alert("Success", "You make it done.");
        onDone(id); // NOTE: the onDone callback will update the item in the list and its not from the database.
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
                } catch {
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
        <View style={{ gap: 10 }}>
        {mdata.map((value, index) => <Fragment key={value.id ?? index}>
          <View style={{ backgroundColor: "#ffffff", borderColor: "#edf3f1", borderRadius: 14, borderWidth: 1, flexDirection: "row", overflow: "hidden" }}>
            <View style={{ backgroundColor: Boolean(value.isDone) ? "#0f766e" : "#f0b429", width: 5 }} />
            <View style={{ flex: 1, padding: 13 }}>
              <Pressable
                accessibilityRole="button"
                onPress={() => route.push({
                  pathname:"/private/detail",
                  params: {
                    MoneyId: value.id,
                    fromPerson: value.fromPerson,
                    amount: value.amount,
                    createDate: value.createDate,
                    isDone: Boolean(value.isDone) ? "true" : "false"
                  }
                })}
              >
                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ color: "#102a2a", flex: 1, fontSize: 16, fontWeight: "800" }}>{value.fromPerson}</Text>
                  <Text style={{ color: "#102a2a", fontSize: 16, fontWeight: "800" }}>{value.amount} DZ</Text>
                </View>
                <Text style={{ color: "#718482", fontSize: 13, marginTop: 5 }}>{value.createDate}</Text>
              </Pressable>
              <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                <Text style={{ color: Boolean(value.isDone) ? "#0f766e" : "#a16207", fontSize: 12, fontWeight: "800" }}>
                  {Boolean(value.isDone) ? "COMPLETED" : "OPEN"}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {!doneFilter && <>
                    <Pressable accessibilityLabel="Mark as completed" accessibilityRole="button" onPress={() => makeItDone(value.id as number)} style={{ backgroundColor: "#e6f6f1", borderRadius: 9, padding: 8 }}>
                      <Check color="#0f766e" size={17} strokeWidth={2.5} />
                    </Pressable>
                    <Pressable accessibilityLabel="Edit loan" accessibilityRole="button" onPress={() => route.push({ pathname: "/private/updateMoney", params: { MoneyId: value.id, lName: value.fromPerson, lAmount: value.amount } })} style={{ backgroundColor: "#edf4ff", borderRadius: 9, padding: 8 }}>
                      <SquarePen color="#2563eb" size={17} />
                    </Pressable>
                  </>}
                  <Pressable accessibilityLabel="Delete loan" accessibilityRole="button" onPress={() => deleteRowAlert(value.id as number)} style={{ backgroundColor: "#fff0f0", borderRadius: 9, padding: 8 }}>
                    <Trash2 color="#dc2626" size={17} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Fragment>)}
        </View>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 18 }}>
            <Pressable
              accessibilityLabel="Previous page"
              accessibilityRole="button"
              disabled={totalPages === 0 || currentPage === 1}
              onPress={() => currentPage > 1 && setCurrentPage(p => p - 1)}
              style={{ alignItems: "center", backgroundColor: totalPages === 0 || currentPage === 1 ? "#edf3f1" : "#e6f6f1", borderRadius: 10, padding: 9 }}
            >
              <ArrowLeft color={totalPages === 0 || currentPage === 1 ? "#a5b5b1" : "#0f766e"} size={18} />
            </Pressable>
            <Text style={{ color: "#718482", fontSize: 13, fontWeight: "700", marginHorizontal: 14 }}>{totalPages === 0 ? 0 : currentPage} / {totalPages}</Text>
            <Pressable
              accessibilityLabel="Next page"
              accessibilityRole="button"
              disabled={totalPages === 0 || currentPage === totalPages}
              onPress={() => currentPage < totalPages && setCurrentPage(p => p + 1)}
              style={{ alignItems: "center", backgroundColor: totalPages === 0 || currentPage === totalPages ? "#edf3f1" : "#e6f6f1", borderRadius: 10, padding: 9 }}
            >
              <ArrowRight color={totalPages === 0 || currentPage === totalPages ? "#a5b5b1" : "#0f766e"} size={18} />
            </Pressable>
        </View>
    </>
}