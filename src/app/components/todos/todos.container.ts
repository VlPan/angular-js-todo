

import { TodoService } from '../../services/todo.service';

import './todos.container.scss';
import { UserService } from '../../services/users.service';
import { LayoutService } from './../../services/layout.service';
import { Todo } from '../../models/Todo';
import { LocalStorageService } from '../../services/localStorage.service';


class TodosController {
  todos: Todo[];
  resolvedTodos: Todo[];
  unresolvedTodos: Todo[];
  userLoaded: boolean = false;
  todosLoaded: boolean = false;
  constructor(
     
      private todoService: TodoService,
      private userService: UserService,
      private layoutService: LayoutService,
      private localStorage: LocalStorageService,
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
          this.todoService.getAll().then((todos: Todo[]) => {
              this.todos = todos;
              this.$scope.resolvedTodos = this.getResolvedTodos(this.todos);
              this.$scope.unresolvedTodos = this.getUnresolvedTodos(this.todos);
              this.$scope.$apply();
          });
      } else {
          this.todos = this.todoService.getTodos();
          this.$scope.resolvedTodos = this.getResolvedTodos(this.todos);
          this.$scope.unresolvedTodos = this.getUnresolvedTodos(this.todos);
      }

  }

    private getResolvedTodos(todos: Todo[]){
        return todos.filter(todo => todo.resolved);
    }

    private getUnresolvedTodos(todos: Todo[]){
        return todos.filter(todo => !todo.resolved);
    }
}

export class TodosContainer implements angular.IComponentOptions {
  static selector = 'todos';
  static controller = TodosController;
  static template = require('./todos.container.html');
}
