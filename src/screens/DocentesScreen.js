// DocentesScreen.js

import React, {
    useEffect,
    useState,
} from "react";
  
  import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
  
  import {
    Ionicons,
} from "@expo/vector-icons";
  
  export default function DocentesScreen({
    navigation,
  }) {
  
    // 🔵 STATES
    const [docentes, setDocentes] =
      useState([]);
  
    const [loading, setLoading] =
      useState(true);
  
    // 🔵 API
    const API_URL =
      "http://TU_IP:3000/api/docentes";
  
    // 🔵 OBTENER DOCENTES
    const obtenerDocentes =
      async () => {
  
        try {
  
          const response =
            await fetch(API_URL);
  
          const data =
            await response.json();
  
          setDocentes(data);
  
        } catch (error) {
  
          console.log(
            "Error al obtener docentes:",
            error
          );
  
        } finally {
  
          setLoading(false);
        }
      };
  
    // 🔵 USE EFFECT
    useEffect(() => {
  
      obtenerDocentes();
  
    }, []);
  
    // 🔵 LOADING
    if (loading) {
  
      return (
  
        <SafeAreaView
          style={styles.loadingContainer}
        >
  
          <ActivityIndicator
            size="large"
            color="#003B70"
          />
  
          <Text style={styles.loadingText}>
            Cargando docentes...
          </Text>
  
        </SafeAreaView>
      );
    }
  
    return (
  
      <SafeAreaView style={styles.safeArea}>
  
        <StatusBar
          barStyle="light-content"
          backgroundColor="#003B70"
        />
  
        {/* 🔵 HEADER */}
        <View style={styles.header}>
  
          {/* 🔙 BOTÓN */}
          <TouchableOpacity
  
            style={styles.backButton}
  
            onPress={() =>
              navigation.goBack()
            }
          >
  
            <Ionicons
              name="arrow-back"
              size={24}
              color="#003B70"
            />
  
          </TouchableOpacity>
  
          {/* 🔵 TITULOS */}
          <View style={styles.headerText}>
  
            <Text style={styles.title}>
              Docentes
            </Text>
  
            <Text style={styles.subtitle}>
              Lista de profesores
              registrados
            </Text>
  
          </View>
  
          {/* 🔵 ICONO */}
          <View style={styles.iconBox}>
  
            <Ionicons
              name="people"
              size={28}
              color="#003B70"
            />
  
          </View>
  
        </View>
  
        {/* 🔵 LISTA */}
        <FlatList
  
          data={docentes}
  
          keyExtractor={(item) =>
            item.id.toString()
          }
  
          contentContainerStyle={
            styles.listContainer
          }
  
          showsVerticalScrollIndicator={
            false
          }
  
          ListEmptyComponent={() => (
  
            <View style={styles.emptyContainer}>
  
              <Ionicons
                name="school-outline"
                size={70}
                color="#94A3B8"
              />
  
              <Text style={styles.emptyText}>
                No hay docentes
                registrados
              </Text>
  
            </View>
          )}
  
          renderItem={({ item }) => (
  
            <View style={styles.card}>
  
              {/* 🔵 FOTO */}
              <Image
                source={{
                  uri:
                    item.foto ||
                    "https://i.pravatar.cc/300",
                }}
  
                style={styles.avatar}
              />
  
              {/* 🔵 INFO */}
              <View style={styles.info}>
  
                <Text style={styles.name}>
                  {item.nombre}
                </Text>
  
                <Text
                  style={
                    styles.speciality
                  }
                >
  
                  {item.especialidad ||
                    "Docente"}
  
                </Text>
  
                {/* 🔵 CORREO */}
                <View style={styles.row}>
  
                  <Ionicons
                    name="mail-outline"
                    size={16}
                    color="#0A5EA8"
                  />
  
                  <Text style={styles.text}>
  
                    {item.correo}
  
                  </Text>
  
                </View>
  
                {/* 🔵 ROL */}
                <View style={styles.row}>
  
                  <Ionicons
                    name="person-outline"
                    size={16}
                    color="#0A5EA8"
                  />
  
                  <Text style={styles.text}>
  
                    {item.rol}
  
                  </Text>
  
                </View>
  
              </View>
  
            </View>
          )}
        />
  
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
  
    safeArea: {
      flex: 1,
      backgroundColor: "#F4F8FC",
    },
  
    // 🔵 LOADING
    loadingContainer: {
  
      flex: 1,
  
      justifyContent: "center",
  
      alignItems: "center",
  
      backgroundColor: "#F4F8FC",
    },
  
    loadingText: {
      marginTop: 15,
      fontSize: 16,
      color: "#003B70",
      fontWeight: "600",
    },
  
    // 🔵 HEADER
    header: {
  
      backgroundColor: "#003B70",
  
      paddingHorizontal: 20,
  
      paddingTop: 25,
  
      paddingBottom: 30,
  
      borderBottomLeftRadius: 35,
  
      borderBottomRightRadius: 35,
  
      flexDirection: "row",
  
      alignItems: "center",
  
      shadowColor: "#000",
  
      shadowOffset: {
        width: 0,
        height: 4,
      },
  
      shadowOpacity: 0.12,
  
      shadowRadius: 6,
  
      elevation: 8,
    },
  
    // 🔙 BOTÓN
    backButton: {
  
      width: 50,
  
      height: 50,
  
      borderRadius: 16,
  
      backgroundColor: "#FFFFFF",
  
      justifyContent: "center",
  
      alignItems: "center",
  
      marginRight: 15,
    },
  
    // 🔵 TEXTO HEADER
    headerText: {
      flex: 1,
    },
  
    title: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "bold",
    },
  
    subtitle: {
      color: "#D7E8F7",
      marginTop: 5,
      fontSize: 14,
    },
  
    // 🔵 ICONO
    iconBox: {
  
      width: 62,
  
      height: 62,
  
      borderRadius: 20,
  
      backgroundColor: "#FFFFFF",
  
      justifyContent: "center",
  
      alignItems: "center",
    },
  
    // 🔵 LISTA
    listContainer: {
      padding: 20,
      paddingBottom: 30,
    },
  
    // 🔵 CARD
    card: {
  
      flexDirection: "row",
  
      backgroundColor: "#FFFFFF",
  
      borderRadius: 25,
  
      padding: 18,
  
      marginBottom: 18,
  
      borderWidth: 1,
  
      borderColor: "#DCE8F5",
  
      shadowColor: "#000",
  
      shadowOffset: {
        width: 0,
        height: 2,
      },
  
      shadowOpacity: 0.08,
  
      shadowRadius: 4,
  
      elevation: 4,
    },
  
    // 🔵 FOTO
    avatar: {
  
      width: 85,
  
      height: 85,
  
      borderRadius: 22,
  
      marginRight: 15,
    },
  
    // 🔵 INFO
    info: {
      flex: 1,
      justifyContent: "center",
    },
  
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#0F172A",
    },
  
    speciality: {
      marginTop: 4,
      fontSize: 14,
      color: "#0A5EA8",
      fontWeight: "600",
    },
  
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
  
    text: {
      marginLeft: 6,
      fontSize: 13,
      color: "#64748B",
    },
  
    // 🔵 VACÍO
    emptyContainer: {
  
      justifyContent: "center",
  
      alignItems: "center",
  
      marginTop: 80,
    },
  
    emptyText: {
      marginTop: 15,
      fontSize: 16,
      color: "#64748B",
      fontWeight: "600",
    },
  
  });