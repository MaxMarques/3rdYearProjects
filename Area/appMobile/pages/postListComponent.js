import React from "react";
import { Text, StyleSheet } from 'react-native'
import { Box, Button } from "native-base";
import axios from 'axios';
import { BASE_URL } from '@env';

/**
 * This component is call int the PostComponent.
 * We use it to display each posts in a box with his tittle, the text,
 * if there is an image, the image and the autor name with the
 * the subreddit to which it belongs.
 * @param {var} post - board with all information about one post get by the API
 * @return The view with the box which containt informations about the post
*/

const PostListComponent = ({ oneactionReaction }) => {
  if (oneactionReaction.type == "button" && oneactionReaction.after == "sendmail") {
    return (
      <Button style={styles.action_button} borderRadius="10px" onPress={() => sendMailButton()}>
        <Text style={styles.text_action_button}>Quand le {oneactionReaction.type} est actionné</Text>
        <Text style={styles.text_action_button}>           envoyer un mail</Text>
      </Button>
    );
  } else if (oneactionReaction.type == "button" && oneactionReaction.after == "sendsms") {
    return (
      <Button style={styles.action_button} borderRadius="10px" onPress={() => sendSmsButton()}>
        <Text style={styles.text_action_button}>Quand le {oneactionReaction.type} est actionné</Text>
        <Text style={styles.text_action_button}>           envoyer un sms</Text>
      </Button>
    );
  } else if (oneactionReaction.type == "getmail" && oneactionReaction.after == "sendmail") {
    return (
      <Box style={styles.action_button} borderRadius="10px">
        <Text style={styles.text_action_button}>Quand je reçois un mail</Text>
        <Text style={styles.text_action_button}>envoyer un mail</Text>
      </Box>
    );
  } else {
    return (
      <Box style={styles.action_button} borderRadius="10px">
        <Text style={styles.text_action_button}>Quand je reçois un mail</Text>
        <Text style={styles.text_action_button}>envoyer un sms</Text>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffafa"
  },
  text_title: {
    fontWeight: "bold",
    fontSize: 30,
    color: '#000000',
    alignItems: "center",
    marginBottom: 50
  },
  text_AR: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#000000',
    alignItems: "center",
    marginTop: 50
  },
  action_button: {
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 100,
    backgroundColor: "#000000",
    color: 'black',
    marginTop: 50,
  },
  text_action_button: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#fffafa'
  },
  margtop: {
    marginTop: 60
  }
});

export default PostListComponent;

/**
 * This function is call to send an email a reaction.
*/

export function sendMailButton() {
  axios.get(BASE_URL + "/get-user-connected", {}).then(function (reponse) {
    if (reponse.status == 200 && reponse.data.mail != "") {
      const mail = reponse.data.mail;
      subjectOfMail = "AREA : Bouton actionné"
      message = 'Bonjour !<br><br>Vous venez de cliquer sur le bouton pour envoyer un mail<br>Nous sommes heureux que vous soyez là !<br><br>AREA YEP'
      axios.post(BASE_URL + "/nodemail/send-mail", {mail, subjectOfMail, message}).then(function (reponse) {
      })
    }
  })
}

/**
 * This function is call to send an Sms a reaction.
*/

export function sendSmsButton() {
  message = "Bonjour ! Vous venez de cliquer sur le bouton pour envoyer un Sms. Nous sommes heureux que vous soyez là ! AREA YEP"
  axios.get(BASE_URL + "/twilio/sendSMS", {message}).then(function (reponse) {
  })
}