import { Injectable } from '@angular/core';
import { User } from './user'
import { HttpClient } from '@angular/common/http'
import { GoogleLoginProvider } from 'angularx-social-login';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    selectedUser:User;
    users:User[] | undefined
    socialAuthService: any;
    constructor(private http:HttpClient) {
        this.selectedUser = new User()
    }
    getUsers(){
        return this.http.get('http://localhost:8080')
    }
    postUsers(user:User){
        return this.http.post('http://localhost:8080', user)
    }
    putUsers(user:User){
        return this.http.put('http://localhost:8080/' + user._id, user)
    }
    deleteUser(_id:string){
        return this.http.delete('http://localhost:8080/'+_id)
    }
    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    logOut(): void {
        this.socialAuthService.signOut();
    }

    encrypt(keys: any, value: any){
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

        return encrypted.toString();
    }
}