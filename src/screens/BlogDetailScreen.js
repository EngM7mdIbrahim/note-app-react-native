import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as BlogContext } from '../context/BlogContext';
import { Entypo } from '@expo/vector-icons'; 
import { defaultBackground, defaultBodyStyle, defaultTitleStyle } from '../theme/blackTheme';
import { defaultIconStyle } from '../theme/whiteTheme';

import { headerRightColor } from "../theme/colors";

let post = {};
const BlogDetailScreen = ({navigation})=>{
    const id = navigation.getParam('id');
    const {state} = useContext(BlogContext);
    post = state.find((currentPost)=> currentPost.id === id);

    return <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{post.title}</Text>
        <Text style={styles.bodyStyle}>{post.description}</Text>
    </View>
}

const styles = StyleSheet.create({
    containerStyle: {
        ...defaultBackground
    },
    titleStyle:{
        ...defaultTitleStyle
    },
    bodyStyle: {
        ...defaultBodyStyle
    },
    iconStyle: {
        ...defaultIconStyle
    }
});

BlogDetailScreen.navigationOptions = ({navigation})=>{
    return {
        title: post.title,
        headerRight: ()=>{
            return <TouchableOpacity onPress={()=> navigation.navigate('CreateNote',{id: post.id})}>
                <Entypo name="edit" style={{...styles.iconStyle, color:headerRightColor}} />
            </TouchableOpacity>
        }
    }
}

export default BlogDetailScreen;