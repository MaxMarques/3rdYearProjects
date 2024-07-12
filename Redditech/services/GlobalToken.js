import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 ** This function is called when we want to share
 ** the refreshToken anywhere in the code.
 ** @param {string} key - Key is the refreshToken registration key
 ** @param {object} value - Value is the object that contains refreshToken that we want to share
**/

const pushData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(e) {
        console.error(e);
    }
}

/**
 ** This function is called when we want
 ** to retrieve the refreshToken anywhere in the code.
 ** @param {string} key - Key contains the refreshToken
**/

const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return (value);
    } catch(e) {
      return console.error(e);
    }
}

export default {pushData, getData};