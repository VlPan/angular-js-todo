import { StyledCategory } from './../../models/StyledCategory';
import { LayoutService } from './../../services/layout.service';

import './todo-list.component.scss';

import { UserService } from '../../services/users.service';
import {Todo} from '../../models/Todo';

class TodoListController {
  todos: any;
  resolvedTodos: any;
  unresolvedTodos: any;
  username: string;
  todoRemoved: ($event: { $event: { id: number }}) => void;
  todoResolved: ($event: { $event: { id: number }}) => void;
  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    private $scope: any,
) {
    'ngInject';
  }


  $onInit() {
    if(this.userService.isAuthorized()){
      this.username = this.userService.getUserName();
    }
  }

  remove(todo: Todo) {
      this.layoutService.deleteTodo().then(()=>{
          this.todoRemoved({
              $event: {
                        id: todo.id
                     }
          });
          this.$scope.$applyAsync();
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
