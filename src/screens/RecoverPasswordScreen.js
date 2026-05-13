import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import colors from "../constants/colors";

// Simulación de base de datos (solo pruebas)
const registeredEmails = ["usuario@dominio.com", "admin@dominio.com"];

export default function RecoverPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecover = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Ingresa tu correo electrónico");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Correo no válido");
      return;
    }

    // Simulación de verificación
    if (!registeredEmails.includes(email)) {
      Alert.alert("Error", "Este correo no está registrado");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Token simulado (en producción viene del backend)
      const recoveryToken = "123456";

      Alert.alert(
        "Código enviado",
        "Revisa tu correo e ingresa el código recibido"
      );

      setEmail("");

      // 🔥 IMPORTANTE: nombre debe coincidir con AppNavigator
      navigation.navigate("ConfirmTokenScreen", {
        token: recoveryToken,
        email: email
      });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Contraseña</Text>

        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRecover}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Enviando..." : "Enviar código"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Volver</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  link: {
    color: colors.secondary,
    marginTop: 15,
    textAlign: "center"
  }
});