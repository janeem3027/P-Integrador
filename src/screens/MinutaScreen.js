import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function MinutaScreen({ navigation }) {
  const [tema, setTema] = useState("");
  const [ordenDia, setOrdenDia] = useState("");
  const [acuerdos, setAcuerdos] = useState("");
  const [avisos, setAvisos] = useState("");
  const [archivo, setArchivo] = useState(null);

  // 📂 Seleccionar PDF
  const seleccionarArchivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (resultado.canceled === false) {
        setArchivo(resultado.assets[0]);

        Alert.alert("Archivo seleccionado", resultado.assets[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 📄 GENERAR PDF
  const generarPDF = async () => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { text-align: center; color: #1E3A8A; }
            h3 { color: #2563EB; margin-top: 20px; }
            p { font-size: 14px; }
          </style>
        </head>

        <body>
          <h1>Minuta de Academia</h1>

          <h3>Tema principal</h3>
          <p>${tema || "-"}</p>

          <h3>Orden del día</h3>
          <p>${ordenDia || "-"}</p>

          <h3>Acuerdos</h3>
          <p>${acuerdos || "-"}</p>

          <h3>Avisos</h3>
          <p>${avisos || "-"}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo generar el PDF");
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* 🔙 BOTÓN REGRESO */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backText}>← Inicio</Text>
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minuta de Academia</Text>
        <Text style={styles.headerSubtitle}>
          División de Ingeniería en Sistemas Computacionales
        </Text>
      </View>

      {/* DATOS GENERALES */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Datos de la sesión</Text>

        <TextInput style={styles.input} placeholder="Número de sesión" />
        <TextInput style={styles.input} placeholder="Fecha" />
        <TextInput style={styles.input} placeholder="Hora" />
        <TextInput style={styles.input} placeholder="Lugar" />

        <TextInput
          style={styles.input}
          placeholder="Tema principal"
          value={tema}
          onChangeText={setTema}
        />
      </View>

      {/* ORDEN DEL DÍA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Orden del día</Text>

        <TextInput
          style={styles.textArea}
          placeholder="Agregar puntos..."
          multiline
          value={ordenDia}
          onChangeText={setOrdenDia}
        />
      </View>

      {/* ACUERDOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Acuerdos</Text>

        <TextInput
          style={styles.textArea}
          placeholder="Registrar acuerdos..."
          multiline
          value={acuerdos}
          onChangeText={setAcuerdos}
        />
      </View>

      {/* AVISOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Avisos</Text>

        <TextInput
          style={styles.textArea}
          placeholder="Escribir avisos..."
          multiline
          value={avisos}
          onChangeText={setAvisos}
        />
      </View>

      {/* ARCHIVOS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Archivos</Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={seleccionarArchivo}
        >
          <Text style={styles.uploadText}>
            Subir archivo PDF
          </Text>
        </TouchableOpacity>

        {archivo && (
          <View style={styles.fileItem}>
            <Text style={styles.fileName}>{archivo.name}</Text>
          </View>
        )}
      </View>

      {/* BOTÓN PDF */}
      <TouchableOpacity style={styles.saveButton} onPress={generarPDF}>
        <Text style={styles.saveText}>Generar PDF</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5F9" },

  backButton: {
    padding: 15,
  },

  backText: {
    color: "#1E3A8A",
    fontWeight: "bold",
    fontSize: 16,
  },

  header: {
    backgroundColor: "#1E3A8A",
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#CBD5E1",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  textArea: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
    height: 100,
    textAlignVertical: "top",
  },

  uploadButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },

  fileItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
  },

  fileName: {
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#1E3A8A",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});