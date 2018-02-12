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

    deleteTodo(){
        this.todoIsDeleting = true;
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                this.todoIsDeleting = false;
                resolve();
            }, 400);
        });
    }

}
