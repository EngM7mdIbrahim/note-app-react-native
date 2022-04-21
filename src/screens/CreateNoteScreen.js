import React, { useContext, useReducer, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import {
  defaultBackground,
  defaultBodyStyle,
  defaultTitleStyle,
} from "../theme/blackTheme";

let addPostGlobal = {};

//state === {id: number, title: string, description: string}
//action === {type: 'change_title' || 'change_description',payload: string}
const postReducer = (state, action) => {
  switch (action.type) {
    case "change_title":
      return { ...state, title: action.payload };

    case "change_description":
      return { ...state, description: action.payload };
    default:
      return state;
  }
};

const CreateNoteScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, addPost, editPost } = useContext(BlogContext);
  const date = new Date();
  const initPostState = id
    ? state.find((currentPost) => currentPost.id === id)
    : {
        title: "",
        id: Math.floor(Math.random() * 9999),
        description: "",
        date: date,
      };
  const [post, dispatch] = useReducer(postReducer, initPostState);
  addPostGlobal = id
    ? () => {
        editPost(post, () => {
          navigation.popToTop();
        });
      }
    : () => {
        addPost(post, () => {
          navigation.popToTop();
        });
      };

  return (
    <View style={styles.containerStyle}>
      <TextInput
        placeholderTextColor={"gray"}
        style={styles.titleStyle}
        placeholder="Title"
        value={post.title}
        onChangeText={(newTitle) => {
          dispatch({ type: "change_title", payload: newTitle });
        }}
      />
      <TextInput
        placeholderTextColor={"gray"}
        multiline={true}
        style={styles.bodyStyle}
        placeholder="Description"
        value={post.description}
        onChangeText={(newDesc) =>
          dispatch({ type: "change_description", payload: newDesc })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    ...defaultBackground,
  },
  titleStyle: {
    ...defaultTitleStyle,
  },
  bodyStyle: {
    ...defaultBodyStyle,
    flex: 1,
    paddingTop: 0,
  },
});

CreateNoteScreen.navigationOptions = () => {
  return {
    title: "Create Note",
    headerRight: () => (
      <Button
        title="Done"
        onPress={() => {
          addPostGlobal();
        }}
      />
    ),
  };
};
export default CreateNoteScreen;
