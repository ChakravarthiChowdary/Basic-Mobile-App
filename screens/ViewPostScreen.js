import React, { Fragment, useCallback, useEffect } from "react";
import { Dimensions, StyleSheet, View, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/Text";
import HeaderBtn from "../components/HeaderButton";
import Separator from "../components/Seperator";
import { deletePost, getPosts } from "../store/actions/actions";
import Loading from "../components/Loading";
import Comment from "../components/Comment";
import Error from "../components/Error";

const ViewPostScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const comments = useSelector((state) => state.comments);
  const error = useSelector((state) => state.commentsError);

  const loadComments = useCallback(() => {
    dispatch(getPosts(1, post.id));
  }, [dispatch]);

  const deleteClickedHandler = () => {
    navigation.goBack();
    dispatch(deletePost(post.id));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item
            title="checkmark"
            iconName="md-checkmark-circle-outline"
            onPress={() => navigation.goBack()}
          />
          <Item
            title="delete"
            iconName="md-trash"
            onPress={deleteClickedHandler}
          />
        </HeaderButtons>
      ),
    });
    loadComments();
  }, []);

  return (
    <View style={styles.viewPostOuterView}>
      <Text style={{ marginBottom: 10 }}>Title : {post.title}</Text>
      <Separator />
      <Text style={{ marginBottom: 10 }}>Body : {post.body}</Text>
      <Separator />
      {loading ? (
        <Loading style={{ height: "50%" }} />
      ) : !error ? (
        <Fragment>
          <Text style={{ fontFamily: "Roboto-bold" }}>Comments</Text>
          <Separator />
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => <Comment comment={itemData.item} />}
          />
        </Fragment>
      ) : (
        <Error
          error={error}
          style={{ height: "50%" }}
          tryAgainClickedHandler={loadComments}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewPostOuterView: {
    margin: 10,
    height: Dimensions.get("window").height * 0.865,
    padding: 10,
  },
  viewPostTitle: {},
});

export const viewPostScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.post.title.slice(0, 15),
  };
};

export default ViewPostScreen;
