import { UserPayload } from "@/store/store";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function RootLayout() {
    const user = useSelector((state: UserPayload) => state.user.value);
  return <Stack>
    <Stack.Protected guard={user.isAuthed} >
        <Stack.Screen name="detail" options={{ headerShown: false }} />
        <Stack.Screen name="money" options={{ headerShown: false }}/>
        <Stack.Screen name="newmoney" options={{ headerShown: false }}/>
        <Stack.Screen name="updateMoney" options={{ headerShown: false }} />
    </Stack.Protected>
  </Stack>;
}
