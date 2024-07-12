export class User {
    constructor(_id='', name='', mail='', pwd='') {
        this._id = _id;
        this.name = name;
        this.mail = mail;
        this.pwd = pwd;
    }
    _id:string;
    mail:string;
    name:string;
    pwd:string;
}