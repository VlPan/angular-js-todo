export class UserService {
    static selector = 'userService';
    private userName: string;
    private userEmail: string = 'default';
    
    constructor (
        private $q: angular.IQService
    ){
        'ngInject';
    }

    signin (name: string, email?:string): void {
        this.userName = name;
        this.userEmail = email || 'Default Email';
    }

    signout () {
        this.userName = null;
        this.userEmail = null;
    }

    getUserInfo(): string {
        return this.userName + ' ' + this.userEmail;
    }

    getUserName(): string {
        return this.userName;
    }
    getUserEmail(): string {
        return this.userEmail;
    }
}
