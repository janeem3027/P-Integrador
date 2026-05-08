import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

export default function RecoverPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recuperar Contraseña</Text>

      <TextInput placeholder="Correo electrónico" style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar enlace</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Volver</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.light,
    padding:20,
    justifyContent:"center"
  },
  title: {
    fontSize:22,
    fontWeight:"bold",
    color: colors.primary,
    marginBottom:20
  },
  input: {
    backgroundColor:"white",
    padding:12,
    borderRadius:10,
    marginBottom:10
  },
  button: {
    backgroundColor: colors.primary,
    padding:15,
    borderRadius:10,
    alignItems:"center"
  },
  buttonText: {
    color:"white",
    fontWeight:"bold"
  },
  link: {
    color: colors.secondary,
    marginTop:15,
    textAlign:"center"
  }
});