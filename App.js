import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as SplashScreen from 'expo-splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 2000);

const art = require("./assets/art.png");
const mile = require("./assets/mile.png");
const pier = require("./assets/pier.png");
const water = require("./assets/water.png");
const willis = require("./assets/willis.png");

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={art} style={styles.pic}></Image>
    </View>
  );
}

function MileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={mile} style={styles.pic}></Image>
    </View>
  );
}
function PierScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={pier} style={styles.pic}></Image>
    </View>
  );
}
function WaterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={water} style={styles.pic}></Image>
    </View>
  );
}
function WillisScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={willis} style={styles.pic}></Image>
    </View>
  );
}


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Art Institute of Chicago">
        <Drawer.Screen name="Art Institute of Chicago" component={HomeScreen}/>
        <Drawer.Screen name="Magnificent Mile" component={MileScreen}/>
        <Drawer.Screen name="Navy Pier" component={PierScreen}/>
        <Drawer.Screen name="Water Tower" component={WaterScreen}/>
        <Drawer.Screen name="Willis Tower" component={WillisScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 130,
  },
  pic:{
    width: 320,
    height: 480,
  },

});
export default App;
