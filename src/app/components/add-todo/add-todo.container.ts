import { ContactsService } from '../../services/contacts.service';
import { UserService } from '../../services/users.service';
import * as angular from 'angular';
import { TodoService } from '../../services/todo.service';


class AddTodoController {

  constructor(
      private todoService: TodoService,
      private $state: angular.ui.IStateService,
      private userService: UserService,
      private $location: ng.ILocationService, 
  ) {
    'ngInject';
  }

  $onInit(){
    if(!this.userService.isAuthorized()){
      alert('You should authorize first!');
      this.$location.url('/app/signin');
    }
  }
  add(todo: { name: string, body: string })  {
    this.todoService.add(todo);
    this.$state.go('todos');
  }
}

export class AddTodoContainer implements angular.IComponentOptions {
  static selector = 'addTodo';
  static controller = AddTodoController;
  static template = `
  <div class="row">
    <div class="col-md-12">
      <h1>Add Todo</h1>
      <add-todo-form todo-added="$ctrl.add($event.todo)"></add-contact-form>
      <a class="btn btn-default btn-block" ui-sref="todos">Back</a>
    </div>
  </div>
  `;
}
