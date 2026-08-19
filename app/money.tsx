import { DataWithPagination } from "@/component/DataWithPagination";
import TotalMoney from "@/component/TotalMoney";
import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import { clear } from "@/store/userSlice";
import type { IMoney } from "@/types/Money";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { DoorOpen } from "lucide-react-native";
import React, { Fragment, useEffect, useState, useTransition } from "react";
import { Alert, Button, Pressable, ScrollView, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
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
    startTranstion(async () => {
      try {
        const moneyModel = MoneyModel.getInstance(db);
        const money: IMoney[] = await moneyModel.findMoney(user.id) as IMoney[];
        setData(money);
      } catch (error) {
        Alert.alert("Error", `${error}`)
      }
    })
  },[user])

  return (
    <ScrollView>
      <View>
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
          alignItems: "center"
        }}>
        <Text style={{padding: 10}}>{user.id} / {user.username}</Text>
        <Pressable style={{
          flex: 0,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          margin: 10
        }} onPress={() => {
          route.push("/login")
          dispatch(clear())
        }}>
          <DoorOpen color={"red"}/>
          <Text style={{color:"red"}}>Exit</Text>
        </Pressable>
        </View>
        <View style={{
          margin: 10
        }}>
        <Button title="+ New Money" onPress={() => route.push("/newmoney")} color={"black"} />
        <Text>You see your refunds below</Text>
        </View>
        <TotalMoney data={data} />
        <View style={{
          backgroundColor: "white",
          margin: 10
        }}>
          <RNPickerSelect
              onValueChange={(value) => setFilterDone(value)}
              items={[
                { label: 'done', value: true },
                { label: 'not done', value: false },
              ]}
              placeholder={{ label: 'Select your purpose...', value: false }}
          />
        </View>
        <View style={{
          margin: 20
        }}>
          {loading? <Text>"Please wait..."</Text>:<Fragment>
            {
              data.length < 1? <Fragment>
                          <View>
                            <Text>
                              No data to display, click on new money
                            </Text>
                          </View>
                        </Fragment> : 
                          <DataWithPagination
                            data={data}
                            onDeleted={(deletedId) => {
                              setData((currentData) => currentData.filter((money) => money.id !== deletedId));
                            }}
                            doneFilter={filterDone}
                            onDone={(doneId) => {
                              setData((currentData) => currentData.map((money) => money.id === doneId ? { ...money, isDone: true } : money));
                            }}
                          />
                        }
          </Fragment> 
          }
        </View>
      </View>
    </ScrollView>
  );
}
