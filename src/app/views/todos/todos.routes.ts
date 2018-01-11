import { AddTodoContainer } from '../../components/add-todo/add-todo.container';
import { TodosContainer } from '../../components/todos/todos.container';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';
  $stateProvider

    .state('add-todo', {
      parent: 'app',
      url: '/todo/add',
      component: AddContactContainer.selector
    })

    .state('todos', {
      parent: 'app',
      url: '/todos',
      component: TodosContainer.selector
    });

};