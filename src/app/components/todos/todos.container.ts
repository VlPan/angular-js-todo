

import { TodoService } from '../../services/todo.service';

import './todos.container.scss';
import { UserService } from '../../services/users.service';
import { LayoutService } from './../../services/layout.service';
import { Todo } from '../../models/Todo';


class TodosController {
  todos: Todo[];
  resolvedTodos: Todo[];
  unresolvedTodos: Todo[];
  constructor(
     
      private todoService: TodoService,
      private userService: UserService,
      private layoutService: LayoutService,
      private $location: ng.ILocationService, 
  ) {
      'ngInject';
    }

  $onInit() {
    if(!this.userService.isAuthorized()){
      alert('You should authorize first!');
      this.$location.url('/app/signin');
      return;
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
    this.todoService.getAll()
    .then(todos => {
    this.todos = todos;
    this.resolvedTodos = this.getResolvedTodos(todos);
    this.unresolvedTodos = this.getUnresolvedTodos(todos);
    });
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
