import React, { useContext, useState, useEffect } from "react";
import { Keyboard, View, StyleSheet, Text } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ListRenderer from "../components/ListRenderer";
import SearchBar from "../components/SearchBar";
import { isBlack, color, headerRightColor } from "../theme/colors";
import FullPageIcon from "../components/FullPageIcon";
import {
  defaultIconStyle,
  defaultBackground,
  defaultMainIconStyle,
  defaultTitleStyle,
} from "../theme/blackTheme";

const IndexScreen = ({ navigation }) => {
  const { state, deletePost } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (state.length === 0) {
    return (
      <FullPageIcon
        keyboardOpen={isKeyboardVisible}
        isBlack={isBlack}
        constructIcon={(color) => (
          <Entypo
            name="new-message"
            style={{ ...defaultMainIconStyle, color }}
          />
        )}
        title="No Posts to show!"
      />
    );
  }
  return (
    <View style={styles.containerStyle}>
      <Text style={{...styles.titleStyle,color}}>Notes</Text>
      <SearchBar
        isBlack={isBlack}
        searchTerm={searchTerm}
        onSearchTextChange={setSearchTerm}
        onSearchTextSubmitted={() => {}}
      />
      <ListRenderer
        isBlack={isBlack}
        data={state}
        searchTerm={searchTerm}
        noResultComponent={
          <FullPageIcon
            keyboardOpen={isKeyboardVisible}
            isBlack={isBlack}
            constructIcon={(color) => (
              <Entypo
                name="bucket"
                style={{ ...defaultMainIconStyle, color }}
              />
            )}
            title="Nothing matches!"
          />
        }
        onItemTouch={(id) => navigation.navigate("BlogDetail", { id: id })}
        onDeleteTouch={(id) => deletePost(id)}
      />
      <Text>It works!</Text>
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateNote");
        }}
      >
        <Entypo
          name="add-to-list"
          style={{ ...styles.iconStyle, color: headerRightColor }}
        />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  iconStyle: {
    ...defaultIconStyle,
  },
  containerStyle: {
    ...defaultBackground,
  },
  titleStyle: {
    ...defaultTitleStyle,
  marginTop: 20,
  marginBottom: 0
  },
});

export default IndexScreen;
