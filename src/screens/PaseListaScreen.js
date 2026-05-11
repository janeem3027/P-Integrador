// PaseListaScreen.js

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import QRCode from "react-native-qrcode-svg";

import { AuthContext } from "../context/AuthContext";

export default function PaseListaScreen({
  navigation,
}) {

  const { user } =
    useContext(AuthContext);

  const [qrValue, setQrValue] =
    useState("");

  // 🔵 GENERAR QR DEL DOCENTE
  useEffect(() => {

    const datosQR = {
      id: user?.id,
      nombre: user?.nombre,
      rol: user?.rol,
    };

    setQrValue(
      JSON.stringify(datosQR)
    );

  }, []);

  return (

    <View style={styles.container}>

      {/* 🔵 HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Pase de Lista
        </Text>

        <Text style={styles.subtitle}>
          Muestra este QR al presidente
        </Text>

      </View>

      {/* 🔵 TARJETA */}
      <View style={styles.card}>

        <Text style={styles.name}>
          {user?.nombre}
        </Text>

        <Text style={styles.role}>
          {user?.rol}
        </Text>

        {/* 🔵 QR */}
        <View style={styles.qrContainer}>

          {qrValue !== "" && (

            <QRCode
              value={qrValue}
              size={220}
            />

          )}

        </View>

        <Text style={styles.info}>
          El presidente, secretario o
          jefe de carrera deberá
          escanear este código para
          registrar tu asistencia.
        </Text>

      </View>

      {/* 🔵 BOTÓN HISTORIAL */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "MisAsistencias"
          )
        }
      >

        <Text style={styles.buttonText}>
          Ver mis asistencias
        </Text>

      </TouchableOpacity>

      {/* 🔵 BOTÓN REGRESO */}
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

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
  },

  header: {
    width: "100%",
    backgroundColor: "#1E3A8A",
    paddingTop: 60,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#DBEAFE",
    marginTop: 8,
    fontSize: 15,
  },

  card: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
  },

  role: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 20,
  },

  qrContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  info: {
    textAlign: "center",
    color: "#475569",
    lineHeight: 24,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    marginTop: 30,
    width: "90%",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  backButton: {
    marginTop: 20,
  },

  backText: {
    color: "#1E3A8A",
    fontSize: 16,
    fontWeight: "bold",
  },

});