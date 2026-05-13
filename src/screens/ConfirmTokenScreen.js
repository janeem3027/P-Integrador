import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import colors from "../constants/colors";

export default function ConfirmTokenScreen({ route, navigation }) {
  const { token } = route.params;  // Obtener el token pasado desde la pantalla anterior
  const [enteredToken, setEnteredToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!enteredToken.trim()) {
      Alert.alert("Error", "Ingresa el token recibido");
      return;
    }

    if (enteredToken !== token) {
      Alert.alert("Error", "Token inválido");
      return;
    }

    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Ingresa una nueva contraseña y confírmala");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    // Simulación de cambio de contraseña
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Éxito", "Tu contraseña ha sido cambiada");
      navigation.goBack(); // Volver a la pantalla de inicio o login
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Token</Text>

      <TextInput
        placeholder="Ingresa el token"
        style={styles.input}
        value={enteredToken}
        onChangeText={setEnteredToken}
      />

      <TextInput
        placeholder="Nueva contraseña"
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirm}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Confirmando..." : "Confirmar"}
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
  }
});