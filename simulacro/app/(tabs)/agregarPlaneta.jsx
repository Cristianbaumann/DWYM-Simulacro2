import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";

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
    if (!nombre || !descripcion || !lunas || !imagen) {
      Alert.alert(
        "Error",
        "Por favor, completa todos los campos obligatorios (nombre, descripción, cantidad de lunas e imagen)."
      );
      return;
    }

    try {
      const response = await fetch("http://10.4.100.147:8000/planets", {
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
      <Button title="Agregar Luna" onPress={agregarLuna} />
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
      <Button title="Agregar Planeta" onPress={handleAgregarPlaneta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  moonItem: {
    fontSize: 16,
    padding: 5,
    marginVertical: 2,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default AgregarPlaneta;
