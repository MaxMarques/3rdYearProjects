import React, { useCallback } from 'react';
import { View, StyleSheet, Text, Linking, Alert } from 'react-native';
import { NativeBaseProvider, Button, Box, FormControl, Select, Card } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASE_URL } from '@env';

function CreateAR ({ navigation }) {
    const url = "https://help.ifttt.com/hc/en-us/articles/360021401373-Creating-your-own-Applet";
    const handlePress = useCallback(async () => {
        const supported = Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

  let [action, setAction] = React.useState("");
  let [reaction, setReaction] = React.useState("");
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.text_title}>
            <FontAwesome color="black" name='remove' size={38} onPress={() => navigateToHome({navigation})}/>      Créer vos liens      <FontAwesome color="black" name='question-circle' size={38} onPress={handlePress}/>
        </Text>
        <Text style={styles.text_AR}>
            Vous n'avez aucune action réaction créé
        </Text>
        <FormControl style={styles.action_button} borderRadius="10px">
          <Select selectedValue={action} onValueChange={itemValue => setAction(itemValue)} accessibilityLabel="Choisisez un service" placeholder="Ajouter une Action" h="100%" style={styles.text_action_button} alignItems="center">
            <Select.Item label="Click sur le bouton" value="button" />
            <Select.Item label="Un mail est reçu" value="getmail" />
          </Select>
        </FormControl>
        <Box style={styles.box}></Box>
        <FormControl style={styles.reaction_button} borderRadius="10px">
          <Select selectedValue={reaction} onValueChange={itemValue => setReaction(itemValue)} accessibilityLabel="Choisisez un service" placeholder="Ajouter une Réaction" h="100%" style={styles.text_reaction_button} alignItems="center">
            <Select.Item label="Envoyer un mail" value="sendmail" />
            <Select.Item label="Envoyer un sms" value="sendsms" />
          </Select>
        </FormControl>
        <Card style={styles.card_bottom}>
          <Button style={styles.créer_button} borderRadius="50px" onPress={() => pushActionReaction({ navigation }, action, reaction)}>
            <Text style={styles.text_button}>
              Ajouter une action reaction
            </Text>
          </Button>
        </Card>
      </View>
    </NativeBaseProvider>
  );
};

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
    width: 350,
    height: 100,
    backgroundColor: "#000000",
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
    borderWidth: 0
  },
  text_action_button: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: 'center',
    color: '#fffafa'
  },
  box: {
    backgroundColor: "#CECECE",
    height: 40,
    width: 10
  },
  reaction_button: {
    width: 350,
    height: 100,
    backgroundColor: "#70726E",
    color: 'black',
    marginBottom: 230
  },
  card_bottom: {
    borderRadius: 0,
    position: "absolute",
    bottom: 0,
    height: "10%",
    width: "100%",
    backgroundColor: "#000000",
    flex: 1,
    flexDirection: 'row'
  },
  créer_button: {
    width: 360,
    height: 50,
    backgroundColor: "#fffafa",
    color: 'black'
  },
  text_button: {
    fontWeight: "bold",
    fontSize: 22,
    color: '#000000'
  },
  text_reaction_button: {
    fontWeight: "bold",
    fontSize: 30,
    color: '#fffafa'
  }
});

export default CreateAR;

export function navigateToHome({ navigation }) {
    navigation.navigate('Home');
}

export function pushActionReaction({ navigation }, action, reaction) {
  var number;

  axios.get(BASE_URL + "/get-action-reaction", {}).then(function (reponse) {
    if (reponse.status == 200 && reponse.data.actionReaction != null) {
      number = reponse.data.actionReaction.length + 1;
      if (action != null && action != "" && reaction != null && reaction != "") {
        var actionReaction = {type: action, after: reaction, date: number};
        axios.put(BASE_URL + "/add-action-reaction", {actionReaction}).then(function (reponse) {
          if (reponse.status == 200)
            navigation.navigate('Home');
        });
      }
    } else {
      number = 1;
      if (action != null && action != "" && reaction != null && reaction != "") {
        var actionReaction = {type: action, after: reaction, date: number};
        axios.put(BASE_URL + "/add-action-reaction", {actionReaction}).then(function (reponse) {
          if (reponse.status == 200)
            navigation.navigate('Home');
        });
      }
    }
  });
}