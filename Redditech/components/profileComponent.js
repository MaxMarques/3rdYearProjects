import React from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import { Center, NativeBaseProvider } from "native-base"

/**
 ** This component displays everything found
 ** on the Profile page with styles.
 ** @param {object} profile - profile contains all the JSON that contain Profile information.
 ** @param {object} settings - settings contains all the JSON that contain Settings information.
**/

const ProfilList = ({ profile, settings}) => {
  return (
    <View>
      <NativeBaseProvider>
        <ImageBackground source={{uri: profile.subreddit.display_name.banner_img}} style={{width:450, height: 225}}/>
        <Center flex={0.6} px="3">
          <Image source={{uri: profile.icon_img}}
          style={{width:150, height: 150, borderRadius: 100}}/>
          <Text style= {{fontStyle: 'italic', fontSize: 35, color: 'black'}}>
            {profile.name}
          </Text>
          <Text>
            {settings.show_presence ? "online" : "offline"}
          </Text>
          <Text style= {{fontSize: 15, color: 'black', paddingTop: 100}}>
            {profile.subreddit.display_name.public_description}
          </Text>
        </Center>
      </NativeBaseProvider>
    </View>
  );
}

export default ProfilList;