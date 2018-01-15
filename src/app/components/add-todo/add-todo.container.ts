import * as angular from 'angular';
import { TodoService } from '../../services/todo.service';
import './add-todo.container.scss';
import {LayoutService} from './../../services/layout.service';


class AddTodoController {

  fetchData: () => void;
  constructor(
      private todoService: TodoService,
      private layoutService: LayoutService

  ) {
    'ngInject';
  }

  add(todo: { name: string, body: string })  {
    this.todoService.add(todo);
    this.fetchData();
  }
}

export class AddTodoContainer implements angular.IComponentOptions {
  static selector = 'addTodo';
    static bindings = {
        fetchData: '&'
    };
  static controller = AddTodoController;
  static template = require('./add-todo.container.html');
}
