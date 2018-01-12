
import './todo-list.component.scss';

import { UserService } from '../../services/users.service';

class TodoListController {
  todos: { name: string }[];
  username: string;
  todoRemoved: ($event: { $event: { id: number }}) => void;
  todoResolved: ($event: { $event: { id: number }}) => void;
  constructor(
    private $stateParams: ng.ui.IStateParamsService,
    private userService: UserService,
    private $location: ng.ILocationService, 
) {
    'ngInject';
  }


  $onInit() {
    if(this.userService.isAuthorized()){
      this.username = this.userService.getUser().name;
    }
  }

  remove(todo: { id: number }) {
    this.todoRemoved({
      $event: {
          id: todo.id
      }
    });
  }

  resolve(todo: { id: number }) {
    this.todoResolved({
      $event: {
          id: todo.id
      }
    });
  }

}

export class TodoList implements angular.IComponentOptions {
  
  static selector = 'todoList';
  static bindings = {
    todos: '<',
    todoRemoved: '&',
    todoResolved: '&'
  };
  static controller = TodoListController;
  static template = require('./todo-list.component.html');
}
