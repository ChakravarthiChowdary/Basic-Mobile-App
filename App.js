import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import rootReducer from "./store/reducer/reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
