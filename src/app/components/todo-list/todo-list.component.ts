import { StyledCategory } from './../../models/StyledCategory';
import { TodoService } from './../../services/todo.service';
import { CategoriesService } from './../../services/categories.service';
import { LayoutService } from './../../services/layout.service';

import './todo-list.component.scss';

import { UserService } from '../../services/users.service';
import {Todo} from '../../models/Todo';

class TodoListController {
  todos: any;
  resolvedTodos: any;
  unresolvedTodos: any;
  username: string;
  todoRemoved: ($event: { $event: { id: number }}) => void;
  todoResolved: ($event: { $event: { id: number }}) => void;
  constructor(
    private userService: UserService,
    private layoutService: LayoutService,
    private categoriesService: CategoriesService,
    private todoService: TodoService,
    private $scope: any,
    private $rootScope: any
) {
    'ngInject';
  }


  $onInit() {
    if(this.userService.isAuthorized()){
      this.username = this.userService.getUserName();
    }
    

    // setTimeout(()=>{
    //   this.todos = this.todoService.getTodos();
    //   console.log(this.todos);
    // },3000);
    
  }

  $onChanges(changesObj:any){
    console.log(this.unresolvedTodos);
    console.log(this.resolvedTodos);
    // let todoToMapNumber = changesObj.todos.currentValue.length-1;
    // let todoToMap = changesObj.todos.currentValue[todoToMapNumber];
    // console.log('todoToMap',todoToMap);
    //   this.todos = this.todos.map((todo:any)=>{
    //     console.log('todo!!!!', todo);
    //     todo.categories = todo.categories.map((category:string)=>{
    //       return this.categoriesService.bindIconToCategory(category);
    //     });
    //   });
    //   console.log('todos binding');
    //   console.log(this.todos);
  }


  remove(todo: Todo) {
      this.layoutService.deleteTodo().then(()=>{
          this.todoRemoved({
              $event: {
                        id: todo.id
                     }
          });
          this.$scope.$applyAsync();
      });
  }


  resolve(todo: Todo) {
    this.todoResolved({
      $event: {
          id: todo.id
      }
    });
  }



}

export class TodoListComponent implements angular.IComponentOptions {

  static selector = 'todoList';
  static bindings = {
      todos: '<',
      resolvedTodos: '<',
      unresolvedTodos: '<',
      todoRemoved: '&',
      todoResolved: '&'
  };
  static controller = TodoListController;
  static template = require('./todo-list.component.html');

}
