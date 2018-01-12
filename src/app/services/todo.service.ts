import { LocalStorageService } from './LocalStorage.service';
import { Todo } from '../models/Todo';
import { UserService } from './users.service';
import { User } from '../models/User';

export class TodoService{
    static selector = 'todoService';
    currentUser: User;
    todos: Todo[];
    users: User[];

    constructor(
        private $q: angular.IQService,
        private localStorage: LocalStorageService,
        private userService: UserService,
        ) {
      'ngInject';
    }

    getAll(){
      if(this.userService.isAuthorized){
        this.todos = this.userService.getUser().todos || [];
        return this.$q.resolve(this.todos);
      }
    }

    add(todo: { name: string, body: string }) {
        this.currentUser = this.userService.getUser();
        this.users = this.localStorage.get('users');
        let highestId = 0;
        if(this.todos && this.todos.length !== 0){
          highestId = this.todos
          .map(t => t.id)
          .reduce((a, b) => Math.max(a, b), 1);
        }
    
          let todoToAdd = {
            id: highestId + 1,
            name: todo.name,
            body: todo.body,
            creationDate: new Date(),
            resolved: false,
          };
          console.log(todoToAdd);
        this.todos.push(todoToAdd);
        console.log('currentUser', this.currentUser);
        this.currentUser.todos = this.todos;
        console.log('USERS', this.users);
        this.users = this.users.map((user) => { 
          console.log('current username', this.currentUser.name);
          console.log('username', user.name);
          return user.name === this.currentUser.name ? this.currentUser : user; 
        });      

        this.localStorage.set('users', this.users);
      }

      remove(id: number) {
        this.users = this.localStorage.get('users');
        this.currentUser = this.userService.getUser();
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.currentUser.todos = this.todos;
      
        this.users = this.users.map((user) => { 
          return user.name === this.currentUser.name ? this.currentUser : user; 
        });
        this.localStorage.set('users', this.users);

      }

      resolveTodo(id:number){
        this.users = this.localStorage.get('users');
        this.currentUser = this.userService.getUser();
          let todoToResolve = this.currentUser.todos.find(todo => todo.id === id);
          todoToResolve.resolved = true;
          this.currentUser.todos = this.currentUser.todos.map((todo) => { 
              return todo.id === id ? todoToResolve : todo; 
            });

            this.users = this.users.map((user) => { 
              return user.name === this.currentUser.name ? this.currentUser : user; 
            });

            this.localStorage.set('users', this.users);
    
      }
    }
