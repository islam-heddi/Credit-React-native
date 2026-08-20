import { persistor, store } from "@/store/store";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return <SQLiteProvider databaseName="money.db">
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index"  options={{ headerShown: false }} />
          <Stack.Screen name="login"  options={{ headerShown: false }}/>
          <Stack.Screen name="about"  />
          <Stack.Screen name="register" options={{ headerShown: false }}/>
          <Stack.Screen name="private" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  </SQLiteProvider>;
}
