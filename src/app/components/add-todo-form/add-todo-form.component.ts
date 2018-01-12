class AddTodoFormController {
  name: string;
  body: string;
  todoAdded: ($event: { $event: { todo: { name: string, body: string }}}) => void;

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
