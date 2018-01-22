import { StyledCategory } from './../../models/StyledCategory';
import { CategoriesService } from './../../services/categories.service';
import { LayoutService } from './../../services/layout.service';
import './add-todo-form.component.scss';
class AddTodoFormController {
  name: string;
  body: string;
  urgent: boolean;
  categories: string[] = [];
  styledCategores: StyledCategory[] = [];
  todoAdded: ($event: { $event: { todo: { name: string, body: string, categories: string[], urgent: boolean }}}) => void;

  constructor(
    private layoutService: LayoutService,
    private categoriesService: CategoriesService
  ) {
    'ngInject';
  }

  $onInit(){
    if(this.categoriesService.hasStyledCategories){
      console.log('INITED!');
      this.styledCategores = this.categoriesService.getStyledCategories();
      console.log(this.styledCategores);
    }
  }

  $onChanges(){
    if(this.categoriesService.hasStyledCategories){
      console.log('CAHNGED!');
      this.styledCategores = this.categoriesService.getStyledCategories();
      console.log(this.styledCategores);
    }
    
  }

  submit() {
    const name = this.name;
    const body = this.body;
    const urgent = this.urgent;
    const categories = this.categories;
    console.log(categories);
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
        this.categories = this.categories.concat($event.target.name);
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
