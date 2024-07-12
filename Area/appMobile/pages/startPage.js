import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NativeBaseProvider, Button, useDisclose, Actionsheet } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

/**
 * This page is the first page when you arrive on the project.
 * We use it to display select if you want to connect or create an account
 * @param {var} navigation - to navigate in the project
 * @return The view of the page
*/

function StartPage ({ navigation }) {
  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId: '793072591470-smm40109mtbp9itsjrir76to8nvehi4m.apps.googleusercontent.com',
      androidClientId:
        '793072591470-hnuudg52lsqildkm3lu5rl9ldh9m206i.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn().then((res) => {
        mail = res.user.email;
        GoogleSignin.getTokens().then((res)=>{
          accessToken = res.accessToken;
          passConfirm = 0;
          isConnected = true;
          isConfirm = true;
          hashedPassword = ""
          axios.post(BASE_URL + "/create-google", {mail, hashedPassword, passConfirm, isConfirm, isConnected, accessToken}).then(function (reponse) {
            navigation.navigate("Home");
          }).catch((error) => {
            axios.post(BASE_URL + "/login-google", {mail, hashedPassword, isConnected, accessToken}).then(function (reponse) {
              navigation.navigate('Home')
            });
          });
        });
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        console.log(error);
      }
    }
  };
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image source={require('../assets/image_logo.png')} style={styles.logo}/>
        <Image source={require('../assets/start_maserati.gif')} style={styles.video}/>
        <Button style={styles.continue_button} borderRadius="50px" onPress={onOpen}>
          <Text style={styles.text_button}>
            Continuer
          </Text>
        </Button>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Button style={styles.mail_button} borderRadius="50px" onPress={() => navigateLogin({navigation})}>
              <Text style={styles.text_button_login}>
                <FontAwesome name='envelope' size={20}/>  Continuer avec votre mail
              </Text>
            </Button>
            <Button style={styles.mail_button} borderRadius="50px" onPress={_signIn}>
              <Text style={styles.text_button_login}>
                <FontAwesome name='google' size={20}/>  Continuer avec google
              </Text>
            </Button>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40
  },
  video: {
    marginBottom: 100
  },
  continue_button: {
    width: 350,
    height: 60,
    backgroundColor: "#fffafa",
    color: 'black',
  },
  text_button: {
    fontWeight: "bold",
    fontSize: 22,
    color: '#000000'
  },
  mail_button: {
    width: 350,
    height: 45,
    backgroundColor: "#000000",
    color: 'black',
    marginBottom: 10
  },
  text_button_login: {
    fontWeight: "bold",
    fontSize: 18,
    color: '#fffafa',
    alignItems: "center"
  },
});

export default StartPage;

/**
 * This function is call to navigate to the login page.
 * @param {var} navigation - to navigate in the project
*/

export function navigateLogin ({ navigation }) {
  navigation.navigate('Login');
};