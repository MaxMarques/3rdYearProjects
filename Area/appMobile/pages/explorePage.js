import React, {useState} from 'react';
import { ScrollView, StyleSheet, Linking } from "react-native";
import { NativeBaseProvider, Center, Box, Image, Text, Switch, HStack, View, Button } from 'native-base';
import { BASE_URL } from '@env';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ExplorePage ({ navigation }) {
    const [switchValueSpotify, setSwitchValueSpotify] = useState(false);
    const [switchValueGmail, setSwitchValueGmail] = useState(false);
    const [switchValueGithub, setSwitchValueGithub] = useState(false);
    const [switchValueDiscord, setSwitchValueDiscord] = useState(false);
    const [switchValueDropbox, setSwitchValueDropbox] = useState(false);
    const [switchValueYoutube, setSwitchValueYoutube] = useState(false);

    const connectToSpotify = (val) => {
        setSwitchValueSpotify(val);
        if (val) {
            console.log("yes");
        } else {
            console.log("nop");
        }
    };

    const connectToGmail = (val) => {
        setSwitchValueGmail(val);
        if (val) {
            console.log("yes");
        } else {
            console.log("nop");
        }
    };
    
    const connectToGithub = (val) => {
        setSwitchValueGithub(val);
        if (val) {
            console.log("yes");
        } else {
            console.log("nop");
        }
    };

    const connectToDiscord = (val) => {
        setSwitchValueDiscord(val);
        if (val) {
            console.log("yes");
        } else {
            console.log("nop");
        }
    };

    const connectToDropbox = (val) => {
        setSwitchValueDropbox(val);
        if (val) {
            console.log("yes");
        } else {
            console.log("nop");
        }
    };

    const connectToYoutube = (val) => {
        setSwitchValueYoutube(val);
        if (val) {
            console.log("yes");
        } else {
            console.log("nop");
        }
    };
    return (
        <NativeBaseProvider>
            <View style={styles.container_view}>
                <FontAwesome style={styles.backArrow} color="black" name='arrow-left' size={30} onPress={() => navigateToHome({navigation})}/>
                <ScrollView style={styles.container}>
                    <Center>
                        <Box style={styles.box_spotify} my="5">
                            <Image source={require('../assets/spotify.png')} alt="image base" resizeMode="cover" height={100} width={350} roundedTop="md" roundedBottom="md" />
                            <HStack alignItems="center" justifyContent="center" space={4} my="8">
                                <Text style={styles.text_box}>{switchValueSpotify ? 'Connecté' : 'Déconnecter'}</Text>
                                <Switch value={switchValueSpotify} trackColor={{true: '#03FFF3', false: 'red'}} size="lg" onValueChange={(val) => connectToSpotify(val)}/>
                            </HStack>
                        </Box>
                        <Box style={styles.box_gmail} my="5" overflow="hidden" borderColor="grey" borderWidth="2">
                            <Image source={require('../assets/gmail-logo.jpg')} alt="image base" resizeMode="cover" height={100} width={350} roundedTop="md" roundedBottom="md" />
                            <HStack alignItems="center" justifyContent="center" space={4} my="8">
                                <Text style={styles.text_box}>{switchValueGmail ? 'Connecté' : 'Déconnecter'}</Text>
                                <Switch value={switchValueGmail} trackColor={{true: '#03FFF3', false: 'red'}} size="lg" onValueChange={(val) => connectToGmail(val)}/>
                            </HStack>
                        </Box>
                        <Box style={styles.box_github} my="5">
                            <Image source={require('../assets/github-logo.png')} alt="image base" resizeMode="cover" height={100} width={350} roundedTop="md" roundedBottom="md" />
                            <HStack alignItems="center" justifyContent="center" space={4} my="8">
                                <Text style={styles.text_box_github}>{switchValueGithub ? 'Connecté' : 'Déconnecter'}</Text>
                                <Switch value={switchValueGithub} trackColor={{true: '#03FFF3', false: 'red'}} size="lg" onValueChange={(val) => connectToGithub(val)}/>
                            </HStack>
                        </Box>
                        <Box style={styles.box_discord} my="5">
                            <Image source={require('../assets/discord-logo.jpg')} alt="image base" resizeMode="cover" height={100} width={350} roundedTop="md" roundedBottom="md" />
                            <HStack alignItems="center" justifyContent="center" space={4} my="8">
                                <Text style={styles.text_box}>{switchValueDiscord ? 'Connecté' : 'Déconnecter'}</Text>
                                <Switch value={switchValueDiscord} trackColor={{true: '#03FFF3', false: 'red'}} size="lg" onValueChange={(val) => connectToDiscord(val)}/>
                            </HStack>
                        </Box>
                        <Box style={styles.box_dropbox} my="5" overflow="hidden" borderColor="grey" borderWidth="2">
                            <Image source={require('../assets/dropbox-logo.png')} alt="image base" resizeMode="cover" height={100} width={350} roundedTop="md" roundedBottom="md" />
                            <HStack alignItems="center" justifyContent="center" space={4} my="8">
                                <Text style={styles.text_box}>{switchValueDropbox ? 'Connecté' : 'Déconnecter'}</Text>
                                <Switch value={switchValueDropbox} trackColor={{true: '#03FFF3', false: 'red'}} size="lg" onValueChange={(val) => connectToDropbox(val)}/>
                            </HStack>
                        </Box>
                        <Box style={styles.box_youtube} my="5" overflow="hidden" borderColor="grey" borderWidth="2">
                            <Image source={require('../assets/YouTube-logo.png')} alt="image base" resizeMode="cover" height={100} width={350} roundedTop="md" roundedBottom="md" />
                            <HStack alignItems="center" justifyContent="center" space={4} my="8">
                                <Text style={styles.text_box}>{switchValueYoutube ? 'Connecté' : 'Déconnecter'}</Text>
                                <Switch value={switchValueYoutube} trackColor={{true: '#03FFF3', false: 'red'}} size="lg" onValueChange={(val) => connectToYoutube(val)}/>
                            </HStack>
                        </Box>
                    </Center>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container_view: {
        flex: 1,
        backgroundColor: "#fffafa"
    },
    container: {
        backgroundColor: "#fffafa"
    },
    box_spotify: {
        backgroundColor: "#1ed760",
        height: 200,
        width: 350,
        borderRadius: 5
    },
    box_gmail: {
        backgroundColor: "#fffafa",
        height: 200,
        width: 350,
        borderRadius: 5
    },
    box_github: {
        backgroundColor: "#000000",
        height: 200,
        width: 350,
        borderRadius: 5
    },
    box_discord: {
        backgroundColor: "#7289da",
        height: 200,
        width: 350,
        borderRadius: 5
    },
    box_dropbox: {
        backgroundColor: "#fffafa",
        height: 200,
        width: 350,
        borderRadius: 5
    },
    box_youtube: {
        backgroundColor: "#fffafa",
        height: 200,
        width: 350,
        borderRadius: 5
    },
    text_box: {
        fontSize: 20,
        color: '#000000',
        fontWeight: "bold"
    },
    text_box_github: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: "bold"
    },
    backArrow: {
        marginTop: 10,
        marginLeft: 10
    }
});

export default ExplorePage;

export function navigateToHome({ navigation }) {
    navigation.navigate('Home');
}