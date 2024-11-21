import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AgregarPlaneta = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [lunas, setLunas] = useState(""); // Cantidad de lunas
  const [nombresLunas, setNombresLunas] = useState([]); // Lista de nombres de lunas
  const [nombreLunaActual, setNombreLunaActual] = useState(""); // Input para una luna
  const [imagen, setImagen] = useState(""); // URL de la imagen

  const agregarLuna = () => {
    if (nombreLunaActual.trim() === "") {
      Alert.alert("Error", "El nombre de la luna no puede estar vacío.");
      return;
    }
    setNombresLunas((prev) => [...prev, nombreLunaActual]);
    setNombreLunaActual("");
  };

  const handleAgregarPlaneta = async () => {
    if (!nombre || !descripcion) {
      Alert.alert(
        "Error",
        "Por favor, completa todos los campos obligatorios (nombre, descripción)."
      );
      return;
    }

    try {
      const response = await fetch("http://172.20.10.2:8000/planets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          moons: parseInt(lunas, 10),
          moon_names: nombresLunas,
          image: imagen,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }

      const data = await response.json();
      console.log("Planeta agregado:", data);

      // Resetear los campos del formulario
      setNombre("");
      setDescripcion("");
      setLunas("");
      setNombresLunas([]);
      setImagen("");
      Alert.alert("Éxito", "El planeta ha sido agregado.");
    } catch (error) {
      console.error("Error al agregar el planeta:", error);
      Alert.alert(
        "Error",
        "No se pudo agregar el planeta. Intenta nuevamente."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Planeta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del planeta"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción del planeta"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad de lunas"
          value={lunas}
          onChangeText={setLunas}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre de una luna"
          value={nombreLunaActual}
          onChangeText={setNombreLunaActual}
        />
        <TouchableOpacity style={styles.addButton} onPress={agregarLuna}>
          <Text style={styles.buttonText}>Agregar Luna</Text>
        </TouchableOpacity>
        <FlatList
          data={nombresLunas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.moonItem}>{item}</Text>}
        />
        <TextInput
          style={styles.input}
          placeholder="URL de la imagen"
          value={imagen}
          onChangeText={setImagen}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAgregarPlaneta}
        >
          <Text style={styles.buttonText}>Agregar Planeta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  moonItem: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e6f7ff",
    borderRadius: 5,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AgregarPlaneta;
