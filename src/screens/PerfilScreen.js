// PerfilScreen.js

import React, { useContext, useState } from "react";

import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import colors from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

export default function PerfilScreen() {

  // CONTEXTO USUARIO
  const { user, setUser } = useContext(AuthContext);

  // FOTO PERFIL
  const [foto, setFoto] = useState(
    "https://i.pravatar.cc/300"
  );

  // CAMBIAR FOTO
  const cambiarFoto = async () => {

    // PEDIR PERMISOS
    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    // SI NO ACEPTA
    if (!permiso.granted) {

      Alert.alert(
        "Permiso denegado",
        "Debes permitir acceso a tus fotos"
      );

      return;
    }

    // ABRIR GALERIA
    const resultado =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [1, 1],

        quality: 1,
      });

    // CAMBIAR FOTO
    if (!resultado.canceled) {

      setFoto(resultado.assets[0].uri);
    }
  };

  // CERRAR SESION
  const cerrarSesion = () => {

    Alert.alert(
      "Cerrar sesión",
      "¿Deseas cerrar sesión?",
      [

        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Cerrar sesión",

          onPress: () => {

            // ELIMINAR USUARIO
            setUser(null);

          },
        },
      ]
    );
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>

      {/* FOTO PERFIL */}
      <View style={styles.profileContainer}>

        <Image
          source={{ uri: foto }}
          style={styles.avatar}
        />

        {/* BOTON CAMBIAR FOTO */}
        <TouchableOpacity
          style={styles.changePhotoButton}
          onPress={cambiarFoto}
        >

          <Text style={styles.changePhotoText}>
            Cambiar foto
          </Text>

        </TouchableOpacity>

        {/* NOMBRE */}
        <Text style={styles.name}>

          {user?.nombre}{" "}
          {user?.apellido_p}{" "}
          {user?.apellido_m}

        </Text>

        {/* ROL */}
        <Text style={styles.role}>
          {user?.rol}
        </Text>

      </View>

      {/* INFORMACION */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Nombre
        </Text>

        <Text style={styles.value}>
          {user?.nombre || "No disponible"}
        </Text>

        <Text style={styles.label}>
          Apellido paterno
        </Text>

        <Text style={styles.value}>
          {user?.apellido_p || "No disponible"}
        </Text>

        <Text style={styles.label}>
          Apellido materno
        </Text>

        <Text style={styles.value}>
          {user?.apellido_m || "No disponible"}
        </Text>

        <Text style={styles.label}>
          Correo electrónico
        </Text>

        <Text style={styles.value}>
          {user?.correo || "No disponible"}
        </Text>

        <Text style={styles.label}>
          Matrícula
        </Text>

        <Text style={styles.value}>
          {user?.matricula || "No disponible"}
        </Text>

        <Text style={styles.label}>
          Sexo
        </Text>

        <Text style={styles.value}>
          {user?.sexo || "No disponible"}
        </Text>

        <Text style={styles.label}>
          Rol
        </Text>

        <Text style={styles.value}>
          {user?.rol || "No disponible"}
        </Text>

      </View>

      {/* BOTON CERRAR SESION */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={cerrarSesion}
      >

        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#F1F5F9",
    padding: 20,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: colors.primary,
  },

  changePhotoButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 15,
  },

  changePhotoText: {
    color: "#fff",
    fontWeight: "bold",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#0F172A",
    textAlign: "center",
  },

  role: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 16,
    textTransform: "capitalize",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 4,
  },

  label: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 15,
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 5,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});