export class LayoutService{
    static selector = 'layoutService';
    isAddTodoFormOpen: boolean = false;
    todoIsDeleting: boolean = false;

    constructor(
        private $q: angular.IQService
    ) {
      'ngInject';
    }
  
    toggleAddTodoForm(){
        return this.isAddTodoFormOpen = !this.isAddTodoFormOpen;
    }

    closeAddTodoForm(){
        return this.isAddTodoFormOpen = false;
    }

    deleteTodo(callback: any, arg: any): void{
        this.todoIsDeleting = true;
        setTimeout(()=>{
            callback(arg);
            this.todoIsDeleting = false;
        }, 400);
       
    }
}
