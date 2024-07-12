import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';
import { View, StyleSheet, Image, Text,ScrollView } from 'react-native';
import { NativeBaseProvider, Card, Button, Actionsheet, useDisclose, Avatar, Center } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import PostListComponent from './postListComponent';

/**
 * This function is to create the home page where you come
 * after connect.
 * She show the button and boxes to make action reaction if there is.
 * There is also a button to connect to the services and to create action reaction.
 * @param {var} navigation - use to move to another page
 * @return The view with all she contains
*/

function HomePage({ route, navigation }) {
  var accessToken;
  var Items
  const [email, setemail] = useState(null);
  var [actionReaction, setactionReaction] = useState(null);
  useEffect(() => {
    axios.get(BASE_URL + "/get-user-connected", {}).then(function (reponse) {
      if (reponse.status == 201) {
        setemail("");
      } else {
        setemail(reponse.data.mail);
        axios.get(BASE_URL + "/get-action-reaction", {}).then(function (reponse) {
          if (reponse.status == 200 && reponse.data.actionReaction) {
            setactionReaction(reponse.data.actionReaction);
          } else {
            setactionReaction([]);
          }
        });
      }
    });
  }, []);

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  const onDeconnexion = () => {
    const isConnected = false;
    axios.get(BASE_URL + "/google-access-token", {}).then(function (reponse) {
      accessToken = reponse.data.accessToken;
    });
    axios.put(BASE_URL + "/user-connected", { email, isConnected }).then(function (reponse) {
    });
    if (accessToken != "" && accessToken != null)
      signOut();
    navigateToSTART({ navigation });
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  if (actionReaction != null && actionReaction.length > 0) {
    const Items = actionReaction.map(oneactionReaction => (
      <PostListComponent
      key={oneactionReaction.date}
      oneactionReaction={oneactionReaction}
      />
    ));
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <Card style={styles.card_title}>
            <Text style={styles.text_title}>
              MASERATI
            </Text>
            <FontAwesome color='black' name='user-circle' size={40} onPress={onOpen} />
          </Card>
          {Items}
          <Card style={styles.card_bottom}>
            <Button style={styles.créer_button} borderRadius="50px" onPress={() => navigateToCreateAR({ navigation })}>
              <Text style={styles.text_button}>
                Créer
              </Text>
            </Button>
            <Button style={styles.explorer_button} borderRadius="50px" onPress={() => navigateToExplore({ navigation })}>
              <Text style={styles.text_button}>
                Explorer
              </Text>
            </Button>
          </Card>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content style={styles.actionsheet}>
              <Avatar size="2xl" source={{ uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" }}></Avatar>
              <Text style={styles.text_mail}>{email}</Text>
              <Button style={styles.deconnexion_button} borderRadius="50px" onPress={onDeconnexion}>
                <Text style={styles.text_button_deconnexion}>
                  <FontAwesome name='window-close' size={20} />  Deconnexion
                </Text>
              </Button>
            </Actionsheet.Content>
          </Actionsheet>
        </View>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <Card style={styles.card_title}>
            <Text style={styles.text_title}>
              MASERATI
            </Text>
            <FontAwesome color='black' name='user-circle' size={40} onPress={onOpen} />
          </Card>
          <Text style={styles.text_home}>
            Commencez à connecter votre monde.
          </Text>
          <Image source={require('../assets/assets_homepage.png')} style={styles.tree} />
          <Card style={styles.card_bottom}>
            <Button style={styles.créer_button} borderRadius="50px" onPress={() => navigateToCreateAR({ navigation })}>
              <Text style={styles.text_button}>
                Créer
              </Text>
            </Button>
            <Button style={styles.explorer_button} borderRadius="50px" onPress={() => navigateToExplore({ navigation })}>
              <Text style={styles.text_button}>
                Explorer
              </Text>
            </Button>
          </Card>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content style={styles.actionsheet}>
              <Avatar size="2xl" source={{ uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" }}></Avatar>
              <Text style={styles.text_mail}>{email}</Text>
              <Button style={styles.deconnexion_button} borderRadius="50px" onPress={onDeconnexion}>
                <Text style={styles.text_button_deconnexion}>
                  <FontAwesome name='window-close' size={20} />  Deconnexion
                </Text>
              </Button>
            </Actionsheet.Content>
          </Actionsheet>
        </View>
      </NativeBaseProvider>
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
  card_title: {
    borderRadius: 0,
    position: "absolute",
    bottom: 632,
    height: "12%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text_title: {
    fontSize: 40,
    color: '#000000',
    fontWeight: "bold",
    marginEnd: 130
  },
  text_home: {
    fontSize: 25,
    color: '#000000',
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 100,
    marginTop: 150
  },
  tree: {
    width: 350,
    height: 350,
    marginBottom: 50
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
    width: 180,
    height: 50,
    backgroundColor: "#fffafa",
    color: 'black'
  },
  explorer_button: {
    width: 180,
    height: 50,
    backgroundColor: "#fffafa",
    color: 'black'
  },
  text_button: {
    fontWeight: "bold",
    fontSize: 22,
    color: '#000000'
  },
  actionsheet: {
    height: 350,
    color: "#FFFFFF"
  },
  text_mail: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 22,
    color: '#000000'
  },
  deconnexion_button: {
    width: 350,
    height: 45,
    backgroundColor: "#000000",
    color: 'black',
    marginBottom: 10,
    bottom: -80
  },
  text_button_deconnexion: {
    fontWeight: "bold",
    fontSize: 18,
    color: '#c0001a',
    alignItems: "center"
  }
});

export default HomePage;

export function navigateToSTART({ navigation }) {
  navigation.navigate("Start")
}

export function navigateToExplore({ navigation }) {
  navigation.navigate('Explore');
};

export function navigateToCreateAR({ navigation }) {
  navigation.navigate('createAR');
};