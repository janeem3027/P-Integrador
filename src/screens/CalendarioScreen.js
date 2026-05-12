// CalendarioScreen.js

import React, {
  useContext,
  useState,
} from "react";

import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "../context/AuthContext";

export default function CalendarioScreen({
  navigation,
}) {

  const { user } =
    useContext(AuthContext);

  // 🔵 VALIDAR ROLES ADMIN
  const esAdmin =
    user?.rol === "presidente" ||
    user?.rol === "secretario" ||
    user?.rol === "jefe";

  const [modalVisible, setModalVisible] =
    useState(false);

  const [titulo, setTitulo] =
    useState("");

  const [fecha, setFecha] =
    useState("");

  const [hora, setHora] =
    useState("");

  const [lugar, setLugar] =
    useState("");

  const [sesiones, setSesiones] =
    useState([
      {
        id: 1,
        codigo: "SES-1001",
        titulo: "Sesión Ordinaria",
        fecha: "10 Mayo 2026",
        hora: "10:00 AM",
        lugar: "Sala A",
        estado: "pendiente",

        docentes: [
          {
            id: 1,
            nombre: "Juan Pérez",
            asistencia: false,
          },
          {
            id: 2,
            nombre: "María López",
            asistencia: false,
          },
        ],
      },
    ]);

  // 🔵 GENERAR CÓDIGO
  const generarCodigo = () => {

    const numero = Math.floor(
      1000 + Math.random() * 9000
    );

    return `SES-${numero}`;
  };

  // 🔵 AGREGAR SESIÓN
  const agregarSesion = async () => {

    if (
      !titulo ||
      !fecha ||
      !hora ||
      !lugar
    ) {

      Alert.alert(
        "Error",
        "Todos los campos son obligatorios"
      );

      return;
    }

    try {

      const response = await fetch(
        "http://10.10.1.52/academia/api/guardar_sesion.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            `titulo=${encodeURIComponent(titulo)}` +
            `&fecha=${encodeURIComponent(fecha)}` +
            `&hora=${encodeURIComponent(hora)}` +
            `&lugar=${encodeURIComponent(lugar)}`,
        }
      );

      const data =
        await response.json();

      if (data.success) {

        const nuevaSesion = {

          id: sesiones.length + 1,

          codigo: generarCodigo(),

          titulo,
          fecha,
          hora,
          lugar,

          estado: "pendiente",

          docentes: [
            {
              id: 1,
              nombre: "Juan Pérez",
              asistencia: false,
            },
            {
              id: 2,
              nombre: "María López",
              asistencia: false,
            },
          ],
        };

        setSesiones([
          ...sesiones,
          nuevaSesion,
        ]);

        setTitulo("");
        setFecha("");
        setHora("");
        setLugar("");

        setModalVisible(false);

        Alert.alert(
          "Éxito",
          "Sesión programada correctamente"
        );

      } else {

        Alert.alert(
          "Error",
          data.message
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar"
      );
    }
  };

  // 🔵 CAMBIAR ESTADO
  const cambiarEstado = (id) => {

    const nuevasSesiones =
      sesiones.map((item) => {

        if (item.id === id) {

          return {
            ...item,

            estado:
              item.estado ===
              "pendiente"
                ? "completada"
                : "pendiente",
          };
        }

        return item;
      });

    setSesiones(nuevasSesiones);
  };

  // 🔵 CAMBIAR ASISTENCIA
  const cambiarAsistencia = (
    sesionId,
    docenteId
  ) => {

    const nuevasSesiones =
      sesiones.map((sesion) => {

        if (sesion.id === sesionId) {

          const nuevosDocentes =
            sesion.docentes.map(
              (docente) => {

                if (
                  docente.id ===
                  docenteId
                ) {

                  return {
                    ...docente,

                    asistencia:
                      !docente.asistencia,
                  };
                }

                return docente;
              }
            );

          return {
            ...sesion,
            docentes: nuevosDocentes,
          };
        }

        return sesion;
      });

    setSesiones(nuevasSesiones);
  };

  return (

    <View style={styles.container}>

      <ScrollView>

        {/* 🔙 BOTÓN REGRESAR */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate("Home")
          }
        >

          <Text style={styles.backText}>
            ← Inicio
          </Text>

        </TouchableOpacity>

        {/* 🔵 HEADER */}
        <View style={styles.header}>

          <Text style={styles.title}>
            Calendario Académico
          </Text>

          <Text style={styles.subtitle}>
            Programación de sesiones
          </Text>

        </View>

        {/* 🔵 SESIONES */}
        <View style={styles.section}>

          {sesiones.map((item) => (

            <View
              key={item.id}
              style={styles.card}
            >

              <Text style={styles.sessionTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.codigo}>
                Código: {item.codigo}
              </Text>

              <Text style={styles.info}>
                📅 {item.fecha}
              </Text>

              <Text style={styles.info}>
                ⏰ {item.hora}
              </Text>

              <Text style={styles.info}>
                📍 {item.lugar}
              </Text>

              <Text
                style={
                  item.estado ===
                  "pendiente"
                    ? styles.pending
                    : styles.completed
                }
              >
                Estado: {item.estado}
              </Text>

              {/* 🔵 SOLO ADMIN */}
              {esAdmin && (

                <TouchableOpacity
                  style={
                    item.estado ===
                    "pendiente"
                      ? styles.completeButton
                      : styles.pendingButton
                  }
                  onPress={() =>
                    cambiarEstado(item.id)
                  }
                >

                  <Text style={styles.buttonText}>

                    {item.estado ===
                    "pendiente"
                      ? "Marcar como completada"
                      : "Marcar como pendiente"}

                  </Text>

                </TouchableOpacity>

              )}

              {/* 🔵 SOLO ADMIN VE PASE DE LISTA */}
              {esAdmin && (

                <View style={styles.listaContainer}>

                  <Text style={styles.listaTitle}>
                    Pase de Lista
                  </Text>

                  {item.docentes.map(
                    (docente) => (

                      <View
                        key={docente.id}
                        style={
                          styles.docenteCard
                        }
                      >

                        <Text
                          style={
                            styles.docenteNombre
                          }
                        >
                          {docente.nombre}
                        </Text>

                        <TouchableOpacity
                          style={
                            docente.asistencia
                              ? styles.presentButton
                              : styles.absentButton
                          }
                          onPress={() =>
                            cambiarAsistencia(
                              item.id,
                              docente.id
                            )
                          }
                        >

                          <Text
                            style={
                              styles.buttonText
                            }
                          >

                            {docente.asistencia
                              ? "Presente"
                              : "Ausente"}

                          </Text>

                        </TouchableOpacity>

                      </View>

                    )
                  )}

                </View>

              )}

            </View>

          ))}

        </View>

      </ScrollView>

      {/* 🔵 SOLO ADMIN VE BOTÓN */}
      {esAdmin && (

        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            setModalVisible(true)
          }
        >

          <Text style={styles.fabText}>
            ＋
          </Text>

        </TouchableOpacity>

      )}

      {/* 🔵 MODAL SOLO ADMIN */}
      {esAdmin && (

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
        >

          <View style={styles.modalContainer}>

            <View style={styles.modal}>

              <Text style={styles.modalTitle}>
                Programar Sesión
              </Text>

              <TextInput
                placeholder="Título"
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
              />

              <TextInput
                placeholder="Fecha"
                style={styles.input}
                value={fecha}
                onChangeText={setFecha}
              />

              <TextInput
                placeholder="Hora"
                style={styles.input}
                value={hora}
                onChangeText={setHora}
              />

              <TextInput
                placeholder="Lugar"
                style={styles.input}
                value={lugar}
                onChangeText={setLugar}
              />

              <TouchableOpacity
                style={styles.btn}
                onPress={agregarSesion}
              >

                <Text style={styles.btnText}>
                  Guardar Sesión
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >

                <Text style={styles.cancel}>
                  Cancelar
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  backButton: {
    padding: 15,
  },

  backText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 16,
  },

  header: {
    backgroundColor: "#2563EB",
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#DBEAFE",
    marginTop: 5,
  },

  section: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E293B",
  },

  codigo: {
    color: "#2563EB",
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 5,
  },

  pending: {
    marginTop: 10,
    color: "#EA580C",
    fontWeight: "bold",
  },

  completed: {
    marginTop: 10,
    color: "#16A34A",
    fontWeight: "bold",
  },

  completeButton: {
    backgroundColor: "#16A34A",
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
  },

  pendingButton: {
    backgroundColor: "#EA580C",
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  listaContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 15,
  },

  listaTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E293B",
  },

  docenteCard: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  docenteNombre: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#334155",
  },

  presentButton: {
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 10,
  },

  absentButton: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 10,
  },

  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    backgroundColor: "#2563EB",
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  fabText: {
    color: "#fff",
    fontSize: 30,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:
      "rgba(0,0,0,0.5)",
  },

  modal: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  btn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  cancel: {
    textAlign: "center",
    marginTop: 15,
    color: "#64748B",
  },

});