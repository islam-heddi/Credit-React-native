import type { IMoney } from "@/types/Money";
import { numberOfPage, pagination } from "@/utils/pagination";
import { Check, SquarePen, Trash2 } from "lucide-react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
export function DataWithPagination({data}: {
    data: IMoney[]
}) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [mdata, setMdata] = useState<IMoney[]>([])
    useEffect(() => {
      if(currentPage >= 1 && currentPage <= parseInt(numberOfPage(data).toString())){
        setMdata(pagination(currentPage, data))
      }
    },[currentPage])
    return <>
        {mdata.map((value, index) => <Fragment key={index}>
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
                <Text>{value.fromPerson}</Text>
                <Text>in {value.createDate}</Text>
              </View>
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