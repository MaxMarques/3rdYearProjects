import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, NativeBaseProvider, Center } from "native-base"
import { login } from "../services/OAuth"

/**
 * This function is to create the first page where you come
 * after open the app.
 * She show the logo and display a button to authentificate you
 * with your reddit account. After this screen, you will redirect
 * to the reddit web view authentification.
 * @param {var} navigation - use to move to another string
 * @return The view with all she contains
*/
function AuthentificationPage ({ navigation }) {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <Center flex={0.6} px="3">
          <Text>{"\n\n\n\n\n\n\n"}</Text>
          <Image source={require('../img/redditlogo.png')}/>
          <Text>{"\n\n\n"}</Text>
          <Button colorScheme="red" style= {{width: 170, height: 100, color: 'red'}} borderRadius="20px" onPress={async() => {
            try {
              await login({ navigation });
            } catch (error) {
              console.log(error);
            }
        }}>
          <Text style= {{fontStyle: 'italic', fontSize: 21, color: 'black'}}>
            Authentification
          </Text>
          </Button>
        </Center>
      </NativeBaseProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AuthentificationPage;