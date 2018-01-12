import { LocalStorageService } from './LocalStorage.service';
import { User } from '../models/User';
import {Todo} from '../models/Todo';
import { TodoService } from './todo.service';

export class UserService {
    static selector = 'userService';
    private user: User;
    
    constructor (
        private $q: angular.IQService,
        private localStorage: LocalStorageService,
    ){
        'ngInject';
    }

    signin (name: string, password: string, email?:string): void {
        let users = this.localStorage.get('users');
        if(!users){
            this.localStorage.set('users', []);
            users = [];
        }

        this.user = users.find((user: User)=>{
            return user.name === name && user.password === password;
        });

        if(!this.user){
            this.user = new User(name, email, password);
            this.user = this.addTodoListToUser(this.user, []);
            users = users.concat(this.user);
            this.localStorage.set('users', users);
        }
        
    }

    signout () {
        this.user.name = null;
        this.user.password = null;
    }

    getUser():User{
        return this.user;
    }

    isAuthorized(){
        return this.user ? true : false;
    }
    getUserInfo(): string {
        return this.user.name + ' ' + this.user.password;
    }
    
    addTodoListToUser(user:User, todos:Todo[]){
        user.todos = todos;
        return user;
    }
}
