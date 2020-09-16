import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "./Text";
import Separator from "./Seperator";

const Comment = ({ comment }) => {
  return (
    <View style={styles.commentOuterView}>
      <Text>Name : {comment.name}</Text>
      <Separator />
      <Text>Email : {comment.email}</Text>
      <Separator />
      <Text>Body : {comment.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentOuterView: {
    elevation: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
  },
});

export default Comment;
