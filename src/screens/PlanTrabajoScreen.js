// PlanTrabajoScreen.js

import React, { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function PlanTrabajoScreen() {

  // DATOS
  const [fecha, setFecha] = useState("");
  const [docente, setDocente] = useState("");
  const [periodo, setPeriodo] = useState("");

  // ACTIVIDAD 1
  const [actividad1, setActividad1] = useState("");
  const [resultado1, setResultado1] = useState("");
  const [fecha1, setFecha1] = useState("");
  const [observacion1, setObservacion1] = useState("");
  const [status1, setStatus1] = useState("");

  // ACTIVIDAD 2
  const [actividad2, setActividad2] = useState("");
  const [resultado2, setResultado2] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [observacion2, setObservacion2] = useState("");
  const [status2, setStatus2] = useState("");

  // EXTRA
  const [evidencias, setEvidencias] = useState("");
  const [justificacion, setJustificacion] = useState("");

  // PDF
  const generarPDF = async () => {

    try {

      const html = `

      <html>

      <body
        style="
          padding:40px;
          font-family: Arial;
          color:#111827;
        "
      >

        <div style="text-align:center;">

          <h2>
            Instituto Tecnológico Superior del Occidente del Estado de Hidalgo
          </h2>

          <h3>
            División de Ingeniería en Sistemas Computacionales
          </h3>

        </div>

        <br>

        <div style="text-align:right;">
          Mixquiahuala de Juárez, Hgo. ${fecha}
        </div>

        <br>

        <div style="text-align:right;">
          <strong>
            Asunto:
          </strong>

          Informe de actividades y/o comisiones de academia
        </div>

        <br><br>

        <div>

          <strong>
            Mtra. Lorena Mendoza Guzmán
          </strong>

          <br>

          Presidenta de Academia

          <br>

          Presente

        </div>

        <br><br>

        <div style="text-align:justify; line-height:28px;">

          La que suscribe

          <strong>
            ${docente}
          </strong>

          docente del programa educativo de Ingeniería en Sistemas
          Computacionales informa que durante el periodo

          <strong>
            ${periodo}
          </strong>

          se desarrollaron las siguientes actividades y/o
          comisiones de academia.

        </div>

        <br><br>

        <table
          border="1"
          cellspacing="0"
          cellpadding="10"
          width="100%"
        >

          <tr
            style="
              background:#DBEAFE;
              text-align:center;
            "
          >

            <th>
              Actividad
            </th>

            <th>
              Resultados
            </th>

            <th>
              Fecha
            </th>

            <th>
              Observaciones
            </th>

            <th>
              Status
            </th>

          </tr>

          <tr>

            <td>
              ${actividad1}
            </td>

            <td>
              ${resultado1}
            </td>

            <td>
              ${fecha1}
            </td>

            <td>
              ${observacion1}
            </td>

            <td>
              ${status1}
            </td>

          </tr>

          <tr>

            <td>
              ${actividad2}
            </td>

            <td>
              ${resultado2}
            </td>

            <td>
              ${fecha2}
            </td>

            <td>
              ${observacion2}
            </td>

            <td>
              ${status2}
            </td>

          </tr>

        </table>

        <br><br>

        <div
          style="
            border:1px solid #CBD5E1;
            padding:15px;
          "
        >

          <h3 style="text-align:center;">
            Evidencia fotográfica y/o documental
          </h3>

          <p>
            ${evidencias}
          </p>

        </div>

        <br><br>

        <div
          style="
            border:1px solid #CBD5E1;
            padding:15px;
          "
        >

          <h3 style="text-align:center;">
            Justificación
          </h3>

          <p>
            ${justificacion}
          </p>

        </div>

        <br><br><br>

        <div style="text-align:center;">

          <strong>
            ATENTAMENTE
          </strong>

          <br><br><br><br>

          _______________________________

          <br>

          ${docente}

          <br>

          Docente de la División de Ingeniería
          en Sistemas Computacionales

        </div>

      </body>

      </html>

      `;

      // GENERAR
      const { uri } = await Print.printToFileAsync({
        html,
      });

      // COMPARTIR
      await Sharing.shareAsync(uri);

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo generar el PDF"
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      {/* DOCUMENTO */}
      <View style={styles.document}>

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Instituto Tecnológico Superior del Occidente del Estado de Hidalgo
          </Text>

          <Text style={styles.headerSubtitle}>
            División de Ingeniería en Sistemas Computacionales
          </Text>

        </View>

        {/* FECHA */}
        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={fecha}
          onChangeText={setFecha}
        />

        {/* DOCENTE */}
        <TextInput
          style={styles.input}
          placeholder="Nombre del docente"
          value={docente}
          onChangeText={setDocente}
        />

        {/* PERIODO */}
        <TextInput
          style={styles.input}
          placeholder="Periodo"
          value={periodo}
          onChangeText={setPeriodo}
        />

        {/* TABLA */}
        <Text style={styles.sectionTitle}>
          Actividad 1
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Actividad"
          value={actividad1}
          onChangeText={setActividad1}
        />

        <TextInput
          style={styles.input}
          placeholder="Resultados"
          value={resultado1}
          onChangeText={setResultado1}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={fecha1}
          onChangeText={setFecha1}
        />

        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={observacion1}
          onChangeText={setObservacion1}
        />

        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status1}
          onChangeText={setStatus1}
        />

        {/* ACTIVIDAD 2 */}
        <Text style={styles.sectionTitle}>
          Actividad 2
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Actividad"
          value={actividad2}
          onChangeText={setActividad2}
        />

        <TextInput
          style={styles.input}
          placeholder="Resultados"
          value={resultado2}
          onChangeText={setResultado2}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={fecha2}
          onChangeText={setFecha2}
        />

        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={observacion2}
          onChangeText={setObservacion2}
        />

        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status2}
          onChangeText={setStatus2}
        />

        {/* EVIDENCIAS */}
        <Text style={styles.sectionTitle}>
          Evidencias
        </Text>

        <TextInput
          style={styles.textArea}
          multiline
          value={evidencias}
          onChangeText={setEvidencias}
        />

        {/* JUSTIFICACION */}
        <Text style={styles.sectionTitle}>
          Justificación
        </Text>

        <TextInput
          style={styles.textArea}
          multiline
          value={justificacion}
          onChangeText={setJustificacion}
        />

        {/* BOTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={generarPDF}
        >

          <Text style={styles.buttonText}>
            Generar PDF
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },

  document: {
    backgroundColor: "white",
    margin: 15,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  headerSubtitle: {
    marginTop: 5,
    color: "#6B7280",
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  textArea: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 15,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    color: "#1E3A8A",
  },

  button: {
    backgroundColor: "#1E3A8A",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

});