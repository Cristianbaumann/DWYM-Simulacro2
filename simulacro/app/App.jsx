import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MostrarPlanetas from "./(tabs)/mostrarPlanetas";
import DetallesPlaneta from "./DetallesPlaneta";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MostrarPlanetas">
        <Stack.Screen
          name="MostrarPlanetas"
          component={MostrarPlanetas}
          options={{ title: "Lista de Planetas" }}
        />
        <Stack.Screen
          name="DetallesPlaneta"
          component={DetallesPlaneta}
          options={{ title: "Detalles del Planeta" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
