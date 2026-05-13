import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { apiUrl } from "../config/api";

export default function DocentesScreen({ navigation }) {

  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerDocentes = async () => {
    try {
      const url = apiUrl("docentes.php");

      const response = await fetch(url);
      const data = await response.json();

      setDocentes(data);

    } catch (error) {
      console.log("ERROR API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDocentes();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <Text style={styles.loadingText}>Cargando docentes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔵 HEADER */}
      <View style={styles.header}>

        {/* 🔙 BOTÓN ARRIBA */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Docentes</Text>
      </View>

      {/* 🔵 LISTA */}
      <FlatList
        data={docentes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay docentes</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.name}>{item.nombre}</Text>

            <Text style={styles.text}>{item.correo}</Text>

            <Text style={styles.text}>
              Estado: {item.estado}
            </Text>

            <Text style={styles.text}>
              Fecha: {item.fecha}
            </Text>

            <Text style={styles.text}>
              Hora: {item.hora}
            </Text>

          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#eef4ff",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#1e3a8a",
  },

  header: {
    backgroundColor: "#1e3a8a",
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#1e3a8a",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  text: {
    fontSize: 13,
    color: "#374151",
    marginTop: 3,
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#64748b",
  },
});