import { Stack } from "expo-router";

//esto es para tener los stack de una screen a otra
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="detallesPlaneta" options={{ headerShown: false }} />
      <Stack.Screen name="editarPlaneta" options={{ headerShown: false }} />
    </Stack>
  );
}
