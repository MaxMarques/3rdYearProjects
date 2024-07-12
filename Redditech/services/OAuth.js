import { CLIENT_ID, CLIENT_ID64 } from '@env'
import { authorize } from 'react-native-app-auth'
import Storage from './GlobalToken';

/**
 ** This constant contains the information
 ** to be able to identify with the reddit API.
 ** It contains the id and the identification tokens.
**/

const config = {
    redirectUrl: 'com.applired://oauth2redirect/reddit',
    clientId: CLIENT_ID,
    clientSecret: '',
    scopes: ['identity', 'read', 'privatemessages', 'report', 'save', 'submit', 'history', 'subscribe', 'vote'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
        token: {
            Authorization: CLIENT_ID64,
        },
    },
    additionalParameters: {
        duration: 'permanent',
    }
};

/**
 ** This function is called to initiate
 ** identification with reddit using the config constant.
 ** @param {var} navigation - use to move to another string
**/

export async function login ({ navigation }) {
    const autho = await authorize(config);
    await Storage.pushData("RefreshToken", autho.refreshToken);
    navigation.navigate('HomeTab');
}