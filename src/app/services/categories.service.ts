import { StyledCategory } from './../models/StyledCategory';
import {LocalStorageService} from './localStorage.service';

export class CategoriesService {

    static selector = 'categoriesService';
    private styledCategories: StyledCategory[];

    constructor(
        private $q: angular.IQService,
        private localStorage: LocalStorageService
    ) {
      'ngInject';
    }

    getCategoriesFromLs(){
        return this.$q((resolve, reject) => {
            this.localStorage.getCategories().then((categories: string[]) => {
                    if(categories instanceof Array && categories.length !== 0){
                        this.setStyledCategory(categories);
                        resolve(categories);
                        
                    }else{
                        console.log('rejected categories. No categories in LS');
                        reject(new Error('rejected categories. No categories in LS'));
                    }
            });
           
        });
    }

    getStyledCategories(){
        return this.styledCategories;
    }

    hasStyledCategories(){
        return !!this.styledCategories;
    }

    setStyledCategory(categories: string[]){
        console.log(categories);
        let styled = categories.map((category: string) => {
            return this.bindIconToCategory(category);
        });
        this.styledCategories =  styled;
    }

    bindIconToCategory(categoryName:string): StyledCategory{
        switch(categoryName){
            case 'work':  
            return new StyledCategory(categoryName, 'briefcase', 'blue');
           
            case 'home':
            return new StyledCategory(categoryName, 'home', 'yellow');
           
            case 'health':
            return new StyledCategory(categoryName, 'heart', 'pink');
           
            case 'selfDeveloping': 
            return new StyledCategory(categoryName, 'diamond', 'green');
          
        }
    }


}
