import React from "react";
import { StyleSheet, Button, TouchableHighlight } from "react-native";

const ButtonComponent = ({ style, title, color, onPress }) => {
  return (
    <TouchableHighlight style={{ ...styles.buttonStyle, ...style }}>
      <Button title={title} color={color} onPress={onPress} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 35,
    borderRadius: 5,
    width: 80,
    overflow: "hidden",
  },
});

export default ButtonComponent;
