import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { snoop } from '../services/snoopwrap';
import SettingsList from "../components/settingsComponent";

/**
 ** This function is called to create
 ** the Settings page. It contains basic
 ** settings like online status, Night Mode,
 ** Adult content ...
 ** @param {var} navigation - use to move to another string
**/

function SettingsScreen({ navigation }) {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const asyncGetSettings = async () => {
            const Sett = await snoop();
            setSettings(await Sett.getPreferences());
        }
        asyncGetSettings();
    }, []);
    if (settings) {
        return (
            <View style={styles.container}>
                <SettingsList settings={settings}/>
            </View>
        )
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

export default SettingsScreen;