import { DataWithPagination } from "@/component/DataWithPagination";
import { MoneyModel } from "@/model/Money";
import { UserPayload } from "@/store/store";
import type { IMoney } from "@/types/Money";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { Fragment, useEffect, useState, useTransition } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from "react-redux";


export default function Index() {
  const db = useSQLiteContext();
  const user = useSelector((state: UserPayload) => state.user.value);
  const [loading, startTranstion] = useTransition();
  const route = useRouter()
  const [data, setData] = useState<IMoney[]>([]);
  const [filterDone, setFilterDone] = useState<boolean>(false);

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
        <Button title="+ New Money" onPress={() => route.push("/newmoney")} color={"black"} />
          <Text style={{padding: 10}}>{user.id} / {user.username}</Text>
        <Text>You see your refunds below</Text>
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
