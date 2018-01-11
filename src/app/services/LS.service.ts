export class LocalStorage{
    static selector = 'localStorage';

    constructor(
        private $q: angular.IQService
    ) {
      'ngInject';
    }

    set(name:string, item: any):void {
        localStorage.setItem(name, JSON.stringify(item));
    }

    get(name:string): any {
        return JSON.parse(localStorage.getItem(name));
    }

    remove(name: string): void {
        localStorage.removeItem(name);
    }
}
