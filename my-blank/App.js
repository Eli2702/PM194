import React, { useEffect, useState } from "react";
import {  SafeAreaView,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [frutas, setFrutas] = useState([]);
  const [verduras, setVerduras] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://10.16.33.132:8000/productos/"; // Cambia esto según tu API

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setFrutas(data.frutas);
        setVerduras(data.verduras);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // Render item para FlatList y SectionList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nombre}>{item.nombre}</Text>
    </View>
  );

  // Para SectionList, definimos las secciones
  const sections = [
    { title: "Frutas", data: frutas },
    { title: "Verduras", data: verduras },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Frutas (FlatList)</Text>
      <FlatList
        data={frutas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Text style={styles.title}>Frutas y Verduras (SectionList)</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
  },
  nombre: {
    fontSize: 18,
  },
});