export class CategoriesService {

    static selector = 'categoriesService';

    constructor(
        private $q: angular.IQService
    ) {
      'ngInject';
    }

    bindIconToCategory(categoryName:string){
        switch(categoryName){
            case 'work':  
            return {
                name: categoryName,
                icon: 'briefcase',
                modificator: 'blue'
            };

            case 'home':
            return {
                name: categoryName,
                icon: 'home',
                modificator: 'yellow'
            };
            
            case 'health':
            return {
                name: categoryName,
                icon: 'heart',
                modificator: 'pink'
            };
            

            case 'selfDeveloping': 
            return {
                name: categoryName,
                icon: 'diamond',
                modificator: 'green'
            };
        }
    }
}
