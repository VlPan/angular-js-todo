import { StyledCategory } from '../../models/StyledCategory';

export class CategoryConverterService {
    static selector = 'categoryConverter';
    constructor(

    ) {
        'ngInject';
    }

    convertCategories(categories: string[]){
        let styled = categories.map((category: string) => {
            return this.toStyledCategory(category);
        });
        return styled;
    }

    toStyledCategory(categoryName:string): StyledCategory{
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
