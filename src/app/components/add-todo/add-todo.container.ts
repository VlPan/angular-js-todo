import * as angular from 'angular';
import { TodoService } from '../../services/todo.service';
import './add-todo.container.scss';
import {LayoutService} from './../../services/layout.service';
import { Category } from '../../models/Category';


class AddTodoController {

  fetchData: () => void;
  constructor(
      private $q: angular.IQService,
      private todoService: TodoService,
      private layoutService: LayoutService
  ) {
    'ngInject';
  }

  add(todo: { name: string, body: string, categories: string[], urgent: boolean })  {
    return this.$q((resolve)=>{
      this.todoService.add(todo).then(() => {
        this.fetchData();
        resolve();
      });
    });
    
  }

  closeForm(){
    this.layoutService.closeAddTodoForm();
    console.log(this.layoutService.isAddTodoFormOpen);
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
