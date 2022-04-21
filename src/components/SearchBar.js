import React  from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({
  searchTerm,
  onSearchTextChange,
  onSearchTextSubmitted,

  isBlack
}) => {
  const textColor = isBlack ? 'white' : 'black'
  const color = isBlack ? '#8e8e90' : 'black'
  const backgroundColor = isBlack ? "#1c1c1e" : "#ddd"
  return (
    <View style={{...styles.backgroundStyle, backgroundColor}}>
      <FontAwesome name="search" style={{...styles.iconSize, color}} />
      <TextInput
        placeholderTextColor={color} 
        onChangeText={onSearchTextChange}
        onSubmitEditing={onSearchTextSubmitted}
        style={{...styles.inputStyle,color: textColor}}
        placeholder="Search"
        value={searchTerm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    margin: 15,
    borderRadius: 5,
    height: 35,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: 5,
  },
  iconSize: {
    fontSize: 20,
  marginVertical: 5,
  marginHorizontal: 10,
  alignSelf: "center",
  },
});

export default SearchBar;
