import { StyledCategory } from '../../models/StyledCategory';
import {FakeBackendService} from '../fake-backend/fake-backend.service';
import * as Rx from 'rxjs/Rx';
import {CategoryConverterService} from '../category-converter/category-converter.service';

export class CategoriesService {
    static selector = 'categoriesService';
    styledCategories$: any = new Rx.BehaviorSubject<string[]>([]);
    private styledCategories: StyledCategory[];

    
    constructor(
        private $q: angular.IQService,
        private fakeBackend: FakeBackendService,
        private categoryConverter: CategoryConverterService
    ) {
      'ngInject';
    }

    getCategoriesFromLs(){
            return this.fakeBackend.getCategories()
                .then((categories: string[]) => {
                    if(categories instanceof Array && categories.length !== 0){

                        this.styledCategories$.next(this.categoryConverter.convertCategories(categories));
                        return categories;
                        
                    }else{
                        this.styledCategories$.error('rejected categories. No categories in LS');
                    }
            });
    }

    getStyledCategories(){
        return this.styledCategories;
    }

    hasStyledCategories(){
        return !!this.styledCategories;
    }

    setStyledCategory(categories: string[]){
        return this.styledCategories = this.categoryConverter.convertCategories(categories);
    }
}
