import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return <SQLiteProvider databaseName="money.db"><Stack /></SQLiteProvider>;
}
