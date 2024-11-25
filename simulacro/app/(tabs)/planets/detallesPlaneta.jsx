import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

const DetallesPlaneta = () => {
  const params = useLocalSearchParams(); // Obtener los parámetros desde la URL, esto muy importante para que se muestre todo
  const { name, description, moons, moon_names, image } = params; //esto tambien como lo de arriba, poner los nombres como backend
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Detalles del Planeta</Text>
        {/* esto es para mostrar la imagen del planeta */}
        {image && <Image source={{ uri: image }} style={styles.planetImage} />}
        <Text style={styles.detailText}>
          {/* nombre del planeta */}
          <Text style={styles.label}>Nombre: </Text>
          {name}
        </Text>
        <Text style={styles.detailText}>
          {/* descripcion del planeta */}
          <Text style={styles.label}>Descripción: </Text>
          {description}
        </Text>
        <Text style={styles.detailText}>
          {/* cantidad de lunas */}
          <Text style={styles.label}>Cantidad de Lunas: </Text>
          {moons}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Nombres de las Lunas: </Text>
          {moon_names ? moon_names.split(",").join(", ") : "Ninguna"}
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push("/(tabs)/planets")}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  planetImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  detailText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  cancelButton: {
    width: "80%",
    backgroundColor: "#FF0000",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetallesPlaneta;
