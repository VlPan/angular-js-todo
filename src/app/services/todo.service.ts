import { MappingService } from './mapping.service';
import { FinalUser } from './../models/FinalUser';
import { LocalStorageService } from './LocalStorage.service';
import { Todo } from '../models/Todo';
import { UserService } from './users.service';
import { Category } from '../models/Category';
import { CategoriesService } from './categories.service';
import * as Rx from 'rxjs/Rx';

export class TodoService{
    static selector = 'todoService';
    finalUser: FinalUser;
    todos: Todo[];
    users: FinalUser[];
    todos$: any;

    constructor(
        private $q: angular.IQService,
        private localStorage: LocalStorageService,
        private userService: UserService,
        private categoriesService: CategoriesService,
        private mappingService: MappingService
      
        ) {
          this.todos$ = new Rx.BehaviorSubject <Todo[]>([]);
        // 'ngInject';
    }

    getAll(): any{
        return this.$q((resolve, reject) => {
          this.finalUser = this.userService.getUser();
          this.users = this.userService.getUsers();
          this.localStorage.getTodosByUser(this.finalUser).then((todos: Todo[])=>{

          this.todos = todos;
          this.todos = this.todos.map((todo:any) => this.mappingService.mapTodo(todo));
          this.todos$.next(todos);

          return resolve();
          });
        });
    }

    getTodos(): Todo[]{
      return this.todos;
    }

  

    add(todo: { name: string, body: string, urgent: boolean, categories: string[] }) {
        
        let highestId = 0;
        if(this.todos && this.todos.length !== 0){
          highestId = this.todos
          .map(t => t.id)
          .reduce((a, b) => Math.max(a, b), 1);
        }
    
        console.log(todo.categories);
          let todoToAdd: any = {
            id: highestId + 1,
            name: todo.name,
            body: todo.body,
            creationDate: Date.now(),
            resolved: false,
            categories: todo.categories,
            urgent: todo.urgent
          };

       

        this.todos = this.todos.concat(todoToAdd);
        this.finalUser.todos = this.todos;
        this.users = this.users.map((user) => { 
          return user.name === this.finalUser.name ? this.finalUser : user;
        });      

        this.localStorage.set('users', this.users);
      }

      remove(id: number) {
        
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.finalUser.todos = this.todos;
        console.log(this.todos);
        this.users = this.users.map((user) => { 
          return user.name === this.finalUser.name ? this.finalUser : user;
        });
        this.localStorage.set('users', this.users);
      }

      resolveTodo(id:number){
        
          let todoToResolve = this.finalUser.todos.find(todo => todo.id === id);
          todoToResolve.resolved = true;
          this.finalUser.todos = this.finalUser.todos.map((todo) => {
              return todo.id === id ? todoToResolve : todo; 
            });

          this.todos = this.finalUser.todos;

            this.users = this.users.map((user) => { 
              return user.name === this.finalUser.name ? this.finalUser : user;
            });
            this.localStorage.set('users', this.users);
      }
    }
