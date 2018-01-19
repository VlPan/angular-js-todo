import { LayoutService } from './../../services/layout.service';

import './todo-list.component.scss';

import { UserService } from '../../services/users.service';
import {Todo} from '../../models/Todo';

class TodoListController {
  todos: Todo[];
  resolvedTodos: Todo[];
  unresolvedTodos: Todo[];
  username: string;
  todoRemoved: ($event: { $event: { id: number }}) => void;
  todoResolved: ($event: { $event: { id: number }}) => void;
  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    private $scope: any
) {
    'ngInject';
    console.log(this.resolvedTodos);
    console.log(this.unresolvedTodos);
  }


  $onInit() {
    if(this.userService.isAuthorized()){
      this.username = this.userService.getUserName();
      this.$scope.resolvedTodos = this.resolvedTodos;
      this.$scope.unresolvedTodos = this.unresolvedTodos;
      console.log(this.$scope.resolvedTodos);
      console.log(this.$scope.unresolvedTodos);
    }

  }

  remove(todo: Todo) {
    this.layoutService.deleteTodo(this.todoRemoved, {
      $event: {
          id: todo.id
      }
    });
  }


  resolve(todo: Todo) {
    this.todoResolved({
      $event: {
          id: todo.id
      }
    });
  }



}

export class TodoListComponent implements angular.IComponentOptions {

  static selector = 'todoList';
  static bindings = {
      todos: '<',
      resolvedTodos: '<',
      unresolvedTodos: '<',
      todoRemoved: '&',
      todoResolved: '&'
  };
  static controller = TodoListController;
  static template = require('./todo-list.component.html');

}
