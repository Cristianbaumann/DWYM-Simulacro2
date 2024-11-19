import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const MostrarPlanetas = () => {
  const [planetas, setPlanetas] = useState([]);

  useEffect(() => {
    const fetchPlanetas = async () => {
      try {
        const response = await fetch("http://10.4.100.147:8000/planets");
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const data = await response.json();
        setPlanetas(data.results || data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlanetas();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={planetas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.planetButton}
            onPress={() =>
              navigation.navigate("DetallesPlaneta", { planetaId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.planetImage} />
            <Text style={styles.planetText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  planetButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  planetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  planetText: {
    fontSize: 18,
  },
});

export default MostrarPlanetas;
