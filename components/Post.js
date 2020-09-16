import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import Text from "./Text";
import { colors } from "../constants/Colors";
import Button from "./Button";
import { deletePost } from "../store/actions/actions";

const Post = ({ post, navigation }) => {
  const dispatch = useDispatch();

  const deleteClickedHandler = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <View style={styles.postOuterView}>
      <View style={styles.postInnerView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewPost", { post: post })}
        >
          <View style={styles.postTextView}>
            <Text style={{ fontFamily: "Roboto-bold" }}>Id : </Text>
            <Text>{post.id}</Text>
          </View>
          <View style={styles.postTextView}>
            <Text style={{ fontFamily: "Roboto-bold" }}>Title :</Text>
            <Text> {post.title.slice(0, 15)}</Text>
          </View>
          <Text>Body :{post.body.slice(0, 80)}</Text>
        </TouchableOpacity>
        <View style={styles.postButtonView}>
          <Button
            title="View"
            color={colors.secondary}
            onPress={() =>
              navigation.navigate("ViewPost", {
                post: post,
              })
            }
          />
          <Button
            title="Delete"
            color={colors.danger}
            onPress={deleteClickedHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postOuterView: {
    height: Dimensions.get("window").height / 3,
    elevation: 5,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
  },
  postInnerView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  postButtonView: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTextView: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Post;
