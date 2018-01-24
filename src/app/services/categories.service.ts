import { StyledCategory } from './../models/StyledCategory';
import {FakeBackendService} from './fake-backend.service';
import * as Rx from 'rxjs/Rx';

export class CategoriesService {
    static selector = 'categoriesService';
    styledCategories$: any = new Rx.BehaviorSubject<string[]>([]);
    private styledCategories: StyledCategory[];

    
    constructor(
        private $q: angular.IQService,
        private fakeBackend: FakeBackendService
    ) {
      'ngInject';
    }

    getCategoriesFromLs(){
       
        
       
        return this.$q((resolve, reject) => {
            this.fakeBackend.getCategories().then((categories: string[]) => {
                    if(categories instanceof Array && categories.length !== 0){
                        this.styledCategories$.next(this.setStyledCategory(categories));
                        resolve(categories);
                        
                    }else{
                        console.log('rejected categories. No categories in LS');
                        this.styledCategories$.error('rejected categories. No categories in LS');
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
        return this.styledCategories =  styled;
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
