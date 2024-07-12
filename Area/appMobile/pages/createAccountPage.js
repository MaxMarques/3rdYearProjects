import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NativeBaseProvider, FormControl, Input, Button } from 'native-base';
import bcrypt from 'bcryptjs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

function CreateAccountPage ({ navigation }) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const onSubmit = () => {
    const mail = formData.mail;
    const pwd_t = formData.pwd1;
    const pwd = formData.pwd2;
    const passConfirm = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const isConfirm = false;
    const isConnected = false;

    if (pwd_t != pwd) {
      setErrors({...errors, pwd: "Le mot de passe ne correspond pas au premier"});
      return false;
    } else if (pwd_t == null || pwd == null) {
      setErrors({...errors, pwd: "Le mot de passe est vide"});
      return false;
    } else if (mail == null) {
      setErrors({...errors, mail: "L'email est vide"});
      return false;
    } else if (mail.includes('@') == false) {
      setErrors({...errors, mail: "L'email n'est pas valide"});
      return false;
    } else {
      accessToken = "";
      const hashedPassword = bcrypt.hashSync(pwd, '$2a$10$CwTycUXWue0Thq9StjUM0u');
      axios.post(BASE_URL + "/", {mail, hashedPassword, passConfirm, isConfirm, isConnected, accessToken}).then(function (reponse) {
        subjectOfMail = "AREA : Confirmez votre adresse mail"
        message = 'Bonjour !<br><br>Votre code de vérification est '+passConfirm+'.<br>Saisissez ce code sur AREA YEP pour activer votre compte.<br>Nous sommes heureux que vous soyez là !<br><br>AREA YEP'
        axios.post(BASE_URL + "/nodemail/send-mail", {mail, subjectOfMail, message}).then(function (reponse) {
          navigateValidAccount({navigation}, mail);
        })
      })
      .catch(function (error) {
        if (error.response.status == 404) {
          setErrors({...errors, mail: "Un compte à déja été créé avec cette email"});
          return false;
        }
      });
    }
  };
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FontAwesome style={styles.backArrow} color="white" name='arrow-left' size={30} onPress={() => navigateLogin({navigation})}/>
        <Image source={require('../assets/image_logo.png')} style={styles.logo}/>
        <Text style={styles.title}>
          Bienvenue
        </Text>
        <Text style={styles.text_title}>
          Créer un compte pour continuer
        </Text>
        <FormControl w="90%" isInvalid={'mail' in errors}>
          <FormControl.Label _text={{color: 'muted.100', fontSize: 'lg', fontWeight: 600}}>
            Email
          </FormControl.Label>
          <Input placeholder="**@free.fr" backgroundColor="white" keyboardType="email-address" onChangeText={value => setData({...formData, mail: value})}/>
          {'mail' in errors ? <FormControl.ErrorMessage>{errors.mail}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>}
        </FormControl>
        <FormControl w="90%" mt="10">
          <FormControl.Label _text={{color: 'muted.100', fontSize: 'lg', fontWeight: 600}}>
            Mot de passe
          </FormControl.Label>
          <Input placeholder="****" backgroundColor="white" type="password" onChangeText={value => setData({...formData, pwd1: value})}/>
        </FormControl>
        <FormControl w="90%" mt="10" isInvalid={'pwd' in errors}>
          <FormControl.Label _text={{color: 'muted.100', fontSize: 'lg', fontWeight: 600}}>
            Confirmer le mot de passe
          </FormControl.Label>
          <Input placeholder="****" backgroundColor="white" type="password" onChangeText={value => setData({...formData, pwd2: value})}/>
          {'pwd' in errors ? <FormControl.ErrorMessage>{errors.pwd}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>}
        </FormControl>
        <Button style={styles.connexion_button} borderRadius="50px" onPress={onSubmit}>
          <Text style={styles.text_button}>
            S'inscrire
          </Text>
        </Button>
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

export default CreateAccountPage;

export function navigateValidAccount ({ navigation }, mail) {
  navigation.navigate('ValidAccount', {
    email: mail,
  });
}

export function navigateLogin ({ navigation }) {
  navigation.navigate('Login');
};