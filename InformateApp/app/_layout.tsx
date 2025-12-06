import { ThemeProvider, useThemeMode } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationLayout />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

function NavigationLayout() {
  const { theme } = useThemeMode();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="admin/index" />
        <Stack.Screen name="admin/create" />
        <Stack.Screen name="admin/edit" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>

      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
  );
}
