export class User {
    constructor(_id='', mail='', hashedPassword='', pwd_confirm='', passConfirm=0, isConfirm=false, object='', string='') {
        this._id = _id;
        this.mail = mail;
        this.hashedPassword = hashedPassword;
        this.pwd_confirm = pwd_confirm;
        this.passConfirm = passConfirm;
        this.object = object;
        this.string = string;
    }
    _id:string;
    mail:string;
    hashedPassword:string;
    pwd_confirm:string;
    passConfirm:number;
    object:string;
    string:string;
}