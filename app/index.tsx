import { UserPayload } from "@/store/store";
import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state: UserPayload)=> state.user.value);
  const route = useRouter();
  
  useEffect(() => {
    if(user.isAuthed){
      route.push("/private/money");
    }
  },[user])

  return (
    <ScrollView 
      style={{ 
        flex: 1,
        backgroundColor: '#ffffff',
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ 
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
      }}>
        {/* Header Section */}
        <View style={{ gap: 12, marginBottom: 20 }}>
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            gap: 8,
            justifyContent: "center"
          }}>
            <TrendingUp size={32} color="#6366f1" strokeWidth={2.5} />
            <Text style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#1f2937",
              letterSpacing: -0.5,
            }}>
              Credit
            </Text>
          </View>
          <Text style={{
            fontSize: 14,
            color: "#9ca3af",
            textAlign: "center",
            fontWeight: "500",
            letterSpacing: 0.3,
          }}>
            Smart Financial Management
          </Text>
        </View>

        {/* Hero Image Section */}
        <View style={{ 
          alignItems: "center",
          marginVertical: 30,
          borderRadius: 24,
          overflow: "hidden",
          backgroundColor: "#f3f4f6",
          padding: 30,
        }}>
          <Image 
            source={require("../assets/images/coin.png")} 
            style={{
              width: 240,
              height: 240,
              resizeMode: "contain"
            }} 
          />
        </View>

        {/* Content Section */}
        <View style={{ gap: 16, marginBottom: 40 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#1f2937",
            lineHeight: 32,
          }}>
            Track Your Credits with Ease
          </Text>
          
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#6366f1",
                marginTop: 8,
              }} />
              <Text style={{
                fontSize: 15,
                color: "#4b5563",
                lineHeight: 22,
                flex: 1,
                fontWeight: "500",
              }}>
                Monitor all the money you've lent out
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#6366f1",
                marginTop: 8,
              }} />
              <Text style={{
                fontSize: 15,
                color: "#4b5563",
                lineHeight: 22,
                flex: 1,
                fontWeight: "500",
              }}>
                Never lose track of who owes you what
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#6366f1",
                marginTop: 8,
              }} />
              <Text style={{
                fontSize: 15,
                color: "#4b5563",
                lineHeight: 22,
                flex: 1,
                fontWeight: "500",
              }}>
                Get insights into your lending patterns
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12 }}>
          <TouchableOpacity 
            onPress={() => route.push("/login")}
            style={{
              backgroundColor: "#6366f1",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              elevation: 3,
              shadowColor: "#6366f1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: 0.3,
            }}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => route.push("/about")}
            style={{
              borderWidth: 2,
              borderColor: "#e5e7eb",
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#6366f1",
              letterSpacing: 0.3,
            }}>
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
