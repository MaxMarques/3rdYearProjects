import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LoginPage from "./pages/loginPage";
import StartPage from "./pages/startPage";
import CreateAccountPage from "./pages/createAccountPage";
import HomePage from "./pages/homePage";
import ValidAccountPage from './pages/validAccountPage';
import ExplorePage from './pages/explorePage';
import CreateAR from './pages/createARPage';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ValidAccount" component={ValidAccountPage} />
      <Stack.Screen name="Explore" component={ExplorePage} />
      <Stack.Screen name="createAR" component={CreateAR} />
    </Stack.Navigator>
  );
}

function MyStackConnect(connect) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage}/>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
      <Stack.Screen name="ValidAccount" component={ValidAccountPage} />
      <Stack.Screen name="Explore" component={ExplorePage} />
      <Stack.Screen name="createAR" component={CreateAR} />
    </Stack.Navigator>
  );
}

function App () {
  const [connect, setconnect] = useState(null);
  useEffect(() => {
    axios.get(BASE_URL + "/get-user-connected", {}).then(function (reponse) { 
      if (reponse.status == 201) {
        setconnect("");
      } else {
        setconnect(reponse.data.mail);
      }
    });
  }, []);
  if (connect != null) {
    return (
      <NavigationContainer>
        {connect ? <MyStackConnect/> : <MyStack/>}
      </NavigationContainer>
    );
  } else {
      return(
        <View style={styles.container}> 
          <ActivityIndicator size={130} color="#000000" />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
});

export default App;

export function navigateToHome({ navigation }, mail) {
  navigation.navigate('Home', {
    email: mail,
  });
}