// HomeScreen.js

import React, { useContext } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../constants/colors";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {

  const { user } = useContext(AuthContext);

  const accesoCompleto =
    user?.rol === "presidente" ||
    user?.rol === "secretario";

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <View>

          <Text style={styles.welcome}>
            Bienvenido
          </Text>

          <Text style={styles.title}>
            {user?.nombre || "Usuario"}
          </Text>

          <Text style={styles.role}>
            Rol: {user?.rol}
          </Text>

        </View>

        {/* FOTO PERFIL */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Perfil")}
        >
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>

      </View>

      {/* PLAN DE TRABAJO */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("PlanTrabajo")}
      >

        <Text style={styles.cardTitle}>
          📋 Plan de Trabajo
        </Text>

        <Text style={styles.cardDescription}>
          Consultar actividades académicas
        </Text>

      </TouchableOpacity>

      {/* CALENDARIO */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Calendario")}
      >

        <Text style={styles.cardTitle}>
          📅 Calendario
        </Text>

        <Text style={styles.cardDescription}>
          Ver horarios y asistencia
        </Text>

      </TouchableOpacity>

      {/* MINUTAS */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Minuta")}
      >

        <Text style={styles.cardTitle}>
          📝 Minutas
        </Text>

        <Text style={styles.cardDescription}>
          Ver minutas registradas
        </Text>

      </TouchableOpacity>

      {/* REPORTES */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Reportes")}
      >

        <Text style={styles.cardTitle}>
          📊 Reportes
        </Text>

        <Text style={styles.cardDescription}>
          Consultar reportes de actividades
        </Text>

      </TouchableOpacity>

      {/* SOLO PRESIDENTE Y SECRETARIO */}
      {accesoCompleto && (
        <>

          {/* PASE DE LISTA */}
          <TouchableOpacity
            style={styles.adminCard}
            onPress={() => navigation.navigate("PaseLista")}
          >

            <Text style={styles.cardTitle}>
              ✅ Pase de Lista
            </Text>

            <Text style={styles.cardDescription}>
              Registrar asistencia de docentes
            </Text>

          </TouchableOpacity>

          {/* CREAR MINUTA */}
          <TouchableOpacity
            style={styles.adminCard}
            onPress={() => navigation.navigate("Minuta")}
          >

            <Text style={styles.cardTitle}>
              ✍️ Crear Minuta
            </Text>

            <Text style={styles.cardDescription}>
              Registrar nuevas minutas
            </Text>

          </TouchableOpacity>

        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: colors.light,
    flexGrow: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  welcome: {
    fontSize: 14,
    color: "#777",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },

  role: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 4,
  },

  adminCard: {
    backgroundColor: "#DBEAFE",
    padding: 22,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 8,
  },

  cardDescription: {
    color: "#475569",
    fontSize: 14,
  },

});