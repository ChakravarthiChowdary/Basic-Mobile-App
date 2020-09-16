import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import ViewPostScreen from "../screens/ViewPostScreen";
import AddPostScreen from "../screens/AddPostScreen";
//screen specific options
import { homeScreenOptions } from "../screens/Home";
import { addPostScreenOptions } from "../screens/AddPostScreen";
import { viewPostScreenOptions } from "../screens/ViewPostScreen";

import { colors } from "../constants/Colors";

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: colors.primary,
  },
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Home" component={Home} options={homeScreenOptions} />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={addPostScreenOptions}
      />
      <Stack.Screen
        name="ViewPost"
        component={ViewPostScreen}
        options={viewPostScreenOptions}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={defaultNavOptions}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
