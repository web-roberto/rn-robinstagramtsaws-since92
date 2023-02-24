//import liraries
import React, { Component,ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


interface IDoublePressable {
    onDoublePress?: ()=> void;
    children: ReactNode;
}

// create a component
const DoublePressable = ({onDoublePress=()=>{},children}: IDoublePressable) => {
    let lastTap=0;
    const handleDoublePress=()=>{
      const now = Date.now(); //timestamp en ms desde 1970
      if (now-lastTap < 300) {onDoublePress();}
      lastTap=now;
    }


return (
    <Pressable onPress={handleDoublePress}>{children}</Pressable>
    );
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default DoublePressable;
