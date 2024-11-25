import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

const MostrarPlanetas = () => {
  const [planetas, setPlanetas] = useState([]);
  const router = useRouter(); //importante para que funcione el router y se pueda navegar

  const screenWidth = Dimensions.get("window").width;

  //funcion para traer los planetas
  const fetchPlanetas = async () => {
    try {
      //cambiar si cambias de internet
      const response = await fetch("http://172.20.10.2:8000/planets");
      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      const data = await response.json();
      setPlanetas(data.results || data);
    } catch (error) {
      console.error(error);
    }
  };

  //se agrecga al useEffect para que se ejecute la funcion fetchPlanetas
  useEffect(() => {
    fetchPlanetas();
  }, []);

  //funcion para eliminar un planeta
  const DeletePlanet = async (id) => {
    try {
      //cambiar si cambias de internet
      const response = await fetch(`http://172.20.10.2:8000/planets/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      const data = await response.json();
      console.log("Planeta eliminado:", data);

      setPlanetas((prevPlanetas) => prevPlanetas.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar el planeta:", error);
    }
  };

  //importante importarlo
  //Esto es para que cuando se vuelva a la pantalla se actualice, es decir no tenes que recargar para que te aparescan las cosas.
  useFocusEffect(
    useCallback(() => {
      //cambiar si cambias de internet
      fetch("http://172.20.10.2:8000/planets")
        .then((response) => response.json())
        .then((data) => setPlanetas(data.results || data))
        .catch((error) => console.error(error));
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <FlatList
          data={planetas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.planetCard}>
              <TouchableOpacity
                style={styles.planetButton}
                onPress={() =>
                  router.navigate({
                    //cambiar la direccion
                    pathname: "/(tabs)/planets/detallesPlaneta",
                    params: item,
                  })
                }
              >
                {/* para mostrar la imagen del planeta */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.planetImage}
                />
                {/* muestra el nombre del planeta fijarse como esta en el backend los nombres de las propiedades */}
                <Text style={styles.planetText}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.navigate({
                      //cambiar la direccion
                      pathname: "/(tabs)/planets/editarPlaneta",
                      params: item,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => DeletePlanet(item.id)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    alignSelf: "center",
    padding: 20,
  },
  planetCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  planetButton: {
    alignItems: "center",
    marginBottom: 10,
  },
  planetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  planetText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#FF0000", // Fondo rojo
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MostrarPlanetas;
