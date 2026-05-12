// NotificacionesScreen.js

import React, { useState } from "react";

import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

export default function NotificacionesScreen({
  visible,
  onClose,
}) {

  // 🔵 NOTIFICACIONES
  const [notificaciones, setNotificaciones] =
    useState([

      {
        id: "1",

        titulo:
          "Nueva actividad asignada",

        descripcion:
          "Se agregó una nueva actividad en el plan de trabajo.",

        hora: "9:25 a.m.",

        fecha: "11 mayo",

        leida: false,
      },

      {
        id: "2",

        titulo:
          "Minuta compartida",

        descripcion:
          "La minuta de la reunión fue subida correctamente.",

        hora: "8:10 a.m.",

        fecha: "11 mayo",

        leida: false,
      },

      {
        id: "3",

        titulo:
          "Nuevo reporte disponible",

        descripcion:
          "Los reportes mensuales ya están listos.",

        hora: "Ayer",

        fecha: "",

        leida: true,
      },

    ]);

  // 🔵 MARCAR TODAS
  const marcarTodasLeidas =
    () => {

      const nuevas =
        notificaciones.map(
          (item) => ({
            ...item,
            leida: true,
          })
        );

      setNotificaciones(nuevas);
    };

  return (

    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >

      {/* 🔵 FONDO */}
      <View style={styles.overlay}>

        {/* 🔵 VENTANA */}
        <View style={styles.modalContainer}>

          {/* 🔵 HEADER */}
          <View style={styles.header}>

            <Text style={styles.title}>
              Notificaciones
            </Text>

            <TouchableOpacity
              onPress={
                marcarTodasLeidas
              }
            >

              <Text style={styles.readAll}>
                Marcar todas como leídas
              </Text>

            </TouchableOpacity>

          </View>

          {/* 🔵 LISTA */}
          <FlatList

            data={notificaciones}

            keyExtractor={(item) =>
              item.id
            }

            showsVerticalScrollIndicator={
              false
            }

            renderItem={({ item }) => (

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.notificationCard}
              >

                {/* 🔵 ICONO */}
                <View style={styles.iconContainer}>

                  <Ionicons
                    name="notifications"
                    size={22}
                    color="#7C3AED"
                  />

                </View>

                {/* 🔵 TEXTO */}
                <View style={styles.info}>

                  <Text style={styles.message}>

                    <Text
                      style={
                        styles.bold
                      }
                    >

                      {item.titulo}

                    </Text>

                    {" "}
                    {item.descripcion}

                  </Text>

                  {/* 🔵 FECHA */}
                  <View style={styles.timeRow}>

                    <Ionicons
                      name="time-outline"
                      size={15}
                      color="#EF4444"
                    />

                    <Text style={styles.time}>

                      {item.hora}
                      {" , "}
                      {item.fecha}

                    </Text>

                  </View>

                </View>

                {/* 🔴 PUNTO */}
                {!item.leida && (

                  <View
                    style={styles.dot}
                  />

                )}

              </TouchableOpacity>
            )}
          />

          {/* 🔵 BOTÓN CERRAR */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >

            <Text style={styles.closeText}>
              Cerrar
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  // 🔵 FONDO
  overlay: {

    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.25)",

    justifyContent: "flex-start",

    alignItems: "flex-end",

    paddingTop: 90,

    paddingRight: 18,
  },

  // 🔵 MODAL
  modalContainer: {

    width: "92%",

    height: "75%",

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    overflow: "hidden",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.18,

    shadowRadius: 8,

    elevation: 10,
  },

  // 🔵 HEADER
  header: {

    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    paddingHorizontal: 22,

    paddingVertical: 20,

    borderBottomWidth: 1,

    borderBottomColor: "#E5E7EB",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  readAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  // 🔵 CARD
  notificationCard: {

    flexDirection: "row",

    padding: 18,

    borderBottomWidth: 1,

    borderBottomColor: "#E5E7EB",

    backgroundColor: "#FFFFFF",
  },

  // 🔵 ICONO
  iconContainer: {

    width: 52,

    height: 52,

    borderRadius: 18,

    backgroundColor: "#F3E8FF",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 14,
  },

  // 🔵 INFO
  info: {
    flex: 1,
  },

  message: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },

  bold: {
    fontWeight: "bold",
    color: "#111827",
  },

  // 🔵 FECHA
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  time: {
    marginLeft: 5,
    color: "#6B7280",
    fontSize: 14,
  },

  // 🔴 PUNTO
  dot: {

    width: 12,

    height: 12,

    borderRadius: 6,

    backgroundColor: "#DC2626",

    marginTop: 8,
  },

  // 🔵 BOTÓN
  closeButton: {

    margin: 18,

    backgroundColor: "#003B70",

    paddingVertical: 14,

    borderRadius: 16,

    alignItems: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

});