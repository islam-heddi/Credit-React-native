import { store } from "@/store/store";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-redux";

export default function RootLayout() {
  return <SQLiteProvider databaseName="money.db">
    <Provider store={store}>
      <Stack />
    </Provider>
  </SQLiteProvider>;
}
