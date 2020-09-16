import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loading = ({ style }) => {
  return (
    <View style={{ ...styles.homeActivityView, ...style }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  homeActivityView: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
