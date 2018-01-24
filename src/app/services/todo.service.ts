import { MappingService } from './mapping.service';
import { FinalUser } from './../models/FinalUser';
import { FakeBackendService } from './fake-backend.service';
import { Todo } from '../models/Todo';
import { UserService } from './users.service';
import { Category } from '../models/Category';
import { CategoriesService } from './categories.service';
import * as _ from 'underscore';
import * as Rx from 'rxjs/Rx';


export class TodoService{
    static selector = 'todoService';
    finalUser: FinalUser;
    todos: Todo[];
    users: FinalUser[];
    todos$: any;

    constructor(
        private $q: angular.IQService,
        private fakeBackend: FakeBackendService,
        private userService: UserService,
        private categoriesService: CategoriesService,
        private mappingService: MappingService
      
        ) {
          
        'ngInject';
    }

    getAll(): any{
        this.userService.users$
        .subscribe(
          (userInfo:any) => {
            this.finalUser = this.userService.getUser();
            console.info('current User is ', this.finalUser);
            this.users = this.userService.getUsers();
            this.todos$ = Rx.Observable.fromPromise(this.fakeBackend.getTodosByUser(this.finalUser));
            this.todos$
            .subscribe(
                 (todos: Todo[]) => {
                  this.todos = todos || [];
                  console.info('Todos of current User: ', todos);
                  this.todos = this.todos.map((todo:any) => this.mappingService.mapTodo(todo));
                  console.info('Todos of current User After Mapping: ', this.todos);
                }
            );
          }
        );
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
        console.info('Users To set before mapping', this.users);
        this.fakeBackend.setUsers(this.users);
      }

      remove(id: number) {
        
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.finalUser.todos = this.todos;
        console.log(this.todos);
        this.users = this.users.map((user) => { 
          return user.name === this.finalUser.name ? this.finalUser : user;
        });
          console.info('Users To set before mapping', this.users);
          this.fakeBackend.setUsers(this.users);
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
            console.info('Users To set before mapping', this.users);
            this.fakeBackend.setUsers(this.users);
      }

      public getResolvedTodos(todos: Todo[]){
        return this.styleCategories(todos.filter(todo => todo.resolved));
          
      }
  
      public getUnresolvedTodos(todos: Todo[]){
          console.log('АРГУМЕНТ', todos);
          return this.styleCategories(todos.filter(todo => !todo.resolved));
      }

      private styleCategories(todos: any){
        console.log('аргумент', todos);
      todos = todos.map((todo: any, styledTodos:any)=>{
          console.log(todo.categories[0]);
          console.log(todo.categories[0] instanceof Object);
        if(todo.categories[0]  instanceof Object){
            console.log('already styled');
        }else{
          styledTodos = _.clone(todo);
          styledTodos.categories = _.clone(todo.categories);
          console.log('категории', styledTodos.categories);
          styledTodos.categories = styledTodos.categories
          .map((category:string) => this.categoriesService.bindIconToCategory(category));
          console.log(styledTodos);
          return styledTodos;
        }
      });
      console.log('RESULT OF REDUCE', todos);
      return todos;
    }
  }

