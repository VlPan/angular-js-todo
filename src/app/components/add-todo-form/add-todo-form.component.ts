import { LayoutService } from './../../services/layout.service';
import './add-todo-form.component.scss';
class AddTodoFormController {
  name: string;
  body: string;
  todoAdded: ($event: { $event: { todo: { name: string, body: string }}}) => void;

  constructor(
    private layoutService: LayoutService,
  ) {
    'ngInject';
  }

  submit() {
    const name = this.name;
    const body = this.body;
    this.todoAdded({
      $event: {
        todo: { name, body }
      }
    });
    this.name = '';
    this.body = '';
    this.layoutService.closeAddTodoForm();
  }
}

export class AddTodoForm implements angular.IComponentOptions {
  static selector = 'addTodoForm';

  static template = require('./add-todo-form.component.html');
  static bindings = {
    todoAdded: '&'
  };
  static controller = AddTodoFormController;
}
