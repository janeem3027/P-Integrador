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

// 🔔 MODAL
import NotificacionesScreen from "./NotificacionesScreen";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  // 🔔 MODAL
  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  // 🔵 ROLES
  const esAdmin =
    user?.rol === "presidente" ||
    user?.rol === "secretario";

  const esDocente = user?.rol === "docente";

  // 🔵 MENÚS
  const menus = useMemo(() => {
    // 🔵 DOCENTE
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

    // 🔵 ADMIN
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

    // 🔵 OTROS
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0B1F3A"
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔵 HEADER */}
        <View style={styles.header}>
          {/* TOP */}
          <View style={styles.topHeader}>
            {/* USER INFO */}
            <View style={styles.userSection}>
              <Text style={styles.welcome}>
                Bienvenido(a)
              </Text>

              <Text style={styles.userName}>
                {user?.nombre || "Usuario"}
              </Text>

              <View style={styles.roleBadge}>
                <Ionicons
                  name="shield-checkmark"
                  size={14}
                  color="#FFFFFF"
                />

                <Text style={styles.roleText}>
                  {user?.rol}
                </Text>
              </View>
            </View>

            {/* ACTIONS */}
            <View style={styles.actions}>
              {/* 🔔 NOTIFICACIONES */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.notificationButton}
                onPress={() =>
                  setMostrarNotificaciones(true)
                }
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#0B1F3A"
                />

                <View style={styles.notificationDot} />
              </TouchableOpacity>

              {/* 👤 PERFIL */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate("Perfil")
                }
              >
                <Image
                  source={{
                    uri: "https://i.pravatar.cc/300",
                  }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 🔵 BANNER */}
          <View style={styles.banner}>
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>
                Sistema Académico
              </Text>

              <Text style={styles.bannerSubtitle}>
                Gestión de actividades y control
                institucional
              </Text>
            </View>

            <View style={styles.bannerIcon}>
              <Ionicons
                name="school"
                size={38}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* 🔵 PANEL */}
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>
            Módulos del sistema
          </Text>

          <Text style={styles.panelSubtitle}>
            Accesos rápidos
          </Text>
        </View>

        {/* 🔵 CARDS */}
        <View style={styles.panel}>
          {menus.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={styles.card}
              onPress={() =>
                navigation.navigate(item.screen)
              }
            >
              {/* ICONO */}
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: item.color,
                  },
                ]}
              >
                <Ionicons
                  name={item.icono}
                  size={32}
                  color="#FFFFFF"
                />
              </View>

              {/* TEXTO */}
              <Text style={styles.cardText}>
                {item.titulo}
              </Text>

              <View style={styles.cardArrow}>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#94A3B8"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔔 MODAL */}
      <NotificacionesScreen
        visible={mostrarNotificaciones}
        onClose={() =>
          setMostrarNotificaciones(false)
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1F3A",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#F1F5F9",
    paddingBottom: 40,
  },

  // 🔵 HEADER
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

  userSection: {
    flex: 1,
  },

  welcome: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
  },

  userName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  roleBadge: {
    marginTop: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },

  roleText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

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

  // 🔵 BANNER
  banner: {
    marginTop: 28,
    backgroundColor: "#163B65",
    borderRadius: 28,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bannerLeft: {
    flex: 1,
    paddingRight: 15,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  bannerSubtitle: {
    color: "#D7E3F4",
    fontSize: 14,
    lineHeight: 22,
  },

  bannerIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  // 🔵 PANEL
  panelHeader: {
    paddingHorizontal: 22,
    marginTop: 28,
    marginBottom: 18,
  },

  panelTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
  },

  panelSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },

  panel: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  // 🔵 CARD
  card: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginBottom: 20,

    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,

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