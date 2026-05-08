import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(
        "http://10.10.1.44/academia/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            `correo=${encodeURIComponent(correo.trim())}` +
            `&password=${encodeURIComponent(password.trim())}`,
        }
      );

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const text = await response.text();

      if (!text) {
        throw new Error("El servidor no respondió");
      }

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      if (data.success === true) {
        Alert.alert(
          "Bienvenido",
          `Hola ${data.usuario.nombre}`
        );

        // Guardar usuario en contexto
        setUser(data.usuario);

      } else {
        Alert.alert(
          "Error",
          data.message || "Correo o contraseña incorrectos"
        );
      }

    } catch (error) {

      console.log("ERROR LOGIN:", error);

      Alert.alert(
        "Error",
        error.message || "No se pudo conectar con el servidor"
      );
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Iniciar Sesión
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={iniciarSesion}
      >
        <Text style={styles.buttonText}>
          Ingresar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.link}>
          Crear cuenta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("RecoverPassword")}
      >
        <Text style={styles.link}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    color: colors.secondary,
    marginTop: 12,
    textAlign: "center",
    fontSize: 15,
  },
});