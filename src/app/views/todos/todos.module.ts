import * as angular from 'angular';


import { AddTodoForm } from '../../components/add-todo-form/add-todo-form.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { HeaderComponent } from './../../components/hw-header/hw-header.component';

import { TodosContainer } from '../../components/todos/todos.container';
import { AddTodoContainer } from '../../components/add-todo/add-todo.container';

import { UserService } from '../../services/users/users.service';
import { TodoService } from '../../services/todo/todo.service';
import { LayoutService } from '../../services/layout/layout.service';
import {TodoConverterService} from '../../services/todo-converter/todo-converter.service';
import {UserConverterService} from '../../services/user-converter/user-converter.service';

import { routing } from './todos.routes';
import { FakeBackendService } from '../../services/fake-backend/fake-backend.service';
import { CategoriesService } from '../../services/categories/categories.service';
import {CategoryConverterService} from '../../services/category-converter/category-converter.service';


export const moduleName =
  angular.module('application.todos', [
      'ui.router'
  ])
  .component(AddTodoForm.selector, AddTodoForm)
  .component(TodoListComponent.selector, TodoListComponent)
  .component(HeaderComponent.selector, HeaderComponent)
  .component(TodosContainer.selector, TodosContainer)
  .component(AddTodoContainer.selector, AddTodoContainer)
  .service(UserService.selector, UserService)
  .service(FakeBackendService.selector, FakeBackendService)
  .service(TodoService.selector, TodoService)
  .service(LayoutService.selector, LayoutService)
  .service(CategoriesService.selector, CategoriesService)
  .service(TodoConverterService.selector, TodoConverterService)
  .service(UserConverterService.selector, UserConverterService)
  .service(CategoryConverterService.selector, CategoryConverterService)
  .config(routing)
  .name;
