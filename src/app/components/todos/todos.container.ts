import { ContactsService } from '../../services/contacts.service';
import { TodoService } from '../../services/todo.service';

import './todos.container.scss';
import { UserService } from '../../services/users.service';
import { Todo } from '../../models/Todo';


class TodosController {
  todos: Todo[];
  constructor(
     
      private todoService: TodoService,
      private userService:UserService,
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

  private fetchData() {
    this.todoService.getAll()
      .then(todos => {
        this.todos = todos;
        console.log(this.todos);
      });
      
  }
}

export class TodosContainer implements angular.IComponentOptions {
  static selector = 'todos';
  static controller = TodosController;
  static template = `
  <div class="row">
    <div class="col-md-12">
      <h1>Contacts</h1>
      <todo-list todos="$ctrl.todos" todo-removed="$ctrl.remove($event.id)" todo-resolved="$ctrl.resolve($event.id)"></todo-list>
      <a class="btn btn-primary btn-block" ui-sref="add-todo">Add</a>
    </div>
  </div>
  `;
}
