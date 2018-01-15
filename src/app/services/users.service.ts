import { LocalStorageService } from './LocalStorage.service';
import { User } from '../models/User';
import {Todo} from '../models/Todo';

export class UserService {
    static selector = 'userService';
    private user: User;
    private userWithTodo: {name: string, password: string, todos: Todo[]};
    
    constructor (
        private $q: angular.IQService,
        private localStorage: LocalStorageService,
    ){
        'ngInject';
    }

    signin (name: string, password: string): void {
        let users = this.localStorage.get('users');
        if(!users){
            this.localStorage.set('users', []); // if no users create one
            users = [];
        }

        this.userWithTodo = users.find((user: User)=>{
            return user.name === name && user.password === password; // if there is user in users fetch him
        });


        if(!this.userWithTodo){
            this.user = new User(name, password);
            this.userWithTodo = this.addTodoListToUser(this.user, []);
            users = users.concat(this.userWithTodo);
            this.localStorage.set('users', users);
        }
        
    }

    signout () {
        this.userWithTodo = null;
    }

    getUserWithTodoName(){
        return this.userWithTodo.name;
    }

    getUserWithTodo():{ name: string; password: string; todos: Todo[] }{
            return this.userWithTodo;
    }


    isAuthorized(){
        return !!this.userWithTodo;
    }
    
    private addTodoListToUser(user: User, todos:Todo[]) : {name: string, password: string, todos: Todo[]}{
        return {name: user.name, password: user.password, todos: todos};
    }
}
