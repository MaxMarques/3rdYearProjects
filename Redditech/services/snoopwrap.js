import { CLIENT_ID } from '@env';
import Storage from './GlobalToken';

/**
 ** This function is called to fetch
 ** the information in the Reddit API.
**/

'use strict';
const snoowrap = require('snoowrap');
export const snoop = async() => {
    const r = new snoowrap({
        userAgent: '',
        clientId: CLIENT_ID,
        clientSecret: '',
        refreshToken: await Storage.getData("RefreshToken")
    });
    r._nextRequestTimestamp = -1;
    return r;
}