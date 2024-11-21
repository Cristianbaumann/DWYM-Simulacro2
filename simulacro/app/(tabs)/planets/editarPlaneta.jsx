import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function editar() {
  const params = useLocalSearchParams(); // Obtener los parámetros desde la URL
  const { id, name, description, moons, moon_names, image } = params;
  const router = useRouter();

  const [newName, setNewName] = useState(name || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newMoons, setNewMoons] = useState(moons || 0);
  const [newMoonNames, setNewMoonNames] = useState(moon_names || []);
  const [newImage, setNewImage] = useState(image || "");

  const EditPlanet = async (planetId) => {
    try {
      const response = await fetch(
        `http://172.20.10.2:8000/planets/${planetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            description: newDescription,
            moons: parseInt(newMoons, 10),
            moon_names: newMoonNames,
            image: newImage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log("Planeta editado:", data);
      Alert.alert("Éxito", "El planeta ha sido editado exitosamente.");
      router.push("/(tabs)/planets"); // Navegar de regreso a la lista de planetas
    } catch (error) {
      console.error("Error al editar el planeta:", error);
      Alert.alert("Error", "No se pudo editar el planeta. Intenta nuevamente.");
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Editar Planeta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Descripción"
        value={newDescription}
        onChangeText={setNewDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevas Lunas"
        value={newMoons.toString()}
        onChangeText={setNewMoons}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de una luna"
        value={newMoonNames}
        onChangeText={setNewMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva URL de la imagen"
        value={newImage}
        onChangeText={setNewImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => EditPlanet(id)}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push("/(tabs)/planets")}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
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
