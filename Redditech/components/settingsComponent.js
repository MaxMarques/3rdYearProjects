import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { Center, NativeBaseProvider, Button, Switch, HStack } from "native-base"

/**
 ** This component displays everything found
 ** on the Settings page with styles.
 ** @param {object} settings - settings contains all the JSON that contain Settings information.
**/

const SettingsList = ({ settings }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View>
            <NativeBaseProvider>
                <Center>
                    <Text style= {{fontWeight: 'bold', fontSize: 30, color: 'black', paddingTop: 45}}>User Settings</Text>
                </Center>
                <HStack space={20}>
                    <Center>
                        <Text style= {{fontSize: 25, color: 'black', paddingTop: 35}}>Online Status</Text>
                        <Text style= {{fontSize: 25, color: 'black', paddingTop: 35}}>Night Mode</Text>
                        <Text style= {{fontSize: 25, color: 'black', paddingTop: 35}}>Adult content</Text>
                        <Text style= {{fontSize: 25, color: 'black', paddingTop: 35}}>Autoplay media</Text>
                    </Center>
                    <Center>
                        <Switch
                        style={{paddingTop: 60}}
                        colorScheme="red"
                        size="lg"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                        <Switch
                        colorScheme="red"
                        size="lg"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                        <Switch
                        style={{paddingTop: 60}}
                        colorScheme="red"
                        size="lg"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                        <Switch
                        colorScheme="red"
                        size="lg"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                    </Center>
                </HStack>
                <Center>
                    <Text style= {{fontWeight: 'bold', fontSize: 30, color: 'black', paddingTop: 45}}>Notification settings</Text>
                </Center>
                <HStack space={20}>
                    <Center>
                        <Text style= {{fontSize: 25, color: 'black', paddingTop: 35}}>Chat messages</Text>
                        <Text style= {{fontSize: 25, color: 'black', paddingTop: 35}}>Chat requests</Text>
                    </Center>
                    <Center>
                        <Switch
                        style={{paddingTop: 60}}
                        colorScheme="red"
                        size="lg"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                        <Switch
                        colorScheme="red"
                        size="lg"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                    </Center>
                </HStack>
            </NativeBaseProvider>
        </View>
    );
}

export default SettingsList;