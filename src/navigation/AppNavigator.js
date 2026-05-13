import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

// Auth
import ConfirmTokenScreen from "../screens/ConfirmTokenScreen";
import LoginScreen from "../screens/LoginScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";

// App
import AsistenciaAdminScreen from "../screens/AsistenciaAdminScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import DocentesScreen from "../screens/DocentesScreen";
import HomeScreen from "../screens/HomeScreen";
import MinutaScreen from "../screens/MinutaScreen";
import NotificacionesScreen from "../screens/NotificacionesScreen";
import PaseListaScreen from "../screens/PaseListaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import PlanTrabajoScreen from "../screens/PlanTrabajoScreen";
import ReportesScreen from "../screens/ReportesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
            <Stack.Screen name="ConfirmToken" component={ConfirmTokenScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Calendario" component={CalendarioScreen} />
            <Stack.Screen name="PlanTrabajo" component={PlanTrabajoScreen} />
            <Stack.Screen name="Reportes" component={ReportesScreen} />
            <Stack.Screen name="Minuta" component={MinutaScreen} />
            <Stack.Screen name="Docentes" component={DocentesScreen} />
            <Stack.Screen name="PaseLista" component={PaseListaScreen} />
            <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />

            {/* 👇 ESTE ES EL IMPORTANTE */}
            <Stack.Screen
              name="AsistenciaAdmin"
              component={AsistenciaAdminScreen}
            />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}