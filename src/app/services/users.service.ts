import { FinalUser } from './../models/FinalUser';
import { LocalStorageService } from './LocalStorage.service';
import {IHaveTodos} from '../models/Interfaces/todoInterface';
import { User } from '../models/User';
import { Todo } from '../models/Todo';

export class UserService {
    static selector = 'userService';
    private user: User;
    private users: any;
    private finalUser: FinalUser;

    constructor (
        private $q: angular.IQService,
        private localStorage: LocalStorageService,
    ){
        'ngInject';
    }

    signin (name: string, password: string) {
        
        return new Promise((resolve, reject) => {
            let infoFetched: boolean = false;
            this.localStorage.getUsers().then((result) => {
                this.users = result;
                this.finalUser = this.findUserByProps(this.users, {name, password});
    
                if(!this.finalUser){
                    this.user = new User(name, password);
                    this.finalUser = this.extendUser(this.user, []);
                    this.users = this.users.concat(this.finalUser);
                    this.localStorage.set('users', this.users);
                }
                infoFetched = true;
                resolve(infoFetched);
            });

            // if(this.localStorage.has('users')){
            //     this.users = this.localStorage.get('users');
            // }else{
            //     this.localStorage.set('users', []); // if no users create one
            //     this.users = [];
            // }
        });
    }

    signout() {
        this.finalUser = null;
    }

    getUserName(){
        return this.finalUser.name;
    }

    getUser(): FinalUser{
        return this.finalUser;
    }

    isAuthorized(){
        return !!this.finalUser;
    }
    
    private extendUser(user: User, todos:Todo[]) : FinalUser{
        return new FinalUser(user.name, user.password, todos);
    }

    // private generateObjectWithTodos(obj: any, todos:Todo[]) : any{
    //     return {...obj, todos};
    // }


    private findUserByProps(users: any, props: {[key: string]:any} ): FinalUser {
        let numberOfTrueProps = 0;
        return users.filter((user: any)=>{
            for (let prop in props){
                if(user[prop] === props[prop]){
                    numberOfTrueProps++;
                }
                if(numberOfTrueProps === Object.keys(props).length) {
                    return true;
                }
            }
        }).shift(); // return arr[0]
    }
}
