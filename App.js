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
import * as SplashScreen from "expo-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SQLite from "expo-sqlite";
import { Button } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Fragment } from "react/cjs/react.production.min";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);
const art = require("./assets/icon.png");
const db = SQLite.openDatabase("recipe.db");

function HomeScreen({ navigation }) {
  return (
    <View style={styles.home}>
      <Text style={styles.hometext1}>Find Your Favorite Meals</Text>
      <Text style={styles.hometext2}>Click the rolodex to get started</Text>
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
    </View>
  );
}

function AddScreen({ navigation }) {
  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null);
  const [v, setV] = useState(true);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists recipes (id integer primary key not null, dishname text, dishurl text);"
      );
    });
  }, []);

  const add = (name, url) => {
    if (name === null || name === "" || url === null || url === "") {
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql("insert into recipes (dishname, dishurl) values (? , ?);", [
        name,
        url,
      ], (res) => {console.log("add", res)}, (err) => {console.log(err)});
    });
  };
  function isInputValid(){
    if(name === null || name === "" || url === null || url === ""){
      return true
    }
  }
  // const AppButton = () => (
  //   <Pressable>
  //     <Text>Add Recipe</Text>
  //   </Pressable>
  // );
  return (
    <View style={styles.add}>
      <Text style={styles.hometext1}>New Recipe</Text>
      <Text style={styles.label}>Name of Dish:</Text>
      <TextInput
        value={name}
        onChangeText={(newName) => setName(newName)}
        placeholder="Dish Name"
        required={true}
        style={styles.addInput}
      ></TextInput>
      <Text style={styles.label}>Website URL:</Text>
      <TextInput
        value={url}
        onChangeText={(newUrl) => setUrl(newUrl)}
        placeholder="Recipe URL"
        required={true}
        style={styles.addInput}
      ></TextInput>
      <Button style={styles.addbtn} title="Add Recipe" disabled={isInputValid()} onPress={() => add(name, url)}></Button>
      {/* <AppButton style={styles.addbtn} onPress={() => add(name, url)}></AppButton> */}

    </View>
  );
}

function ViewScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from recipes", null, (txObj, resultSet) => {
        setRecipes(resultSet.rows._array)
      }
      );
    }, null);
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <Fragment key={recipe.id}>
              <Text>
                {recipe.dishname}
              </Text>
              <Text>
                {recipe.dishurl}
              </Text>
              <Button title="Delete" onPress={() => db.transaction((tx)=>{tx.executeSql(`delete from recipes where id = ?;`, [recipe.id]); }, null,)}></Button>
            </Fragment>
          ))}
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={navigation.toggleDrawer}>
              <Image source={art} style={styles.pic}></Image>
            </Pressable>
          ),
        })
      }
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Add Recipe" component={AddScreen} />
        <Drawer.Screen name="View Recipe" component={ViewScreen} />
        <Drawer.Screen name="About" component={AboutScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  home:{
    flex: 1,
    backgroundColor: '#CD8987',
    paddingTop: '50%',
  },
  hometext1:{
    textAlign: 'center',
    fontSize: 30,
    color:'#37392E',
  },
  hometext2:{
    textAlign: 'center',
    fontFamily: 'Serif',
    color:'#37392E',
  },
  pic: {
    width: 40,
    height: 40,
  },
  add:{
    flex: 1,
    backgroundColor: '#CD8987',
  },
  addInput:{
    width: '100%',
    backgroundColor: '#CDACA1',
    padding: 10,
    marginBottom: 30,
  },  
  addbtn:{
    backgroundColor:'#19647E',
    color:'#19647E',

  },
  label:{
    color: '#B9DFCD',
    fontSize: 20,
  },
});
export default App;
