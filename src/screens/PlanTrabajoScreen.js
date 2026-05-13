// PlanTrabajoScreen.js

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

import { Ionicons } from "@expo/vector-icons";

import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function PlanTrabajoScreen({ navigation }) {

  const [docente, setDocente] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [evento, setEvento] = useState("");
  const [lugar, setLugar] = useState("");
  const [fechaEvento, setFechaEvento] = useState("");

  const [rol, setRol] = useState("");
  const [comision, setComision] = useState("");

  const [actividad1, setActividad1] = useState("");
  const [actividad2, setActividad2] = useState("");
  const [actividad3, setActividad3] = useState("");

  const [registro, setRegistro] = useState(false);
  const [logistica, setLogistica] = useState(false);
  const [material, setMaterial] = useState(false);
  const [evidencia, setEvidencia] = useState(false);

  const [observaciones, setObservaciones] = useState("");

  const generarPDF = async () => {
    try {

      const html = `
      <html>
      <body style="font-family: Arial; padding: 30px; color:#0F172A;">

      <h1>PLAN DE TRABAJO</h1>

      <h2>Información General</h2>
      <p><strong>Docente:</strong> ${docente}</p>
      <p><strong>Periodo:</strong> ${periodo}</p>
      <p><strong>Departamento:</strong> ${departamento}</p>

      <h2>Evento</h2>
      <p><strong>Evento:</strong> ${evento}</p>
      <p><strong>Lugar:</strong> ${lugar}</p>
      <p><strong>Fecha:</strong> ${fechaEvento}</p>

      <h2>Comisión</h2>
      <p><strong>Rol:</strong> ${rol}</p>
      <p><strong>Comisión:</strong> ${comision}</p>

      <h2>Actividades</h2>
      <ul>
        <li>${actividad1}</li>
        <li>${actividad2}</li>
        <li>${actividad3}</li>
      </ul>

      <h2>Checklist Operativo</h2>
      <p>${registro ? "☑" : "☐"} Registro realizado</p>
      <p>${logistica ? "☑" : "☐"} Logística completada</p>
      <p>${material ? "☑" : "☐"} Material preparado</p>
      <p>${evidencia ? "☑" : "☐"} Evidencias recopiladas</p>

      <h2>Observaciones</h2>
      <p>${observaciones}</p>

      </body>
      </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      const fileName = `PlanTrabajo_${Date.now()}.pdf`;
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      Alert.alert("PDF Guardado", "Documento generado correctamente");

      await Sharing.shareAsync(newPath);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo generar el PDF");
    }
  };

  const TaskItem = ({ title, value, onPress }) => (
    <TouchableOpacity style={styles.taskCard} onPress={onPress}>
      <View style={[styles.circle, value && styles.circleActive]}>
        {value && <Ionicons name="checkmark" size={18} color="white" />}
      </View>
      <Text style={styles.taskText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.topBanner}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <Text style={styles.bannerTitle}>Plan de Trabajo</Text>
          <Text style={styles.bannerSubtitle}>Gestión Institucional</Text>
        </View>

        {/* QUICK CARDS */}
        <View style={styles.quickContainer}>
          <View style={styles.quickCard}>
            <Ionicons name="calendar" size={30} color="#2563EB" />
            <Text style={styles.quickText}>Eventos</Text>
          </View>

          <View style={styles.quickCard}>
            <Ionicons name="people" size={30} color="#059669" />
            <Text style={styles.quickText}>Staff</Text>
          </View>

          <View style={styles.quickCard}>
            <Ionicons name="checkmark-done" size={30} color="#EA580C" />
            <Text style={styles.quickText}>Checklist</Text>
          </View>
        </View>

        {/* FORMULARIO */}
        <View style={styles.sectionCard}>
          <TextInput placeholder="Nombre del docente" value={docente} onChangeText={setDocente} style={styles.input} />
          <TextInput placeholder="Periodo" value={periodo} onChangeText={setPeriodo} style={styles.input} />
          <TextInput placeholder="Departamento" value={departamento} onChangeText={setDepartamento} style={styles.input} />
        </View>

        <View style={styles.sectionCard}>
          <TextInput placeholder="Evento" value={evento} onChangeText={setEvento} style={styles.input} />
          <TextInput placeholder="Lugar" value={lugar} onChangeText={setLugar} style={styles.input} />
          <TextInput placeholder="Fecha" value={fechaEvento} onChangeText={setFechaEvento} style={styles.input} />
        </View>

        <View style={styles.sectionCard}>
          <TextInput placeholder="Rol" value={rol} onChangeText={setRol} style={styles.input} />
          <TextInput placeholder="Comisión" value={comision} onChangeText={setComision} style={styles.input} />
        </View>

        <View style={styles.sectionCard}>
          <TextInput placeholder="Actividad 1" value={actividad1} onChangeText={setActividad1} style={styles.input} />
          <TextInput placeholder="Actividad 2" value={actividad2} onChangeText={setActividad2} style={styles.input} />
          <TextInput placeholder="Actividad 3" value={actividad3} onChangeText={setActividad3} style={styles.input} />
        </View>

        <View style={styles.sectionCard}>
          <TaskItem title="Registro realizado" value={registro} onPress={() => setRegistro(!registro)} />
          <TaskItem title="Logística completada" value={logistica} onPress={() => setLogistica(!logistica)} />
          <TaskItem title="Material preparado" value={material} onPress={() => setMaterial(!material)} />
          <TaskItem title="Evidencias recopiladas" value={evidencia} onPress={() => setEvidencia(!evidencia)} />
        </View>

        <View style={styles.sectionCard}>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Observaciones..."
            value={observaciones}
            onChangeText={setObservaciones}
          />
        </View>

        <View style={{ height: 120 }} />

      </ScrollView>

      {/* FAB PDF */}
      <TouchableOpacity style={styles.fab} onPress={generarPDF}>
        <Ionicons name="document-text" size={30} color="white" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#E2E8F0" },

  topBanner: {
    backgroundColor: "#0F172A",
    padding: 30,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    width: 45,
    height: 45,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  bannerTitle: { color: "white", fontSize: 32, fontWeight: "bold" },
  bannerSubtitle: { color: "#CBD5E1", marginTop: 6 },

  quickContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
  },

  quickCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "30%",
  },

  sectionCard: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 20,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  textArea: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 16,
    padding: 14,
    minHeight: 120,
  },

  taskCard: {
    flexDirection: "row",
    padding: 12,
  },

  circle: {
    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 10,
  },

  circleActive: {
    backgroundColor: "#2563EB",
  },

  taskText: { fontSize: 14 },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2563EB",
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
  },
});