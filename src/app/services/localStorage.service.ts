import { Todo } from '../models/Todo';
import { FinalUser } from '../models/FinalUser';
export class LocalStorageService{
    static selector = 'localStorage';

    constructor(
        private $q: angular.IQService
    ) {
      'ngInject';
    }

    set(name:string, item: any):void {
        localStorage.setItem(name, JSON.stringify(item));
    }

    get(name:string): any {
        return JSON.parse(localStorage.getItem(name));
    }

    remove(name: string): void {
        localStorage.removeItem(name);
    }

    has(name: string): boolean {
        return !!this.get(name);
    }

    getUsers(){
        return new Promise((resolve, reject) => {
            let users: FinalUser[];
            setTimeout(() => {
                users = this.get('users');
                if(!users){
                    this.set('users', []);
                    users = [];
                }
                resolve(users);
            }, Math.random() * (3000 - 150) + 150);
        });
    }

    getTodosByUser(user: FinalUser){
        return new Promise((resolve, reject)=>{
            let todos: Todo[];
            setTimeout(() => {
                todos = this.get('users')
                            .find((userInLs:FinalUser) => {
                                return userInLs.name === user.name && userInLs.password === user.password;
                            })
                            .todos;
                resolve(todos);
            }, Math.random() * (3000 - 150) + 150);
        });
    }
}

