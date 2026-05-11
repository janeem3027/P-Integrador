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

  const { setUser } =
    useContext(AuthContext);

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");

  const iniciarSesion = async () => {

    if (
      !correo.trim() ||
      !password.trim()
    ) {

      Alert.alert(
        "Error",
        "Todos los campos son obligatorios"
      );

      return;
    }

    try {

      const response = await fetch(
        "http://192.168.110.143/academia/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            `correo=${encodeURIComponent(
              correo.trim()
            )}` +
            `&password=${encodeURIComponent(
              password.trim()
            )}`,
        }
      );

      const data =
        await response.json();

      // 🔵 LOGIN CORRECTO
      if (data.success === true) {

        // 🔵 GUARDAR USUARIO
        setUser(data.usuario);

        Alert.alert(
          "Bienvenido",
          `Hola ${data.usuario.nombre}`
        );

        // 🔵 REDIRECCIONES POR ROL

        // 👨‍🏫 DOCENTE
        if (
          data.usuario.rol ===
          "docente"
        ) {

          navigation.replace(
            "PaseListaScreen"
          );
        }

        // 👨‍💼 PRESIDENTE
        else if (
          data.usuario.rol ===
          "presidente"
        ) {

          navigation.replace(
            "AsistenciaAdminScreen"
          );
        }

        // 👨‍💼 SECRETARIO
        else if (
          data.usuario.rol ===
          "secretario"
        ) {

          navigation.replace(
            "AsistenciaAdminScreen"
          );
        }

        // 👨‍💼 JEFE
        else if (
          data.usuario.rol ===
          "jefe"
        ) {

          navigation.replace(
            "AsistenciaAdminScreen"
          );
        }

        // 🔵 SI NO TIENE ROL
        else {

          navigation.replace(
            "Home"
          );
        }

      } else {

        Alert.alert(
          "Error",
          data.message ||
            "Correo o contraseña incorrectos"
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar con el servidor"
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

      {/* 🔵 BOTÓN LOGIN */}
      <TouchableOpacity
        style={styles.button}
        onPress={iniciarSesion}
      >

        <Text style={styles.buttonText}>
          Ingresar
        </Text>

      </TouchableOpacity>

      {/* 🔵 CREAR CUENTA */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Register"
          )
        }
      >

        <Text style={styles.link}>
          Crear cuenta
        </Text>

      </TouchableOpacity>

      {/* 🔵 RECUPERAR */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "RecoverPassword"
          )
        }
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