import { DataWithPagination } from "@/component/DataWithPagination";
import type { IMoney } from "@/types/Money";
import { useRouter } from "expo-router";
import React from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function Index() {
  const route = useRouter()
  const data: IMoney[] = [
    {
    amount: 230,
    fromPerson: "ahmed"
  },{
    amount: 230,
    fromPerson: "ahmed"
  },{
    amount: 230,
    fromPerson: "ahmed"
  },{
    amount: 230,
    fromPerson: "ahmed"
  },{
    amount: 230,
    fromPerson: "ahmed"
  },{
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ahmed"
  },
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
  
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
  {
    amount: 9000230,
    fromPerson: "ashref"
  },
];
  return (
    <ScrollView>
      <View>
        <Button title="+ New Money" onPress={() => route.push("/newmoney")} color={"black"} />
        <Text>You see your refunds below</Text>
        <View style={{
          margin: 20
        }}>
        <DataWithPagination data={data} />
        </View>
      </View>
    </ScrollView>
  );
}
