import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.center}>
        <Text style={styles.title}>BIENVENIDO</Text>
        <Text style={styles.subtitle}>INSTITUTO TECNOLÓGICO</Text>
      </View>

      <Text style={styles.footer}>Cargando...</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 220,
    paddingBottom: 60,
  },
  center: {
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    letterSpacing: 1,
  },
  footer: {
    color: "#C7D2FE",
    fontSize: 16,
  },
});