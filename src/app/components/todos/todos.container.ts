import './todos.container.scss';
import { TodoService } from '../../services/todo/todo.service';
import { UserService } from '../../services/users/users.service';
import { LayoutService } from '../../services/layout/layout.service';


class TodosController {
  todos: any;
  resolvedTodos: any;
  unresolvedTodos: any;
  dataFetching: boolean = false;
  constructor(
      private todoService: TodoService,
      private userService: UserService,
      private layoutService: LayoutService,
      private $location: ng.ILocationService, 
      private $scope: any
  ) {
      'ngInject';
    }

  $onInit() {
    this.userService.checkIfNotLogged();
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
            this.$scope.resolvedTodos = this.todoService.getResolvedTodos(this.todos);
            this.$scope.unresolvedTodos = this.todoService.getUnresolvedTodos(this.todos);
            this.$scope.dataFetching = false;
        });
      } else {
          this.todos = this.todoService.todos;
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
