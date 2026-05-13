import React, { useContext, useEffect, useState } from "react";

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import { AuthContext } from "../context/AuthContext";

export default function PerfilScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [foto, setFoto] = useState(null);

  useEffect(() => {
    cargarFoto();
  }, []);

  const cargarFoto = async () => {
    try {
      const fotoGuardada = await AsyncStorage.getItem("fotoPerfil");

      if (fotoGuardada) {
        setFoto(fotoGuardada);
      } else {
        setFoto("https://i.pravatar.cc/300");
      }
    } catch (error) {
      console.log(error);
      setFoto("https://i.pravatar.cc/300");
    }
  };

  const cambiarFoto = async () => {
    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert(
        "Permiso requerido",
        "Debes permitir acceso a fotos"
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;

      setFoto(uri);

      await AsyncStorage.setItem("fotoPerfil", uri);
    }
  };

  const cerrarSesion = async () => {
    Alert.alert("Cerrar sesión", "¿Deseas salir?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("fotoPerfil");

            setUser(null);

            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo cerrar sesión");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={cambiarFoto}>
        <Image
          source={{
            uri: foto || "https://i.pravatar.cc/300",
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.changePhoto}>
        Toca la foto para cambiarla
      </Text>

      <View style={styles.card}>
        <Text style={styles.name}>{user?.nombre}</Text>
        <Text style={styles.role}>{user?.rol}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          Información personal
        </Text>

        <Text style={styles.info}>
          📧 {user?.correo}
        </Text>

        <Text style={styles.info}>
          🆔 {user?.matricula}
        </Text>
      </View>

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
    alignItems: "center",
    padding: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#2563EB",
  },

  changePhoto: {
    marginTop: 10,
    color: "#2563EB",
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  role: {
    fontSize: 16,
    color: "#DBEAFE",
    marginTop: 5,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 15,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E293B",
  },

  info: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 8,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    width: "100%",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 25,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});