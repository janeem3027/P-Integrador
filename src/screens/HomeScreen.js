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

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

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
          screen: "AsistenciaAdminScreen",
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

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.topHeader}>

            <View style={styles.userSection}>
              <Text style={styles.welcome}>Bienvenido(a)</Text>
              <Text style={styles.userName}>
                {user?.nombre || "Usuario"}
              </Text>

              <View style={styles.roleBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
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

            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>Sistema Académico</Text>
              <Text style={styles.bannerSubtitle}>
                Gestión de actividades y control institucional
              </Text>
            </View>

            <View style={styles.bannerIcon}>
              <Ionicons name="school" size={38} color="#FFFFFF" />
            </View>

          </View>

        </View>

        {/* PANEL HEADER */}
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Módulos del sistema</Text>
          <Text style={styles.panelSubtitle}>Accesos rápidos</Text>
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
                <Ionicons name={item.icono} size={32} color="#FFFFFF" />
              </View>

              <Text style={styles.cardText}>{item.titulo}</Text>

              <View style={styles.cardArrow}>
                <Ionicons name="arrow-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* MODAL NOTIFICACIONES */}
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
    flexGrow: 1,
    backgroundColor: "#F1F5F9",
    paddingBottom: 40,
  },

  header: {
    backgroundColor: "#0B1F3A",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 34,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userSection: { flex: 1 },

  welcome: { color: "#CBD5E1", fontSize: 14 },

  userName: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold" },

  roleBadge: {
    marginTop: 12,
    flexDirection: "row",
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: "flex-start",
  },

  roleText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontSize: 13,
  },

  actions: { flexDirection: "row", alignItems: "center" },

  notificationButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  banner: {
    marginTop: 28,
    backgroundColor: "#163B65",
    borderRadius: 28,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bannerLeft: { flex: 1 },

  bannerTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },

  bannerSubtitle: { color: "#D7E3F4", fontSize: 14 },

  bannerIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  panelHeader: {
    paddingHorizontal: 22,
    marginTop: 28,
    marginBottom: 18,
  },

  panelTitle: { fontSize: 24, fontWeight: "bold", color: "#0F172A" },

  panelSubtitle: { fontSize: 14, color: "#64748B" },

  panel: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  card: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    marginBottom: 20,
    elevation: 5,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  cardArrow: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
});