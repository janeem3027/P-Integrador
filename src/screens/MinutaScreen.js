import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function MinutaScreen({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [lugar, setLugar] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tipoSesion, setTipoSesion] = useState("");
  const [numeroSesion, setNumeroSesion] = useState("");
  const [ciclo, setCiclo] = useState("");

  const [lectura, setLectura] = useState("");
  const [acuerdos, setAcuerdos] = useState("");
  const [avisos, setAvisos] = useState("");

  const [archivo, setArchivo] = useState(null);

  const [docenteNombre, setDocenteNombre] = useState("");
  const [docentes, setDocentes] = useState([]);

  const [presidenteAcademia, setPresidenteAcademia] = useState("");
  const [secretariaAcademia, setSecretariaAcademia] = useState("");
  const [jefeDivision, setJefeDivision] = useState("");

  const seleccionarArchivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setArchivo(result.assets[0]);
        Alert.alert("Archivo agregado correctamente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar el archivo");
    }
  };

  const guardarMinuta = () => {
    if (!titulo.trim() || !lugar.trim() || !fecha.trim()) {
      Alert.alert("Error", "Completa los campos obligatorios");
      return;
    }

    Alert.alert("Éxito", "Minuta guardada correctamente");
  };

  const agregarDocente = () => {
    if (!docenteNombre.trim()) {
      Alert.alert("Error", "Escribe el nombre del docente");
      return;
    }

    setDocentes([...docentes, docenteNombre.trim()]);
    setDocenteNombre("");
  };

  const eliminarDocente = (index) => {
    const nuevaLista = docentes.filter((_, i) => i !== index);
    setDocentes(nuevaLista);
  };

  const generarPDF = async () => {
    if (!titulo.trim() || !lugar.trim() || !fecha.trim()) {
      Alert.alert("Error", "Completa título, lugar y fecha antes de exportar");
      return;
    }

    const listaDocentesTexto =
      docentes.length > 0
        ? docentes.map((docente) => `<b>${docente}</b>`).join(", ")
        : "<b>Sin docentes registrados</b>";

    const filasDocentes =
      docentes.length > 0
        ? docentes
            .map(
              (docente) => `
                <tr>
                  <td><b>${docente}</b></td>
                  <td></td>
                </tr>
              `
            )
            .join("")
        : `
          <tr>
            <td><b>Sin docentes registrados</b></td>
            <td></td>
          </tr>
        `;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Minuta de Academia</title>

      <style>
        @page {
          size: letter;
          margin: 35px 45px;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: "Times New Roman", serif;
          color: #111827;
          font-size: 13.5px;
          line-height: 1.45;
          margin: 0;
          padding: 0;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          padding-bottom: 70px;
          page-break-after: always;
        }

        .page:last-child {
          page-break-after: auto;
        }

        .header {
          width: 100%;
          margin-bottom: 24px;
          border-bottom: 2px solid #1d4ed8;
          padding-bottom: 10px;
        }

        .logos {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          font-family: Arial, sans-serif;
          font-size: 10.5px;
          color: #1e3a8a;
          font-weight: bold;
        }

        .logo-box {
          width: 19%;
          text-align: center;
          border-bottom: 1px solid #93c5fd;
          padding-bottom: 6px;
        }

        .institution {
          text-align: right;
          font-size: 13px;
          font-weight: bold;
          color: #1e293b;
        }

        .division {
          text-align: right;
          font-size: 12px;
          color: #334155;
        }

        .document-title {
          text-align: center;
          margin-top: 20px;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
          color: #1e3a8a;
          text-transform: uppercase;
        }

        .date {
          text-align: right;
          margin-top: 22px;
          margin-bottom: 22px;
          font-size: 14.5px;
        }

        .blue {
          color: #1d4ed8;
          font-weight: bold;
        }

        .italic {
          font-style: italic;
        }

        .bold {
          font-weight: bold;
        }

        .justify {
          text-align: justify;
        }

        .section-title {
          font-weight: bold;
          font-size: 14px;
          margin-top: 20px;
          margin-bottom: 8px;
          text-transform: uppercase;
          color: #1e3a8a;
          border-left: 4px solid #1d4ed8;
          padding-left: 8px;
        }

        .agreement {
          margin-left: 35px;
          text-align: justify;
          margin-top: 13px;
          margin-bottom: 16px;
          background-color: #f8fbff;
          border-left: 3px solid #93c5fd;
          padding: 8px 10px;
        }

        .content-text {
          white-space: pre-line;
          text-align: justify;
          margin-bottom: 15px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        th {
          border: 1px solid #1e3a8a;
          padding: 8px;
          text-align: center;
          font-size: 13.5px;
          font-weight: bold;
          background-color: #dbeafe;
          color: #1e3a8a;
        }

        td {
          border: 1px solid #1e3a8a;
          padding: 9px;
          font-size: 13.5px;
          height: 36px;
        }

        .firma-table td:nth-child(1) {
          width: 60%;
        }

        .firma-table td:nth-child(2) {
          width: 40%;
        }

        .signatures {
          display: flex;
          justify-content: space-between;
          margin-top: 55px;
          text-align: center;
          font-size: 13px;
        }

        .signature-box {
          width: 30%;
        }

        .line {
          border-top: 1px solid #1e3a8a;
          margin-bottom: 5px;
        }

        .footer {
          position: fixed;
          bottom: 10px;
          left: 45px;
          right: 45px;
          text-align: center;
          font-size: 10px;
          border-top: 4px solid #1d4ed8;
          padding-top: 5px;
          color: #334155;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .page {
            page-break-after: always;
          }

          .page:last-child {
            page-break-after: auto;
          }
        }
      </style>
    </head>

    <body>
      <div class="page">
        <div class="header">
          <div class="logos">
            <div class="logo-box">Educación</div>
            <div class="logo-box">TecNM</div>
            <div class="logo-box">ITSOEH</div>
            <div class="logo-box">Educación Pública</div>
            <div class="logo-box">Hidalgo</div>
          </div>

          <div class="institution">
            Instituto Tecnológico Superior del Occidente del Estado de Hidalgo
          </div>
          <div class="division">
            División de Ingeniería en Sistemas Computacionales
          </div>
        </div>

        <div class="document-title">
          ${titulo || "Minuta de Academia"}
        </div>

        <div class="date">
          ${lugar || "Mixquiahuala de Juárez, Hidalgo"}, a 
          <span class="blue">${fecha}</span>
        </div>

        <p class="justify">
          En ${lugar || "Mixquiahuala de Juárez, Hidalgo"}, en las instalaciones del
          Instituto Tecnológico Superior del Occidente del Estado de Hidalgo se llevó a cabo
          el día <span class="blue">${fecha}</span> a las 
          <span class="blue">${hora || "____ horas"}</span> la Sesión 
          <span class="blue italic">${tipoSesion || "Ordinaria"}</span> de Academia No.
          <span class="blue">${numeroSesion || "__"}</span> de la División de Ingeniería en Sistemas Computacionales
          del ciclo <span class="blue">${ciclo || "enero - junio 2026"}</span>, efectuándose de la siguiente manera:
        </p>

        <div class="section-title">
          1. Lista de asistencia y declaración de quórum legal
        </div>

        <p class="justify">
          Se inicia la sesión estando presentes los siguientes integrantes:
          ${listaDocentesTexto}.
        </p>

        <div class="agreement">
          <b>ACUERDO No. SO-01 ACSIS/01:</b>
          Con fundamento en el Manual Normativo para la Integración y Operación de las Academias,
          se declara Quórum Legal en la Sesión 
          <span class="blue italic">${tipoSesion || "Ordinaria"}</span> No.
          <span class="blue">${numeroSesion || "__"}</span> de la Academia de 
          <b><i>Ingeniería en Sistemas Computacionales</i></b> adscrita a la División de
          <b><i>Ingeniería en Sistemas Computacionales</i></b> del ITSOEH.
        </div>

        <div class="section-title">
          2. Lectura y aprobación del orden del día
        </div>

        <p class="justify">
          Una vez que ha sido revisada y de no haber observaciones a la misma se toma el siguiente acuerdo:
        </p>

        <div class="agreement">
          <b>ACUERDO No. SO-01 ACSIS/02:</b>
          Con fundamento en el Manual Normativo para la Integración y Operación de las Academias,
          se da por aprobado el Orden del Día, correspondiente a la Sesión 
          <span class="blue italic">${tipoSesion || "Ordinaria"}</span> No.
          <span class="blue">${numeroSesion || "__"}</span>, quedando de la siguiente forma:
        </div>

        <div class="content-text">
          ${lectura || "Sin información registrada."}
        </div>

        <div class="section-title">
          3. Acuerdos de la sesión
        </div>

        <div class="content-text">
          ${acuerdos || "No se registraron acuerdos adicionales durante la sesión."}
        </div>

        <div class="section-title">
          4. Avisos del jefe de carrera
        </div>

        <div class="content-text">
          ${avisos || "No se registraron avisos adicionales durante la sesión."}
        </div>
      </div>

      <div class="page">
        <div class="header">
          <div class="logos">
            <div class="logo-box">Educación</div>
            <div class="logo-box">TecNM</div>
            <div class="logo-box">ITSOEH</div>
            <div class="logo-box">Educación Pública</div>
            <div class="logo-box">Hidalgo</div>
          </div>

          <div class="institution">
            Instituto Tecnológico Superior del Occidente del Estado de Hidalgo
          </div>
          <div class="division">
            División de Ingeniería en Sistemas Computacionales
          </div>
        </div>

        <div class="document-title">
          Integrantes de la Academia
        </div>

        <p><b><i>Lista de Asistencia</i></b></p>

        <table class="firma-table">
          <tr>
            <th>Nombre Completo</th>
            <th>Firma</th>
          </tr>
          ${filasDocentes}
        </table>

        <p class="justify">
          Estas firmas pertenecen a los integrantes de la 
          <b>Academia de Ingeniería en Sistemas Computacionales</b> referente a la reunión de trabajo
          en la cual se trataron los puntos previstos en el Orden del Día de la Sesión
          <span class="blue bold">${tipoSesion || "Ordinaria"} No. ${
      numeroSesion || "__"
    }</span>
          celebrada el día <span class="blue">${fecha}</span>.
        </p>

        <div class="signatures">
          <div class="signature-box">
            <div class="line"></div>
            Presidente de Academia<br />
            ${presidenteAcademia || "Nombre del presidente"}
          </div>

          <div class="signature-box">
            <div class="line"></div>
            Secretaria de Academia<br />
            ${secretariaAcademia || "Nombre de la secretaria"}
          </div>

          <div class="signature-box">
            <div class="line"></div>
            Vo. Bo.<br />
            Jefe de División<br />
            ${jefeDivision || "Nombre del jefe de división"}
          </div>
        </div>
      </div>

      <div class="footer">
        Carretera Mixquiahuala-Tula km. 2.5, Paseo del Agrarismo No. 200, Mixquiahuala de Juárez, Hgo.
      </div>
    </body>
    </html>
    `;

    try {
      if (Platform.OS === "web") {
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const ventana = window.open(url, "_blank");

        if (!ventana) {
          Alert.alert("Error", "No se pudo abrir la vista del PDF");
          return;
        }

        setTimeout(() => {
          ventana.focus();
          ventana.print();
        }, 1000);

        return;
      }

      const file = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(file.uri);
    } catch (error) {
      Alert.alert("Error", "No se pudo generar el PDF");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
        <Text style={styles.textBtn}>Regresar</Text>
      </TouchableOpacity>

      <View style={styles.headerScreen}>
        <Text style={styles.screenTitle}>Minuta de Academia</Text>
        <Text style={styles.screenSubtitle}>
          Registro y generación de documento académico
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos generales</Text>

          <TextInput
            style={styles.input}
            placeholder="Título de la minuta"
            placeholderTextColor="#64748b"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Lugar, ejemplo: Mixquiahuala de Juárez, Hidalgo"
            placeholderTextColor="#64748b"
            value={lugar}
            onChangeText={setLugar}
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha, ejemplo: 21 de enero de 2026"
            placeholderTextColor="#64748b"
            value={fecha}
            onChangeText={setFecha}
          />

          <TextInput
            style={styles.input}
            placeholder="Hora, ejemplo: 11:00 horas"
            placeholderTextColor="#64748b"
            value={hora}
            onChangeText={setHora}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo de sesión, ejemplo: Ordinaria"
            placeholderTextColor="#64748b"
            value={tipoSesion}
            onChangeText={setTipoSesion}
          />

          <TextInput
            style={styles.input}
            placeholder="Número de sesión, ejemplo: 01"
            placeholderTextColor="#64748b"
            value={numeroSesion}
            onChangeText={setNumeroSesion}
          />

          <TextInput
            style={styles.input}
            placeholder="Ciclo, ejemplo: enero - junio 2026"
            placeholderTextColor="#64748b"
            value={ciclo}
            onChangeText={setCiclo}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lectura y aprobación del día</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe los puntos del orden del día"
            placeholderTextColor="#64748b"
            value={lectura}
            onChangeText={setLectura}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Acuerdos</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe los acuerdos de la sesión"
            placeholderTextColor="#64748b"
            value={acuerdos}
            onChangeText={setAcuerdos}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Avisos del jefe de carrera</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe los avisos importantes"
            placeholderTextColor="#64748b"
            value={avisos}
            onChangeText={setAvisos}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lista de asistencia</Text>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputDocente]}
              placeholder="Nombre completo del docente"
              placeholderTextColor="#64748b"
              value={docenteNombre}
              onChangeText={setDocenteNombre}
            />

            <TouchableOpacity style={styles.btnAgregar} onPress={agregarDocente}>
              <Text style={styles.textBtn}>Agregar</Text>
            </TouchableOpacity>
          </View>

          {docentes.map((docente, index) => (
            <View key={index} style={styles.docenteItem}>
              <Text style={styles.docenteText}>{docente}</Text>

              <TouchableOpacity onPress={() => eliminarDocente(index)}>
                <Text style={styles.eliminarText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Firmas finales</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del presidente de academia"
            placeholderTextColor="#64748b"
            value={presidenteAcademia}
            onChangeText={setPresidenteAcademia}
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre de la secretaria de academia"
            placeholderTextColor="#64748b"
            value={secretariaAcademia}
            onChangeText={setSecretariaAcademia}
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre del jefe de división"
            placeholderTextColor="#64748b"
            value={jefeDivision}
            onChangeText={setJefeDivision}
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.btnSecondary} onPress={seleccionarArchivo}>
          <Text style={styles.textBtn}>Agregar archivo</Text>
        </TouchableOpacity>

        {archivo && (
          <Text style={styles.fileText}>Archivo agregado: {archivo.name}</Text>
        )}

        <TouchableOpacity style={styles.btnPrimary} onPress={guardarMinuta}>
          <Text style={styles.textBtn}>Guardar información</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPdf} onPress={generarPDF}>
          <Text style={styles.textBtn}>Generar PDF</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef4ff",
  },

  content: {
    padding: 22,
    paddingBottom: 45,
  },

  btnBack: {
    backgroundColor: "#1e3a8a",
    padding: 13,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  headerScreen: {
    backgroundColor: "#1e3a8a",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },

  screenTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },

  screenSubtitle: {
    color: "#dbeafe",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  formContainer: {
    backgroundColor: "#eef4ff",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#dbeafe",
    paddingBottom: 8,
  },

  input: {
    backgroundColor: "#f8fbff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    fontSize: 15,
    color: "#111827",
  },

  textArea: {
    minHeight: 125,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  inputDocente: {
    flex: 1,
    marginBottom: 0,
  },

  btnAgregar: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  docenteItem: {
    backgroundColor: "#eff6ff",
    padding: 13,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  docenteText: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "600",
  },

  eliminarText: {
    color: "#dc2626",
    fontWeight: "700",
  },

  buttonsContainer: {
    marginTop: 12,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "#bfdbfe",
  },

  btnPrimary: {
    backgroundColor: "#1d4ed8",
    padding: 15,
    borderRadius: 10,
    marginTop: 13,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  btnSecondary: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  btnPdf: {
    backgroundColor: "#0f172a",
    padding: 15,
    borderRadius: 10,
    marginTop: 13,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },

  textBtn: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  fileText: {
    marginTop: 10,
    marginBottom: 5,
    color: "#334155",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});