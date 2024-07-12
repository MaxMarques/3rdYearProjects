import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { snoop } from '../services/snoopwrap';
import ProfilList from "../components/profileComponent";

/**
 ** This function is called to create
 ** the Profile page. It contains the profile photo,
 ** username and profile description.
 ** @param {var} navigation - use to move to another string
**/

function ProfileScreen({ navigation }) {
    const [profile, setProfile] = useState(null);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const asyncGetMe = async () => {
            const Prof = await snoop();
            setProfile(await Prof.getMe());
            setSettings(await Prof.getPreferences());
        }
        asyncGetMe();
    }, []);
    if (profile != null && settings != null) {
        return (
            <View style={styles.container}> 
                <ProfilList profile={profile} settings={settings}/>
            </View>
        );
    } else {
        return(
            <View style={styles.container}> 
                <ActivityIndicator size={130} color="#FF0000" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProfileScreen;