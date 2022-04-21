import React from "react";
import {
  StyleSheet,
  FlatList,
} from "react-native";
import ListRendererItem from "./ListRendererItem";

const getSearchResults = (searchTerm, data) => {
  return data.filter((obj) =>
    JSON.stringify(obj).toLowerCase().includes(searchTerm.toLowerCase())
  );
};
const ListRenderer = ({
  data,
  onItemTouch,
  onDeleteTouch,
  searchTerm,
  noResultComponent,
  isBlack,
}) => {
  const color = isBlack ? "#fff" : "black";
  const backgroundColor = isBlack ? "#1c1c1e" : "#ddd";
  const iconColor = isBlack ? "#c3b36e" : "black";
  const dateColor = isBlack ? '#8e8e90' : 'black'
  const borderColor = isBlack ? 'black' : '#8e8e90';
  const dataToShow = searchTerm ? getSearchResults(searchTerm, data) : data;
  if (dataToShow.length === 0) {
    return noResultComponent;
  }
  return (
    <FlatList
      style={{ marginHorizontal: 15 }}
      data={dataToShow}
      keyExtractor={(item) => item.id}
      renderItem={(element) => {
        return (
          <ListRendererItem
            element={element}
            length={dataToShow.length}
            color={color}
            dateColor={dateColor}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            iconColor={iconColor}
            onIconTouch={()=>onDeleteTouch(element.item.id)}
            onTouch={() => onItemTouch(element.item.id)}
          />
        );
      }}
    ></FlatList>
  );
};

const styles = StyleSheet.create({});

export default ListRenderer;
