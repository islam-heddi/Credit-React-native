import { DataWithPagination } from "@/component/DataWithPagination";
import TotalMoney from "@/component/TotalMoney";
import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import { clear } from "@/store/userSlice";
import type { IMoney } from "@/types/Money";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { CheckCircle2, Clock3, DoorOpen, Plus, SettingsIcon } from "lucide-react-native";
import React, { Fragment, useEffect, useState, useTransition } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function Index() {
  const db = useSQLiteContext();
  const user = useSelector((state: UserPayload) => state.user.value);
  const [loading, startTranstion] = useTransition();
  const route = useRouter()
  const [data, setData] = useState<IMoney[]>([]);
  const [filterDone, setFilterDone] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
        if(!user.isAuthed){
            route.push("/");
            Alert.alert("Error", "Please authenticate");
        }
    },[route, user]);
  useEffect(() => {
    startTranstion(async () => {
      try {
        const moneyModel = MoneyModel.getInstance(db);
        const money: IMoney[] = await moneyModel.findMoney(user.id) as IMoney[];
        setData(money);
      } catch (error) {
        Alert.alert("Error", `${error}`)
      }
    })
  },[db, user])

  return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f6faf8" }}
        contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <View>
            <Text style={{ color: "#718482", fontSize: 13, fontWeight: "700", letterSpacing: 0.3 }}>YOUR MONEY</Text>
            <Text style={{ color: "#102a2a", fontSize: 28, fontWeight: "800", marginTop: 5 }}>Hello, {user.username}</Text>
          </View>
          <Pressable
            accessibilityLabel="Settings"
            accessibilityRole="button"
            onPress={() => {
              route.push("/private/Settings");
            }}
            style={{ alignItems: "center", backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 13, borderWidth: 1, padding: 11 }}
          >
            <SettingsIcon color="#6d760f" size={20} />
          </Pressable>
          <Pressable
            accessibilityLabel="Sign out"
            accessibilityRole="button"
            onPress={() => {
              dispatch(clear());
              route.push("/login");
            }}
            style={{ alignItems: "center", backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 13, borderWidth: 1, padding: 11 }}
          >
            <DoorOpen color="#0f766e" size={20} />
          </Pressable>
        </View>

        <View style={{ backgroundColor: "#0f766e", borderRadius: 22, marginBottom: 20, padding: 20 }}>
          <Text style={{ color: "#b9f3e2", fontSize: 13, fontWeight: "700" }}>KEEP IT CLEAR</Text>
          <Text style={{ color: "#ffffff", fontSize: 22, fontWeight: "800", lineHeight: 29, marginTop: 12 }}>Every repayment, in one place.</Text>
          <Text style={{ color: "#d9f5ed", fontSize: 14, lineHeight: 21, marginTop: 8 }}>Stay ahead of what is owed to you.</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => route.push("/private/newmoney")}
            style={{ alignItems: "center", alignSelf: "flex-start", backgroundColor: "#ffffff", borderRadius: 12, flexDirection: "row", marginTop: 18, paddingHorizontal: 14, paddingVertical: 11 }}
          >
            <Plus color="#0f766e" size={18} strokeWidth={3} />
            <Text style={{ color: "#0f766e", fontSize: 14, fontWeight: "800", marginLeft: 7 }}>New money</Text>
          </Pressable>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#102a2a", fontSize: 18, fontWeight: "800", marginBottom: 11 }}>Overview</Text>
          <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 16, borderWidth: 1, overflow: "hidden" }}>
            <TotalMoney data={data} />
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 11 }}>
            <Text style={{ color: "#102a2a", fontSize: 18, fontWeight: "800" }}>Your repayments</Text>
            <Text style={{ color: "#718482", fontSize: 13 }}>{data.length} {data.length === 1 ? "entry" : "entries"}</Text>
          </View>
          <View style={{ backgroundColor: "#e6f1ed", borderRadius: 13, flexDirection: "row", padding: 4 }}>
            <Pressable onPress={() => setFilterDone(false)} style={{ alignItems: "center", backgroundColor: !filterDone ? "#ffffff" : "transparent", borderRadius: 10, flex: 1, flexDirection: "row", justifyContent: "center", paddingVertical: 11 }}>
              <Clock3 color={!filterDone ? "#0f766e" : "#718482"} size={16} />
              <Text style={{ color: !filterDone ? "#0f766e" : "#718482", fontSize: 13, fontWeight: "800", marginLeft: 7 }}>Open</Text>
            </Pressable>
            <Pressable onPress={() => setFilterDone(true)} style={{ alignItems: "center", backgroundColor: filterDone ? "#ffffff" : "transparent", borderRadius: 10, flex: 1, flexDirection: "row", justifyContent: "center", paddingVertical: 11 }}>
              <CheckCircle2 color={filterDone ? "#0f766e" : "#718482"} size={16} />
              <Text style={{ color: filterDone ? "#0f766e" : "#718482", fontSize: 13, fontWeight: "800", marginLeft: 7 }}>Completed</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ backgroundColor: "#ffffff", borderColor: "#d8e6e1", borderRadius: 16, borderWidth: 1, minHeight: 120, overflow: "hidden", padding: 12 }}>
          {loading ? <Text style={{ color: "#718482", padding: 16, textAlign: "center" }}>Loading your repayments...</Text> : <Fragment>
            {data.length < 1 ? <View style={{ alignItems: "center", padding: 24 }}>
              <Text style={{ color: "#102a2a", fontSize: 16, fontWeight: "700", textAlign: "center" }}>Your list is empty</Text>
              <Text style={{ color: "#718482", fontSize: 14, marginTop: 7, textAlign: "center" }}>Add your first loan to start tracking it.</Text>
            </View> : <DataWithPagination
              data={data}
              onDeleted={(deletedId) => {
                setData((currentData) => currentData.filter((money) => money.id !== deletedId));
              }}
              doneFilter={filterDone}
              onDone={(doneId) => {
                setData((currentData) => currentData.map((money) => money.id === doneId ? { ...money, isDone: true } : money));
              }}
            />}
          </Fragment>}
        </View>
      </ScrollView>
  );
}
