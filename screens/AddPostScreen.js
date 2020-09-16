import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Text from "../components/Text";
import HeaderBtn from "../components/HeaderButton";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../store/actions/actions";

const AddPostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item title="menu" iconName="md-save" onPress={addClickedHandler} />
        </HeaderButtons>
      ),
    });
  }, []);

  const inputChangedHandler = (text, field) => {
    if (errorMsg) setErrorMsg(null);
    if (field === "title") setTitle(text);
    else setBody(text);
  };

  const addClickedHandler = () => {
    if (title === "" || body === "") setErrorMsg("Please fill all fields!");
    else {
      dispatch(addNewPost({ title, body }));
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.addPostView}>
        <View style={styles.addPostOuterView}>
          <Text style={{ fontSize: 23 }}>Add your post</Text>
          <View style={styles.addPostInnerView}>
            <TextInput
              placeholder="Title"
              style={{ marginVertical: 10 }}
              text={title}
              textChangedHandler={(text) => inputChangedHandler(text, "title")}
            />
            <TextInput
              placeholder="Body"
              style={{ marginVertical: 10 }}
              text={body}
              textChangedHandler={(text) => inputChangedHandler(text, "body")}
            />
          </View>
          <View style={styles.addPostButtonsView}>
            <Button
              title="Discard"
              color={colors.danger}
              onPress={() => navigation.goBack()}
            />
            {!loading ? (
              <Button
                title="Add"
                color={colors.primary}
                onPress={addClickedHandler}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>

        <Text style={{ color: colors.danger, fontSize: 16 }}>{errorMsg}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  addPostView: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("screen").height - 170,
    alignItems: "center",
    margin: 20,
  },
  addPostInnerView: {
    width: "100%",
  },
  addPostOuterView: {
    elevation: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  addPostButtonsView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    justifyContent: "space-around",
  },
});

export const addPostScreenOptions = (navData) => {
  return {
    headerTitle: "Add Post",
  };
};

export default AddPostScreen;
