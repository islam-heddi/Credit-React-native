import { Check, SquarePen, Trash2 } from "lucide-react-native";
import React, { Fragment } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface IMoney {
  id?: number;
  amount: number;
  fromPerson: string; // name of that person
}

export default function Index() {
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
        <Text>You see your refunds below</Text>
        <View style={{
          margin: 20
        }}>
        {data.map((value, index) => <Fragment key={index}>
          <View style={{flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              margin: 3
          }}>
            <View style={{
              flex:1,
              justifyContent: "space-between",
              flexDirection: "row",
              margin: 6
            }}>
              <Text>{value.fromPerson}</Text>
              <Text>{value.amount} DZ</Text>
            </View>
            <View style={{
              flex: 0,
              flexDirection: "row",
              gap: 3
            }}>
              
              <Pressable style={{
                backgroundColor: "#b2ff89",
                padding: 4,
              }}>
                <Text style={{color: "white"}}><Check /></Text>
              </Pressable>
              <Pressable style={{
                backgroundColor: "#89c8ff",
                padding: 4,
              }}>
                <Text style={{color: "white"}}><SquarePen /></Text>
              </Pressable>
              <Pressable style={{
                backgroundColor: "#ff0202",
                padding: 4,
              }}>
                <Text style={{color: "white"}}><Trash2 /></Text>
              </Pressable>
              
            </View>
          </View>
        </Fragment>)}
        </View>
      </View>
    </ScrollView>
  );
}
