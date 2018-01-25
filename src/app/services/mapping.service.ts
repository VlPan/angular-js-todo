import { Todo } from './../models/Todo';
import { FinalUser } from './../models/FinalUser';
export class MappingService{
    static selector = 'mappingService';
 

    constructor(
        private $q: angular.IQService
    ) {
      'ngInject';
    }

    mapUser(entity: any): FinalUser{
        return {
            name: entity.nameServer,
            password: entity.passwordServer,
            todos: entity.todosServer.map((todo:any) => this.mapTodo(todo))
        };
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

    mapUserToServer(user: FinalUser){
        return {
            nameServer: user.name,
            passwordServer: user.password,
            todosServer: user.todos.map((todo) => this.mapTodoToServer(todo))
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
