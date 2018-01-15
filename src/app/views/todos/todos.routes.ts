import { TodosContainer } from '../../components/todos/todos.container';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';
  $stateProvider

    .state('todos', {
      parent: 'app',
      url: '/todo',
      component: TodosContainer.selector
    });

};
