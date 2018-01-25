import { StyledCategory } from './../../models/StyledCategory';
import { CategoriesService } from './../../services/categories.service';
import { LayoutService } from './../../services/layout.service';
import './add-todo-form.component.scss';
import * as angular from 'angular';
import * as Rx from 'rxjs/Rx';
import { UserService } from '../../services/users.service';
class AddTodoFormController {
  name: string;
  body: string;
  urgent: boolean;
  categories: string[] = [];
  styledCategores: StyledCategory[] = [];
  userIsSaving: boolean = false;
  todoAdded: ($event: { $event: { todo: { name: string, body: string, categories: string[], urgent: boolean }}}) => any;

  constructor(
    private layoutService: LayoutService,
    private categoriesService: CategoriesService,
    private userService: UserService
  ) {
    'ngInject';
  }

  $onInit(){
    if(this.categoriesService.hasStyledCategories){
      this.categoriesService.styledCategories$.subscribe((categories:any) => this.styledCategores = categories );
    }
  }

  $onChanges(){
    if(this.categoriesService.hasStyledCategories){
      this.styledCategores = this.categoriesService.getStyledCategories().map((category) => {
        return {
            ...category,
            selected : false
          };
      });
    }
    
  }

  submit() {
    
    
    const name = this.name;
    const body = this.body;
    const urgent = this.urgent;
    const categories = this.categories;
    console.log('User is saving');

    this.userIsSaving = true;
    this.todoAdded({
      $event: {
        todo: { name, body, categories, urgent}
      }
    }).then((resolve:any) => {
      this.name = '';
      this.body = '';
      this.layoutService.closeAddTodoForm();
      this.categories = [];
        angular.forEach(this.styledCategores, function(category: any) {
            category.selected = false;
        });
      console.log('User saved succesfully');
      this.userIsSaving = false;
    });
    
    
  }

  addCategory($event: any){
    let categoryName = $event.target.name;
    let categoryCheked = $event.target.checked; // true | false

    if(categoryName && categoryCheked){
      if(!this.isCategoryInArray(categoryName, this.categories)){
        this.categories = this.categories.concat($event.target.name);
      }
    }
    else if(categoryName && !categoryCheked){
      if(this.isCategoryInArray(categoryName, this.categories)){
        let index = this.categories.indexOf(categoryName);
        let removedArray:any = this.categories.splice(index, 1);
        let difference = this.categories.filter(x => !removedArray.includes(x));
        this.categories = difference;
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
