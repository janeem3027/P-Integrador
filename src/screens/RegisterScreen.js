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

import colors from "../constants/colors";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correo, setCorreo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [sexo, setSexo] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    if (
      !nombre ||
      !apellidoP ||
      !apellidoM ||
      !correo ||
      !matricula ||
      !sexo ||
      !rol ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "http://10.10.1.44/academia/api/registro.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            `nombre=${encodeURIComponent(nombre)}` +
            `&apellido_p=${encodeURIComponent(apellidoP)}` +
            `&apellido_m=${encodeURIComponent(apellidoM)}` +
            `&correo=${encodeURIComponent(correo)}` +
            `&matricula=${encodeURIComponent(matricula)}` +
            `&sexo=${encodeURIComponent(sexo)}` +
            `&rol=${encodeURIComponent(rol)}` +
            `&password=${encodeURIComponent(password)}`,
        }
      );

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

      if (data.success) {
        Alert.alert("Éxito", "Usuario registrado correctamente");

        setNombre("");
        setApellidoP("");
        setApellidoM("");
        setCorreo("");
        setMatricula("");
        setSexo("");
        setRol("");
        setPassword("");
        setConfirmPassword("");

        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Error de conexión con el servidor"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        placeholder="Apellido Paterno"
        style={styles.input}
        value={apellidoP}
        onChangeText={setApellidoP}
      />

      <TextInput
        placeholder="Apellido Materno"
        style={styles.input}
        value={apellidoM}
        onChangeText={setApellidoM}
      />

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Matrícula"
        style={styles.input}
        value={matricula}
        onChangeText={setMatricula}
      />

      <Text style={styles.label}>Sexo</Text>

      <View style={styles.row}>
        {["M", "F"].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.option, sexo === s && styles.selected]}
            onPress={() => setSexo(s)}
          >
            <Text
              style={sexo === s ? styles.selectedText : styles.optionText}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Rol</Text>

      <View style={styles.row}>
        {["presidente", "secretario", "docente", "jefe_carrera"].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.option, rol === r && styles.selected]}
            onPress={() => setRol(r)}
          >
            <Text
              style={rol === r ? styles.selectedText : styles.optionText}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={registerUser}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Volver al login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.light,
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    color: colors.primary,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    elevation: 2,
  },

  label: {
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginRight: 8,
    marginTop: 5,
  },

  selected: {
    backgroundColor: "#4F46E5",
  },

  optionText: {
    color: "#000",
  },

  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 18,
    color: colors.secondary,
    fontSize: 15,
  },
});