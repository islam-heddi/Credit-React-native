import { persistor, store } from "@/store/store";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return <SQLiteProvider databaseName="money.db">
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
        <Stack />
      </PersistGate>
    </Provider>
  </SQLiteProvider>;
}
