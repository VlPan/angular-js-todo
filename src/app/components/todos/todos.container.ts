import { Todo } from './../../models/Todo';
import { CategoriesService } from './../../services/categories.service';
import * as _ from 'underscore';

import { TodoService } from '../../services/todo.service';

import './todos.container.scss';
import { UserService } from '../../services/users.service';
import { LayoutService } from './../../services/layout.service';
import { LocalStorageService } from '../../services/localStorage.service';


class TodosController {
  todos: any;
  resolvedTodos: any;
  unresolvedTodos: any;
  dataFetching: boolean = false;
  constructor(
      private todoService: TodoService,
      private userService: UserService,
      private layoutService: LayoutService,
      private categoriesService: CategoriesService,
      private $location: ng.ILocationService, 
      private $scope: any
  ) {
      'ngInject';
    }

  $onInit() {
    if(!this.userService.isAuthorized()){
      alert('You should authorize first!');
      this.$location.url('/app/signin');
    }
    this.fetchData();
  }

  remove(id: number) {
    this.todoService.remove(id);
    this.fetchData();
  }

  resolve(id: number) {
    this.todoService.resolveTodo(id);
    this.fetchData();
  }

  toggleAddTodoForm(){
    this.layoutService.toggleAddTodoForm();
    }


  fetchData() {
      if (!this.todoService.getTodos()) {
        this.$scope.dataFetching = true;
          this.todoService.getAll().then((todos: Todo[]) => {
              this.todos = todos;
              console.log('TODOS from todos service', this.todos);
              this.$scope.resolvedTodos = this.getResolvedTodos(this.todos);
              this.$scope.unresolvedTodos = this.getUnresolvedTodos(this.todos);
              this.$scope.dataFetching = false;
              this.$scope.$applyAsync();
          });
      } else {
          this.todos = this.todoService.getTodos();
          console.log('TODOS from todos service', this.todos);
          this.$scope.resolvedTodos = this.getResolvedTodos(this.todos);
          this.$scope.unresolvedTodos = this.getUnresolvedTodos(this.todos);
          this.$scope.$applyAsync();
      }

  }

    private getResolvedTodos(todos: Todo[]){
      return this.styleCategories(todos.filter(todo => todo.resolved));
        
    }

    private getUnresolvedTodos(todos: Todo[]){
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

export class TodosContainer implements angular.IComponentOptions {
  static selector = 'todos';
  static controller = TodosController;
  static template = require('./todos.container.html');
}
