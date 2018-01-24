import { Todo } from '../models/Todo';
import { FinalUser } from '../models/FinalUser';
import {MappingService} from './mapping.service';
export class FakeBackendService{
    static selector = 'fakeBackend';

    constructor(
        private $q: angular.IQService,
        private $timeout: ng.ITimeoutService,
        private mappingService: MappingService
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
        return this.$q((resolve, reject) => {
            let users: FinalUser[];
            setTimeout(() => {
                users = this.get('users');
                if(!users){
                    this.set('users', []);
                    users = [];
                }
                resolve(users);
            }, Math.random() * (1500 - 800) + 800);
        });
    }

    getTodosByUser(user: FinalUser){
        return this.$q((resolve, reject)=>{
            let todos: Todo[];
            setTimeout(() => {
                todos = this.findUserByProps(this.get('users'), {
                    nameServer: user.name, passwordServer: user.password
                }).todos;
                resolve(todos);
            }, Math.random() * (1500 - 700) + 700);
        });
    }

    public findUserByProps(users: any, props: {[key: string]:any} ) {
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

    public generateCategories(categories: string[]){
            this.set('categories', categories);
    }   

    public getCategories():any {
        return this.$q((resolve, reject)=>{
            let categories: string[] = this.get('categories');
            setTimeout(() => {
                resolve(categories);
                }, Math.random() * (1000 - 700) + 700);
        });
    }

    public setUsers(users: FinalUser[]){
        let convertedUsers = users.map((user) => this.mappingService.mapUserToServer(user));
        console.info('user was mapped to server', convertedUsers);
        this.set('users', convertedUsers);
    }
}

