// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

/**
 * Import Module Components
 */
import { AddTodoForm } from '../../components/add-todo-form/add-todo-form.component';
import { TodoList } from '../../components/todo-list/todo-list.component';

/**
 * Import Module Containers
 */
import { TodosContainer } from '../../components/todos/todos.container';
import { AddTodoContainer } from '../../components/add-todo/add-todo.container';

/**
 * Import Module Services
 */
import { ContactsService } from '../../services/contacts.service';
import { UserService } from '../../services/users.service';
import { TodoService } from '../../services/todo.service';

/**
 * Import Module Routing
 */
import { routing } from './todos.routes';
import { LocalStorageService } from '../../services/LocalStorage.service';



export const moduleName =
  angular.module('application.todos', [
      'ui.router'
  ])

 
  .component(AddTodoForm.selector, AddTodoForm)
  .component(TodoList.selector, TodoList)

  
  .component(TodosContainer.selector, TodosContainer)
  .component(AddTodoContainer.selector, AddTodoContainer)


  .service(ContactsService.selector, ContactsService)
  .service(UserService.selector, UserService)
  .service(LocalStorageService.selector, LocalStorageService)
  .service(TodoService.selector, TodoService)

 
  .config(routing)
  .name;
