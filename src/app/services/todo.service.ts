import { LocalStorageService } from './LocalStorage.service';
import { Todo } from '../models/Todo';
import { UserService } from './users.service';
import { User } from '../models/User';

export class TodoService{
    static selector = 'todoService';
    userWithTodo: {name: string, password: string, todos: Todo[]};
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
        this.userWithTodo = this.userService.getUserWithTodo();
        this.users = this.localStorage.get('users');
        this.todos = this.userService.getUserWithTodo().todos || [];
        return this.$q.resolve(this.todos);
      }
    }

    add(todo: { name: string, body: string }) {
        
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
            creationDate: Date.now(),
            resolved: false,
          };
        this.todos.push(todoToAdd);
        this.userWithTodo.todos = this.todos;
        this.users = this.users.map((user) => { 
          return user.name === this.userWithTodo.name ? this.userWithTodo : user; 
        });      

        this.localStorage.set('users', this.users);
      }

      remove(id: number) {
        
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.userWithTodo.todos = this.todos;
      
        this.users = this.users.map((user) => { 
          return user.name === this.userWithTodo.name ? this.userWithTodo : user; 
        });
        this.localStorage.set('users', this.users);

      }

      resolveTodo(id:number){
        
          let todoToResolve = this.userWithTodo.todos.find(todo => todo.id === id);
          todoToResolve.resolved = true;
          this.userWithTodo.todos = this.userWithTodo.todos.map((todo) => { 
              return todo.id === id ? todoToResolve : todo; 
            });

            this.users = this.users.map((user) => { 
              return user.name === this.userWithTodo.name ? this.userWithTodo : user; 
            });

            this.localStorage.set('users', this.users);
    
      }

    }
