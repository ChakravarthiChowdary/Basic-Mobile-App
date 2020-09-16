import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { colors } from "../constants/Colors";

const TextInputComp = ({ style, placeholder, text, textChangedHandler }) => {
  return (
    <TextInput
      style={{ ...styles.textInput, ...style }}
      placeholder={placeholder}
      value={text}
      onChangeText={textChangedHandler}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: colors.primary,
    padding: 5,
    marginBottom: 10,
  },
});

export default TextInputComp;
