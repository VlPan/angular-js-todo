import { MappingService } from './../../services/mapping.service';


// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

/**
 * Import Module Components
 */
import { AddTodoForm } from '../../components/add-todo-form/add-todo-form.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { HeaderComponent } from './../../components/hw-header/hw-header.component';

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
import { LayoutService } from './../../services/layout.service';

/**
 * Import Module Routing
 */
import { routing } from './todos.routes';
import { FakeBackendService } from '../../services/fake-backend.service';
import { CategoriesService } from '../../services/categories.service';



export const moduleName =
  angular.module('application.todos', [
      'ui.router'
  ])

 
  .component(AddTodoForm.selector, AddTodoForm)
  .component(TodoListComponent.selector, TodoListComponent)
  .component(HeaderComponent.selector, HeaderComponent)

  
  .component(TodosContainer.selector, TodosContainer)
  .component(AddTodoContainer.selector, AddTodoContainer)

  


  .service(ContactsService.selector, ContactsService)
  .service(UserService.selector, UserService)
  .service(FakeBackendService.selector, FakeBackendService)
  .service(TodoService.selector, TodoService)
  .service(LayoutService.selector, LayoutService)
  .service(CategoriesService.selector, CategoriesService)
  .service(MappingService.selector, MappingService)

 
  .config(routing)
  .name;
