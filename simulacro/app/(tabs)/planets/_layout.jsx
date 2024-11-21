import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="detallesPlaneta" options={{ headerShown: false }} />
      <Stack.Screen name="editarPlaneta" options={{ headerShown: false }} />
    </Stack>
  );
}
