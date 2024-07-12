import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NativeBaseProvider, Link, FormControl, Input, Button } from 'native-base';

/**
 * This function is to create the page where you come
 * after create an account.
 * @param {var} navigation - use to move to another page
 * @param {var} route - use to pass the email conneted between to pages
 * @return The view with all she contains
*/

function ValidAccountPage ({ route, navigation }) {
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const {email} = route.params;
    const mail = email

    const onSubmit = () => {
        const pass = formData.code;
        axios.post(BASE_URL + "/check-code", {email, pass}).then(function (response) {
            const isConfirm = true;
            const passConfirm = 0;
            axios.put(BASE_URL + "/", {email, isConfirm, passConfirm}).then(function (reponse) {
              if (isConfirm == true) {
                const isConnected = true;
                axios.put(BASE_URL + "/user-connected", {email, isConnected}).then(function (reponse) {
                });
                navigateToHome({navigation}, email);
              }
            });
          })
          .catch(function (error) {
            console.log(error);
            setErrors({...errors, code: "Le code ne correspond pas au premier"});
            return false;
          });
    };
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Image source={require('../assets/image_logo.png')} style={styles.logo}/>
                <FormControl w="90%" isInvalid={'code' in errors}>
                    <FormControl.Label _text={{color: 'muted.100', fontSize: 'lg', fontWeight: 600}}>
                        Entrez le code reçu par mail
                    </FormControl.Label>
                    <Input placeholder="00000" backgroundColor="white" keyboardType="numeric" onChangeText={value => setData({...formData, code: value})}/>
                    <Link _text={{fontSize: "xs", fontWeight: "500", color: "indigo.500"}} alignSelf="flex-end" mt="1" onPress={() => resendEmail(mail, email)}>
                    Renvoyer le code
                    </Link>
                    {'code' in errors ? <FormControl.ErrorMessage>{errors.code}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>}
                </FormControl>
                <Button style={styles.connexion_button} borderRadius="50px" onPress={onSubmit}>
                    <Text style={styles.text_button}>
                        Valider
                    </Text>
                </Button>
            </View>
        </NativeBaseProvider>
    );
}

export default ValidAccountPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000000"
    },
    logo: {
      width:100,
      height: 100,
      marginBottom: 2
    },
    title: {
      fontSize: 40,
      color: '#fffafa',
      marginBottom: 5
    },
    text_title: {
      fontSize: 20,
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
    backArrow: {
      marginRight: 340
    },
});

/**
 * This function is call to send an email to have a new password
 * for valid an account.
 * @param {var} mail - to send the mail to the user connected
*/

export function resendEmail(mail, email) {
  const isConfirm = false;
  const passConfirm = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  axios.put(BASE_URL + "/", {email, isConfirm, passConfirm}).then(function (reponse) {
    subjectOfMail = "AREA : Confirmez votre adresse mail"
    message = 'Bonjour !<br><br>Votre code de vérification est '+passConfirm+'.<br>Saisissez ce code sur AREA YEP pour activer votre compte.<br>Nous sommes heureux que vous soyez là !<br><br>AREA YEP'
    axios.post(BASE_URL + "/nodemail/send-mail", {mail, subjectOfMail, message}).then(function (reponse) {});
  });
}

export function navigateToHome({ navigation }, mail) {
  navigation.navigate('Home', {
    email: mail,
  });
}