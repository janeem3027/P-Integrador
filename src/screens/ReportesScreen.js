import React, { useEffect, useState } from "react";

import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ReportesScreen({ navigation }) {

  const [reportes, setReportes] = useState([]);

  // OBTENER REPORTES DESDE BD
  const obtenerReportes = async () => {

    try {

      const response = await fetch(
        "http://10.10.1.52/academia/api/reportes.php"
      );

      const data = await response.json();

      setReportes(data);

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudieron cargar los reportes"
      );
    }
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

  // ABRIR DOCUMENTO
  const abrirDocumento = (url) => {

    if (!url) {
      Alert.alert("Error", "Documento no disponible");
      return;
    }

    Linking.openURL(url);
  };

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Reportes Académicos
        </Text>

        <Text style={styles.subtitle}>
          Documentos generados del sistema
        </Text>

      </View>

      {/* BOTÓN REGRESO */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          navigation.navigate("Home")
        }
      >

        <Text style={styles.backText}>
          ← Inicio
        </Text>

      </TouchableOpacity>

      {/* LISTA */}
      <ScrollView style={styles.list}>

        {reportes.length === 0 ? (

          <Text style={styles.empty}>
            No hay reportes disponibles
          </Text>

        ) : (

          reportes.map((item) => (

            <View
              key={item.id}
              style={styles.card}
            >

              <Text style={styles.docTitle}>
                📄 {item.titulo}
              </Text>

              <Text style={styles.info}>
                Fecha: {item.fecha}
              </Text>

              <Text style={styles.info}>
                Tipo: {item.tipo}
              </Text>

              <Text
                style={
                  item.estado === "nuevo"
                    ? styles.new
                    : styles.viewed
                }
              >
                Estado: {item.estado}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  abrirDocumento(item.url)
                }
              >

                <Text style={styles.buttonText}>
                  Abrir documento
                </Text>

              </TouchableOpacity>

            </View>

          ))

        )}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    backgroundColor: "#1E3A8A",
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#DBEAFE",
    marginTop: 5,
  },

  backButton: {
    padding: 15,
  },

  backText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 16,
  },

  list: {
    padding: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  docTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },

  info: {
    color: "#475569",
    marginBottom: 5,
  },

  new: {
    color: "#DC2626",
    fontWeight: "bold",
    marginTop: 5,
  },

  viewed: {
    color: "#16A34A",
    fontWeight: "bold",
    marginTop: 5,
  },

  button: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#64748B",
  },

});