import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import HeaderBtn from "../components/HeaderButton";
import { getPosts } from "../store/actions/actions";
import Post from "../components/Post";
import TextInput from "../components/TextInput";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { colors } from "../constants/Colors";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.postsError);
  const [searchText, setSearchText] = useState("");

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const loadPosts = useCallback(() => {
    dispatch(getPosts(0, 0));
  }, [dispatch]);

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} tryAgainClickedHandler={loadPosts} />;
  }

  const searchChangedHandler = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.homeOuterView}>
      <TextInput
        placeholder="Search posts"
        text={searchText}
        textChangedHandler={searchChangedHandler}
      />
      <FlatList
        data={filteredPosts}
        renderItem={(itemData) => (
          <Post post={itemData.item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeOuterView: {
    margin: 10,
  },
  homeTextInput: {
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: colors.primary,
    padding: 5,
    marginBottom: 10,
  },
});

export const homeScreenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          title="menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          title="menu"
          iconName="md-add"
          onPress={() => navData.navigation.navigate("AddPost")}
        />
      </HeaderButtons>
    ),
  };
};

export default Home;
