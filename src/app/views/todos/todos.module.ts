// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

/**
 * Import Module Components
 */
import { AddTodoForm } from '../../components/add-contact-form/add-contact-form.component';
import { TodosList } from '../../components/contact-list/contact-list.component';

/**
 * Import Module Containers
 */
import { TodosContainer } from '../../components/contacts/contacts.container';
import { AddTodoContainer } from '../../components/add-contact/add-contact.container';

/**
 * Import Module Services
 */
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/users.service';

/**
 * Import Module Routing
 */
import { routing } from './todos.routes';
import { LocalStorage } from '../../services/LS.service';


export const moduleName =
  angular.module('application.contacts', [
      'ui.router'
  ])

  /**
   * Register Module Components
   */
  .component(AddTodoForm.selector, AddTodoForm)
  .component(TodosList.selector, TodosList)

  /**
   * Register Module Containers
   */
  .component(TodosContainer.selector, TodosContainer)
  .component(AddTodoContainer.selector, AddTodoContainer)

  /**
   * Register Module Services
   */
  .service(TodoService.selector, TodoService)
  .service(UserService.selector, UserService)
  .service(LocalStorage.selector, LocalStorage)

  /**
   * Register Module Configuration
   */
  .config(routing)
  .name;
