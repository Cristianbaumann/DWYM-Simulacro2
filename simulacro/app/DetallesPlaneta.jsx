import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const DetallesPlaneta = ({ route }) => {
  const { planetaId } = route.params;
  const [planeta, setPlaneta] = useState(null);

  useEffect(() => {
    const fetchPlaneta = async () => {
      try {
        const response = await fetch(
          `http://10.4.100.147:8000/planets/${planetaId}`
        );
        const data = await response.json();
        setPlaneta(data);
      } catch (error) {
        console.error("Error al cargar los detalles del planeta:", error);
      }
    };

    fetchPlaneta();
  }, [planetaId]);

  if (!planeta) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles del planeta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: planeta.image }} style={styles.planetImage} />
      <Text style={styles.title}>{planeta.name}</Text>
      <Text style={styles.description}>{planeta.description}</Text>
      <Text style={styles.subtitle}>Cantidad de lunas: {planeta.moons}</Text>
      {planeta.moon_names?.length > 0 ? (
        <>
          <Text style={styles.subtitle}>Nombres de las lunas:</Text>
          <FlatList
            data={planeta.moon_names}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.moonText}>{item}</Text>
            )}
          />
        </>
      ) : (
        <Text style={styles.noMoons}>
          Este planeta no tiene lunas conocidas.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  planetImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moonText: {
    fontSize: 16,
    marginVertical: 5,
  },
  noMoons: {
    fontSize: 16,
    color: "gray",
    fontStyle: "italic",
  },
});

export default DetallesPlaneta;
