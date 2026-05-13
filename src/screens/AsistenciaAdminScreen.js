// AsistenciaAdminScreen.js

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { AuthContext } from "../context/AuthContext";

// 🔵 API
import { apiUrl } from "../config/api";

export default function AsistenciaAdminScreen({
  navigation,
}) {

  const { user } =
    useContext(AuthContext);

  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] =
    useState(false);

  // 🔵 PEDIR PERMISOS
  useEffect(() => {

    if (!permission) {
      requestPermission();
    }

  }, []);

  // 🔵 SOLO PRESIDENTE / SECRETARIO / JEFE
  if (
    user?.rol !== "presidente" &&
    user?.rol !== "secretario" &&
    user?.rol !== "jefe"
  ) {

    return (

      <View style={styles.deniedContainer}>

        <Text style={styles.deniedText}>
          No tienes permiso para acceder
          al escáner.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate("Home")
          }
        >

          <Text style={styles.backText}>
            ← Regresar
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  // 🔵 ESCANEAR QR
  const handleBarcodeScanned = async ({
    data,
  }) => {

    if (scanned) return;

    setScanned(true);

    try {

      // 🔵 LEER DATOS QR
      const docente =
        JSON.parse(data);

      // 🔵 HORA ACTUAL
      const horaActual =
        new Date();

      const hora =
        horaActual.toLocaleTimeString(
          "es-MX",
          {
            hour12: false,
          }
        );

      // 🔵 ESTADO
      let estado =
        "Presente";

      const limite =
        new Date();

      limite.setHours(10);
      limite.setMinutes(15);
      limite.setSeconds(0);

      if (horaActual > limite) {

        estado = "Retardo";
      }

      // 🔵 API
      const response = await fetch(
        apiUrl("guardar_asistencia.php"),
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            usuario_id:
              docente.id,

            estado,

            hora,

          }),
        }
      );

      const result =
        await response.json();

      console.log(result);

      // 🔵 ÉXITO
      if (result.success) {

        Alert.alert(
          "Asistencia registrada",
          `${docente.nombre} - ${estado}`
        );

      }

      // 🔴 ERROR API
      else {

        Alert.alert(
          "Error",
          result.message
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "QR inválido o error del servidor"
      );
    }
  };

  // 🔵 SIN PERMISOS
  if (!permission?.granted) {

    return (

      <View style={styles.container}>

        <Text style={styles.permissionText}>
          Se necesita permiso para usar
          la cámara.
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >

          <Text style={styles.buttonText}>
            Dar permiso
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      {/* 🔵 HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Escanear Asistencia
        </Text>

        <Text style={styles.subtitle}>
          Escanea el QR del docente
        </Text>

      </View>

      {/* 🔵 CÁMARA */}
      <View style={styles.cameraContainer}>

        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={
            scanned
              ? undefined
              : handleBarcodeScanned
          }
        />

      </View>

      {/* 🔵 ESCANEAR OTRA VEZ */}
      {scanned && (

        <TouchableOpacity
          style={styles.scanAgainButton}
          onPress={() =>
            setScanned(false)
          }
        >

          <Text style={styles.buttonText}>
            Escanear otro QR
          </Text>

        </TouchableOpacity>
      )}

      {/* 🔵 BOTÓN HOME */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() =>
          navigation.navigate("Home")
        }
      >

        <Text style={styles.homeText}>
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
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#DBEAFE",
    marginTop: 8,
    fontSize: 15,
  },

  cameraContainer: {
    width: "90%",
    height: 450,
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 30,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  scanAgainButton: {
    backgroundColor: "#2563EB",
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    width: "90%",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  homeButton: {
    marginTop: 20,
  },

  homeText: {
    color: "#1E3A8A",
    fontWeight: "bold",
    fontSize: 16,
  },

  permissionText: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "#1E293B",
  },

  permissionButton: {
    backgroundColor: "#1E3A8A",
    padding: 16,
    borderRadius: 15,
  },

  deniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#EEF2FF",
  },

  deniedText: {
    fontSize: 18,
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },

  backButton: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 15,
  },

  backText: {
    color: "#fff",
    fontWeight: "bold",
  },

});