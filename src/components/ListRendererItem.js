import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {formatDate} from '../helpers/Formatter'

const ListRendererItem = ({
  element,
  length,
  onTouch,
  onIconTouch,
  backgroundColor,
  color,
  dateColor,
  borderColor,
  iconColor,
}) => {
  let containerStyle = {
    ...styles.normalContainerStyle,
    borderBottomWidth: 1,
    borderColor: borderColor,
  };
  if (element.index === 0) {
    containerStyle = { ...containerStyle, ...styles.firstContainerStyle };
  }
  if (element.index === length - 1) {
    containerStyle = { ...containerStyle, ...styles.lastContainerStyle };
  }
  return (
    <TouchableOpacity onPress={onTouch}>
      <View style={{ ...containerStyle, backgroundColor }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ ...styles.titleStyle, color }}>{element.item.title}</Text>
          <Text numberOfLines={1} style={{ ...styles.bodyStyle, color:dateColor }}>{formatDate(element.item.date)}  {element.item.description}</Text>
        </View>
        <TouchableOpacity onPress={onIconTouch}>
          <MaterialIcons
            name="delete"
            style={{ ...styles.iconStyle, color: iconColor,}}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  normalContainerStyle: {
    flexDirection: "row",
    padding: 15,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  bodyStyle: {
    marginTop: 5,
    fontSize: 14,
  },
  iconStyle: {
    marginTop: 10,
    fontSize: 30,
    flex: 1,
  },
  lastContainerStyle: {
    borderBottomStartRadius: 7,
    borderBottomEndRadius: 7,
    borderBottomWidth: 0,
  },
  firstContainerStyle: {
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
  },
});

export default ListRendererItem;
