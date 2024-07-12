import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from "./pages/homePage";
import AuthentificationPage from "./pages/authentificationPage";

/**
 * We create a Have to navigate between the authentification
 * screen and the home screen
*/
const Stack = createNativeStackNavigator();

/**
 * This function create the two screen of the stack
 * She call the different function to switch in the
 * different screens.
 * @return The stack to navigate between the screen
*/
function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authentification" component={AuthentificationPage}/>
      <Stack.Screen name="HomeTab" component={HomePage} />
    </Stack.Navigator>
  );
}

/**
 * This function is the first function called and create the
 * navigation container and call the stack function to create it.
 * @constructor
 * @return The view
*/
function App () {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
};

export default App;