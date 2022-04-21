import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const FullPageIcon = ({ constructIcon, title, isBlack, keyboardOpen }) => {
  const color = isBlack ? 'white': 'black';
  const backgroundColor = isBlack ? 'black' : 'white';
  const iconColor = isBlack ? '#8e8e90':'#1c1c1e';
  const justifyContent = keyboardOpen ? 'flex-start' : 'center'
  let icon = constructIcon ? (
    constructIcon(iconColor)
  ) : (
    <Entypo name="new-message" style={{...styles.iconStyle, color: iconColor}} />
  )
  
  return (
    <View style={{ ...styles.containerStyle, backgroundColor, justifyContent}}>
      {icon}   
      <Text style={{...styles.textStyle, color}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    
  },
  iconStyle: {
    textAlign: "center",
    fontSize: 150,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FullPageIcon;
