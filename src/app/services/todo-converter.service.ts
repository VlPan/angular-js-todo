import { Todo } from './../models/Todo';
export class TodoConverterService{
    static selector = 'todoConverter';


    constructor(
        private $q: angular.IQService
    ) {
        'ngInject';
    }


    mapTodo(entity: any): Todo{
        return {
            name: entity.nameServer,
            body: entity.bodyServer,
            id: entity.idServer,
            creationDate: entity.creationDateServer,
            resolved: entity.resolvedServer,
            categories: entity.categoriesServer,
            urgent: entity.urgentServer
        };
    }


    mapTodoToServer(todo: Todo){
        return {
            nameServer: todo.name,
            bodyServer: todo.body,
            idServer: todo.id,
            creationDateServer: todo.creationDate,
            resolvedServer: todo.resolved,
            categoriesServer: todo.categories,
            urgentServer: todo.urgent
        };
    }

}
