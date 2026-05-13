// HomeScreen.js

import React, { useContext, useMemo, useState } from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";

import NotificacionesScreen from "./NotificacionesScreen";

export default function HomeScreen({ navigation }) {

  const { user } = useContext(AuthContext);

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

  const esAdmin =
    user?.rol === "presidente" ||
    user?.rol === "secretario";

  const esDocente = user?.rol === "docente";

  const menus = useMemo(() => {

    if (esDocente) {
      return [
        {
          titulo: "Pase de Lista",
          icono: "checkmark-done",
          color: "#2563EB",
          screen: "PaseLista",
        },
        {
          titulo: "Calendario",
          icono: "calendar",
          color: "#7C3AED",
          screen: "Calendario",
        },
        {
          titulo: "Actividades",
          icono: "clipboard",
          color: "#0F766E",
          screen: "PlanTrabajo",
        },
        {
          titulo: "Reportes",
          icono: "bar-chart",
          color: "#EA580C",
          screen: "Reportes",
        },
      ];
    }

    if (esAdmin) {
      return [
        {
          titulo: "Asistencia",
          icono: "people",
          color: "#2563EB",
          screen: "AsistenciaAdmin", // ✅ CORRECTO
        },
        {
          titulo: "Minutas",
          icono: "document-text",
          color: "#0F766E",
          screen: "Minuta",
        },
        {
          titulo: "Actividades",
          icono: "clipboard",
          color: "#7C3AED",
          screen: "PlanTrabajo",
        },
        {
          titulo: "Reportes",
          icono: "bar-chart",
          color: "#EA580C",
          screen: "Reportes",
        },
        {
          titulo: "Docentes",
          icono: "school",
          color: "#DC2626",
          screen: "Docentes",
        },
        {
          titulo: "Calendario",
          icono: "calendar",
          color: "#0891B2",
          screen: "Calendario",
        },
      ];
    }

    return [
      {
        titulo: "Calendario",
        icono: "calendar",
        color: "#2563EB",
        screen: "Calendario",
      },
    ];
  }, [esAdmin, esDocente]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1F3A" />

      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.topHeader}>

            <View style={styles.userSection}>
              <Text style={styles.welcome}>Bienvenido(a)</Text>
              <Text style={styles.userName}>
                {user?.nombre || "Usuario"}
              </Text>

              <View style={styles.roleBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#fff" />
                <Text style={styles.roleText}>{user?.rol}</Text>
              </View>
            </View>

            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => setMostrarNotificaciones(true)}
              >
                <Ionicons name="notifications-outline" size={24} color="#0B1F3A" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
                  }}
                  style={styles.avatar}
                />
              </TouchableOpacity>

            </View>

          </View>

          {/* BANNER */}
          <View style={styles.banner}>
            <View>
              <Text style={styles.bannerTitle}>Sistema Académico</Text>
              <Text style={styles.bannerSubtitle}>
                Gestión de actividades institucionales
              </Text>
            </View>

            <Ionicons name="school" size={40} color="#fff" />
          </View>

        </View>

        {/* CARDS */}
        <View style={styles.panel}>
          {menus.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icono} size={30} color="#fff" />
              </View>

              <Text style={styles.cardText}>{item.titulo}</Text>

              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* NOTIFICACIONES */}
      <NotificacionesScreen
        visible={mostrarNotificaciones}
        onClose={() => setMostrarNotificaciones(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: { flex: 1, backgroundColor: "#0B1F3A" },

  container: {
    paddingBottom: 40,
    backgroundColor: "#F1F5F9",
  },

  header: {
    backgroundColor: "#0B1F3A",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userSection: { flex: 1 },

  welcome: { color: "#ccc" },

  userName: { color: "#fff", fontSize: 26, fontWeight: "bold" },

  roleBadge: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#1E3A5F",
    padding: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  roleText: { color: "#fff", marginLeft: 6 },

  actions: { flexDirection: "row", alignItems: "center" },

  notificationButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },

  notificationDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },

  banner: {
    marginTop: 20,
    backgroundColor: "#1E3A5F",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bannerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  bannerSubtitle: { color: "#ccc" },

  panel: {
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
  },

  iconContainer: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },

  cardText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});