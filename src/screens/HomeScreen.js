// HomeScreen.js

import React, {
  useContext,
  useState,
} from "react";

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

import {
  Ionicons,
} from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";

// 🔔 MODAL
import NotificacionesScreen from "./NotificacionesScreen";

export default function HomeScreen({
  navigation,
}) {

  const { user } =
    useContext(AuthContext);

  // 🔔 MODAL
  const [
    mostrarNotificaciones,

    setMostrarNotificaciones,
  ] = useState(false);

  // 🔵 ROLES
  const esAdmin =
    user?.rol === "presidente" ||
    user?.rol === "secretario";

  const esDocente =
    user?.rol === "docente";

  // 🔵 MENÚS
  let menus = [];

  // 🔵 DOCENTE
  if (esDocente) {

    menus = [

      {
        titulo: "Pase de Lista",

        icono:
          "https://cdn-icons-png.flaticon.com/512/942/942748.png",

        screen: "PaseLista",
      },

      {
        titulo: "Calendario",

        icono:
          "https://cdn-icons-png.flaticon.com/512/747/747310.png",

        screen: "Calendario",
      },

      {
        titulo: "Actividades",

        icono:
          "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",

        screen: "PlanTrabajo",
      },

      {
        titulo: "Reportes",

        icono:
          "https://cdn-icons-png.flaticon.com/512/2436/2436874.png",

        screen: "Reportes",
      },

    ];
  }

  // 🔵 ADMIN
  else if (esAdmin) {

    menus = [

      {
        titulo: "Asistencia",

        icono:
          "https://cdn-icons-png.flaticon.com/512/942/942748.png",

        screen:
          "AsistenciaAdminScreen",
      },

      {
        titulo: "Minutas",

        icono:
          "https://cdn-icons-png.flaticon.com/512/2991/2991112.png",

        screen: "Minuta",
      },

      {
        titulo: "Actividades",

        icono:
          "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",

        screen: "PlanTrabajo",
      },

      {
        titulo: "Reportes",

        icono:
          "https://cdn-icons-png.flaticon.com/512/2436/2436874.png",

        screen: "Reportes",
      },

      // 🔵 DOCENTES
      {
        titulo: "Docentes",

        icono:
          "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",

        screen: "Docentes",
      },

      {
        titulo: "Calendario",

        icono:
          "https://cdn-icons-png.flaticon.com/512/747/747310.png",

        screen: "Calendario",
      },

    ];
  }

  // 🔵 OTROS
  else {

    menus = [

      {
        titulo: "Calendario",

        icono:
          "https://cdn-icons-png.flaticon.com/512/747/747310.png",

        screen: "Calendario",
      },

    ];
  }

  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#003B70"
      />

      <ScrollView
        contentContainerStyle={
          styles.container
        }

        showsVerticalScrollIndicator={
          false
        }
      >

        {/* 🔵 HEADER */}
        <View style={styles.header}>

          <View
            style={
              styles.headerContent
            }
          >

            {/* 🔵 TEXTO */}
            <View
              style={
                styles.textContainer
              }
            >

              <Text
                style={styles.welcome}
              >

                Bienvenido(a)

              </Text>

              <Text style={styles.name}>

                {user?.nombre ||
                  "Usuario"}

              </Text>

              <View
                style={
                  styles.roleBadge
                }
              >

                <Text
                  style={styles.role}
                >

                  {user?.rol}

                </Text>

              </View>

            </View>

            {/* 🔵 DERECHA */}
            <View
              style={
                styles.rightSection
              }
            >

              {/* 🔔 CAMPANA */}
              <TouchableOpacity

                activeOpacity={0.8}

                style={
                  styles.notificationButton
                }

                onPress={() =>
                  setMostrarNotificaciones(
                    true
                  )
                }
              >

                <Ionicons
                  name="notifications"
                  size={24}
                  color="#003B70"
                />

                <View
                  style={
                    styles.notificationDot
                  }
                />

              </TouchableOpacity>

              {/* 🔵 PERFIL */}
              <TouchableOpacity
                activeOpacity={0.8}

                onPress={() =>
                  navigation.navigate(
                    "Perfil"
                  )
                }
              >

                <Image
                  source={{
                    uri:
                      "https://i.pravatar.cc/300",
                  }}

                  style={
                    styles.avatar
                  }
                />

              </TouchableOpacity>

            </View>

          </View>

          {/* 🔵 BANNER */}
          <View style={styles.banner}>

            <Text
              style={
                styles.bannerTitle
              }
            >

              Sistema de Actividades

            </Text>

            <Text
              style={
                styles.bannerSubtitle
              }
            >

              Academia TECNM

            </Text>

          </View>

        </View>

        {/* 🔵 PANEL */}
        <View style={styles.panel}>

          {menus.map(
            (item, index) => (

              <TouchableOpacity

                key={index}

                activeOpacity={0.88}

                style={styles.card}

                onPress={() =>
                  navigation.navigate(
                    item.screen
                  )
                }
              >

                {/* 🔵 ICONO */}
                <View
                  style={
                    styles.iconContainer
                  }
                >

                  <Image
                    source={{
                      uri: item.icono,
                    }}

                    style={
                      styles.icon
                    }
                  />

                </View>

                {/* 🔵 TEXTO */}
                <Text
                  style={
                    styles.cardText
                  }
                >

                  {item.titulo}

                </Text>

              </TouchableOpacity>
            )
          )}

        </View>

      </ScrollView>

      {/* 🔔 MODAL */}
      <NotificacionesScreen

        visible={
          mostrarNotificaciones
        }

        onClose={() =>
          setMostrarNotificaciones(
            false
          )
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#003B70",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#F4F8FC",
    paddingBottom: 30,
  },

  header: {

    backgroundColor: "#003B70",

    paddingTop: 20,

    paddingHorizontal: 22,

    paddingBottom: 35,

    borderBottomLeftRadius: 35,

    borderBottomRightRadius: 35,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent:
      "space-between",

    alignItems: "center",
  },

  textContainer: {
    flex: 1,
  },

  welcome: {
    fontSize: 15,
    color: "#D6E6F5",
    marginBottom: 5,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  roleBadge: {

    marginTop: 10,

    backgroundColor: "#0A5EA8",

    alignSelf: "flex-start",

    paddingHorizontal: 14,

    paddingVertical: 6,

    borderRadius: 30,
  },

  role: {
    color: "#FFFFFF",
    fontSize: 13,
    textTransform: "capitalize",
    fontWeight: "600",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationButton: {

    width: 52,

    height: 52,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 12,
  },

  notificationDot: {

    position: "absolute",

    top: 10,

    right: 10,

    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: "#EF4444",
  },

  avatar: {

    width: 72,

    height: 72,

    borderRadius: 36,

    borderWidth: 3,

    borderColor: "#FFFFFF",
  },

  banner: {

    marginTop: 25,

    backgroundColor: "#0A5EA8",

    borderRadius: 24,

    paddingVertical: 18,

    paddingHorizontal: 20,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerSubtitle: {
    marginTop: 6,
    color: "#D7E8F7",
    fontSize: 14,
  },

  panel: {

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent:
      "space-between",

    paddingHorizontal: 18,

    marginTop: 28,
  },

  card: {

    width: "47%",

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    alignItems: "center",

    paddingVertical: 28,

    marginBottom: 22,

    borderWidth: 1.5,

    borderColor: "#DCE8F5",
  },

  iconContainer: {

    width: 82,

    height: 82,

    borderRadius: 24,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#EAF3FB",

    marginBottom: 16,
  },

  icon: {
    width: 52,
    height: 52,
  },

  cardText: {
    fontSize: 17,
    color: "#0F172A",
    fontWeight: "600",
    textAlign: "center",
  },

});