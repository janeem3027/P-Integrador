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

import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {

  const { user } =
    useContext(AuthContext);

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

  // 🔵 PRESIDENTE Y SECRETARIO
  else if (esAdmin) {

    menus = [

      {
        titulo: "Asistencia",
        icono:
          "https://cdn-icons-png.flaticon.com/512/942/942748.png",

        screen: "AsistenciaAdminScreen",
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

  // 🔵 OTROS ROLES
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

        <View>

          <Text style={styles.welcome}>
            Bienvenido
          </Text>

          <Text style={styles.name}>
            {user?.nombre || "Usuario"}
          </Text>

          <Text style={styles.role}>
            {user?.rol}
          </Text>

        </View>

        {/* 🔵 PERFIL */}
        <TouchableOpacity
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

            style={styles.avatar}
          />

        </TouchableOpacity>

      </View>

      {/* 🔵 PANEL */}
      <View style={styles.panel}>

        {menus.map(
          (item, index) => (

            <TouchableOpacity
              key={index}

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

                  style={styles.icon}
                />

              </View>

              {/* 🔵 TEXTO */}
              <Text
                style={styles.cardText}
              >

                {item.titulo}

              </Text>

            </TouchableOpacity>
          )
        )}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#EEF2F7",
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  // 🔵 HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  welcome: {
    fontSize: 14,
    color: "#6B7280",
  },

  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  role: {
    fontSize: 14,
    marginTop: 3,
    color: "#64748B",
    textTransform: "capitalize",
  },

  // 🔵 PERFIL
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: "#D1D5DB",
  },

  // 🔵 PANEL
  panel: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // 🔵 CARD
  card: {

    width: "47%",

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    alignItems: "center",

    paddingVertical: 25,

    marginBottom: 22,

    borderWidth: 4,

    borderColor: "#DCDCDC",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.10,

    shadowRadius: 5,

    elevation: 5,
  },

  // 🔵 ICONO
  iconContainer: {

    width: 80,

    height: 80,

    borderRadius: 22,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#EEF2FF",

    marginBottom: 14,
  },

  icon: {
    width: 55,
    height: 55,
  },

  // 🔵 TEXTO
  cardText: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "500",
  },

});