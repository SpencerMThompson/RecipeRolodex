import React, { useState, useEffect } from "react";
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
import * as SplashScreen from 'expo-splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SQLite from "expo-sqlite";
import { Button } from "react-native";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);
const art = require("./assets/icon.png");
const db = SQLite.openDatabase('recipe.db');

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",}}>
      <Text>Hello World</Text>
    </View>
  );
}

function AddScreen({ navigation }) {
  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);
  // const [forceUpdate, forceUpdateId] = useForceUpdate();
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists recipes (id integer primary key not null, dishname text, dishurl text);"
      );
    });
  }, []);
  const add = (name, url) => {
    if(name === null || name ==="" || url === null || url ===""){
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into recipes (dishname, dishurl) values (? , ?)", [name, url]);
      }
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add Recipe Screen</Text>
      <TextInput value={name} onChangeText={(newName) => setName(newName)} placeholder="Dish Name"></TextInput>
      <TextInput value={url} onChangeText={(newUrl) => setUrl(newUrl)} placeholder="Recipe URL" ></TextInput>
      <Button title="Add Recipe" onPress={add(name, url)}></Button>
      <Text>{name}{url}</Text>
    </View>
  );
}

function ViewScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(true);


  if (isLoading){
    return(
      <View>
        <Text>Content Loading</Text>
      </View>
    )
  }
  db.transaction(
    (tx) => {
      tx.executeSql("select * from items", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    null,
    forceUpdate
  );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>View Recipes Screen</Text>
    </View>
  );
}
function getRecipes() {
  const [recipes, setRecipes] = useState([]);

}


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={({navigation}) => ({ headerLeft: () => <Pressable onPress={navigation.toggleDrawer}><Image source={art} style={styles.pic}></Image></Pressable>})}>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Add Recipe" component={AddScreen}/>
        <Drawer.Screen name="View Recipe" component={ViewScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'red',
    color: 'red',
    marginTop: 130,
  },
  pic:{
    width: 40,
    height: 40,
  },
  tab:{
    backgroundColor: 'red',
  }

});
export default App;
