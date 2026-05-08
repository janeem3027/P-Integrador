import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

export default function CustomInput(props) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={colors.gray}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  }
});