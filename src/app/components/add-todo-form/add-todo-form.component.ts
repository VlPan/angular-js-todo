import { LayoutService } from './../../services/layout.service';
import './add-todo-form.component.scss';
class AddTodoFormController {
  name: string;
  body: string;
  urgent: boolean;
  categories: string[] = [];
  todoAdded: ($event: { $event: { todo: { name: string, body: string, categories: string[], urgent: boolean }}}) => void;

  constructor(
    private layoutService: LayoutService,
  ) {
    'ngInject';
  }

  submit() {
    const name = this.name;
    const body = this.body;
    const urgent = this.urgent;
    console.log(urgent);
    const categories = this.categories;
    this.todoAdded({
      $event: {
        todo: { name, body, categories, urgent}
      }
    });
    this.name = '';
    this.body = '';
    this.layoutService.closeAddTodoForm();
  }

  addCategory($event: any){
    let categoryName = $event.target.name;
    let categoryCheked = $event.target.checked; // true | false

    if(categoryName && categoryCheked){
      if(!this.isCategoryInArray(categoryName, this.categories)){
        this.categories.push($event.target.name);
        console.log(this.categories);
      }
    }
    else if(categoryName && !categoryCheked){
      if(this.isCategoryInArray(categoryName, this.categories)){
        let index = this.categories.indexOf(categoryName);
        this.categories.splice(index, 1);
        console.log(this.categories);
      }
    }
  }

  private isCategoryInArray(category: any, categories: any[]){
    return categories.indexOf(category) !== -1;
  }

}

export class AddTodoForm implements angular.IComponentOptions {
  static selector = 'addTodoForm';

  static template = require('./add-todo-form.component.html');
  static bindings = {
    todoAdded: '&'
  };
  static controller = AddTodoFormController;
}
