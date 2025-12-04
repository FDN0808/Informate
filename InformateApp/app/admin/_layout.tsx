import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Admin Dashboard" }} />
      <Stack.Screen name="create" options={{ title: "Tambah Event" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Event" }} />
    </Stack>
  );
}
