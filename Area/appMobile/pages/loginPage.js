import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NativeBaseProvider, FormControl, Input, Link, Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import bcrypt from 'bcryptjs';

/**
 * This function is to create the first page where you come
 * after open the app.
 * She show the logo and display a button to authentificate you
 * with your account. After this screen, you will redirect
 * to the home page.
 * @param {var} navigation - use to move to another page
 * @return The view with all she contains
*/

function LoginPage ({ navigation }) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const onSubmit = () => {
    const mail = formData.mail;
    const pwd = formData.pwd;

    if (mail == null) {
      setErrors({...errors, mail: "L'email est vide"});
      return false;
    } else if (mail.includes('@') == false) {
      setErrors({...errors, mail: "L'email n'est pas valide"});
      return false;
    }  else if (pwd == null) {
      setErrors({...errors, pwd: "Le mot de passe est vide"});
      return false;
    } else {
      accessToken = "";
      const hashedPassword = bcrypt.hashSync(pwd, '$2a$10$CwTycUXWue0Thq9StjUM0u');
      axios.post(BASE_URL + "/login", {mail, hashedPassword, accessToken}).then(function (reponse) {
        axios.post(BASE_URL + "/check-confirm", {mail}).then(function (reponse) {
          const isConnected = true;
          const email = mail;
          axios.put(BASE_URL + "/user-connected", {email, isConnected}).then(function (reponse) {
          });
          navigateToHome({navigation}, mail);
        })
        .catch(function (error) {
          navigateValidAccount({navigation}, mail);
        });
      })
      .catch(function (error) {
        if (error.response.status == 404) {
          setErrors({...errors, mail: "l'email ou le mot de passe est incorrect"});
          return false;
        }
      });
    }
  };
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FontAwesome style={styles.backArrow} color="white" name='arrow-left' size={30} onPress={() => navigateStart({navigation})}/>
        <Image source={require('../assets/image_logo.png')} style={styles.logo}/>
        <Text style={styles.title}>
          Bonjour
        </Text>
        <Text style={styles.text_title}>
          Connectez-vous pour continuer
        </Text>
        <FormControl w="90%" isInvalid={'mail' in errors}>
          <FormControl.Label _text={{color: 'muted.100', fontSize: 'lg', fontWeight: 600}}>
            Email
          </FormControl.Label>
          <Input placeholder="**@free.fr" backgroundColor="white" keyboardType="email-address" onChangeText={value => setData({...formData, mail: value})}/>
          {'mail' in errors ? <FormControl.ErrorMessage>{errors.mail}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>}
        </FormControl>
        <FormControl w="90%" mt="5" isInvalid={'pwd' in errors}>
          <FormControl.Label _text={{color: 'muted.100', fontSize: 'lg', fontWeight: 600}}>
            Mot de passe
          </FormControl.Label>
          <Input placeholder="****" backgroundColor="white" type="password" onChangeText={value => setData({...formData, pwd: value})}/>
          {'pwd' in errors ? <FormControl.ErrorMessage>{errors.pwd}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>}
          <Link _text={{fontSize: "xs", fontWeight: "500", color: "indigo.500"}} alignSelf="flex-end" mt="1">
            Mot de passe oublié?
          </Link>
        </FormControl>
        <Button style={styles.connexion_button} borderRadius="50px" onPress={onSubmit}>
          <Text style={styles.text_button}>
            Connexion
          </Text>
        </Button>
        <Text style={styles.text_ca}>
          Vous etes nouveau ?
        </Text>
        <Link _text={{color: "indigo.500", fontWeight: "medium", fontSize: "sm"}} onPress={() => navigateCreateAccount({navigation})}>
          Créer un compte
        </Link>
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
    width:150,
    height: 150,
    marginBottom: 2
  },
  title: {
    fontSize: 50,
    color: '#fffafa',
    marginBottom: 5
  },
  text_title: {
    fontSize: 22,
    color: '#fffafa',
    marginBottom: 30
  },
  connexion_button: {
    width: 350,
    height: 60,
    backgroundColor: "#fffafa",
    color: 'black',
    marginTop: 40
  },
  text_button: {
    fontWeight: "bold",
    fontSize: 22,
    color: '#000000'
  },
  text_ca: {
    fontSize: 15,
    color: '#fffafa',
    marginTop: 5,
    marginBottom: 1
  },
  backArrow: {
    marginRight: 340
  },
});

export default LoginPage;

/**
 * This function is call to navigate to the Start page.
 * @param {var} navigation - to navigate in the project
*/

export function navigateStart ({ navigation }) {
  navigation.navigate('Start');
};

/**
 * This function is call to navigate to the CreateAccount page.
 * @param {var} navigation - to navigate in the project
*/

export function navigateCreateAccount ({ navigation }) {
  navigation.navigate('CreateAccount');
};

/**
 * This function is call to navigate to the Home page.
 * @param {var} navigation - to navigate in the project
 * @param {var} mail - to give the user connected
*/

export function navigateToHome({ navigation }, mail) {
  navigation.navigate('Home', {
    email: mail,
  });
}

/**
 * This function is call to navigate to the ValidAccount page.
 * @param {var} navigation - to navigate in the project
 * @param {var} mail - to give the user connected
*/

export function navigateValidAccount ({ navigation }, mail) {
  navigation.navigate('ValidAccount', {
    email: mail,
  });
}