import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10
  },
  text: {
    color: "white",
    fontWeight: "bold"
  }
});