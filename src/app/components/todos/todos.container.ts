import { Todo } from './../../models/Todo';
import { CategoriesService } from './../../services/categories.service';


import { TodoService } from '../../services/todo.service';

import './todos.container.scss';
import { UserService } from '../../services/users.service';
import { LayoutService } from './../../services/layout.service';
import { FakeBackendService } from '../../services/fake-backend.service';


class TodosController {
  todos: any;
  resolvedTodos: any;
  unresolvedTodos: any;
  dataFetching: boolean = false;
  constructor(
      private todoService: TodoService,
      private userService: UserService,
      private layoutService: LayoutService,
      private categoriesService: CategoriesService,
      private $location: ng.ILocationService, 
      private $scope: any
  ) {
      'ngInject';
    }

  $onInit() {
    if(!this.userService.isAuthorized()){
      alert('You should authorize first!');
      this.$location.url('/app/signin');
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

  toggleAddTodoForm(){
    this.layoutService.toggleAddTodoForm();
    }


  fetchData() {
      if (!this.todoService.getTodos()) {
        this.$scope.dataFetching = true;
        this.todoService.getAll();
        this.todoService.todos$.subscribe(() => {


            this.todos = this.todoService.todos;
            console.log('TODOS from todos service', this.todoService.todos);
            this.$scope.resolvedTodos = this.todoService.getResolvedTodos(this.todos);
            this.$scope.unresolvedTodos = this.todoService.getUnresolvedTodos(this.todos);
            this.$scope.dataFetching = false;
            this.$scope.$applyAsync();
        });
      } else {
          this.todos = this.todoService.todos;
          console.log('TODOS from todos service', this.todos);
          this.$scope.resolvedTodos = this.todoService.getResolvedTodos(this.todos);
          this.$scope.unresolvedTodos = this.todoService.getUnresolvedTodos(this.todos);
          this.$scope.$applyAsync();
      }

  }

    

    

   
}

export class TodosContainer implements angular.IComponentOptions {
  static selector = 'todos';
  static controller = TodosController;
  static template = require('./todos.container.html');
}
