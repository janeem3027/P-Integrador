import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CalendarioScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [sesiones, setSesiones] = useState([
    { id: 1, titulo: "Sesión 1", fecha: "01 May", estado: "completado" },
    { id: 2, titulo: "Sesión 2", fecha: "03 May", estado: "pendiente" },
  ]);

  // ➕ Agregar sesión
  const agregarSesion = () => {
    if (!titulo) return;

    const nueva = {
      id: sesiones.length + 1,
      titulo: titulo,
      fecha: "Nueva fecha",
      estado: "pendiente",
    };

    setSesiones([...sesiones, nueva]);
    setTitulo("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <ScrollView>

        {/* 🔙 BOTÓN REGRESO */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>← Inicio</Text>
        </TouchableOpacity>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Calendario</Text>
          <Text style={styles.subtitle}>Sesiones programadas</Text>
        </View>

        {/* LISTA */}
        <View style={styles.section}>
          {sesiones.map((item) => (
            <View key={item.id} style={styles.card}>
              <View>
                <Text style={styles.sessionTitle}>{item.titulo}</Text>
                <Text style={styles.date}>{item.fecha}</Text>
              </View>

              <Text
                style={
                  item.estado === "completado"
                    ? styles.done
                    : styles.pending
                }
              >
                {item.estado}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* ➕ BOTÓN FLOTANTE */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* MODAL REGISTRO */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Nueva sesión</Text>

            <TextInput
              placeholder="Título de la sesión"
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
            />

            <TouchableOpacity style={styles.btn} onPress={agregarSesion}>
              <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  backButton: {
    padding: 15,
  },

  backText: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "bold",
  },

  header: {
    padding: 20,
    backgroundColor: "#4A90E2",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 5,
  },

  section: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  sessionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  date: {
    fontSize: 13,
    color: "#777",
  },

  pending: {
    color: "#E67E22",
    fontWeight: "bold",
  },

  done: {
    color: "#27AE60",
    fontWeight: "bold",
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#4A90E2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  fabText: {
    color: "#fff",
    fontSize: 30,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modal: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  btn: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});