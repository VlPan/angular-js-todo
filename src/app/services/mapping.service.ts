import { Todo } from './../models/Todo';
import { FinalUser } from './../models/FinalUser';
import { User } from './../models/User';
export class MappingService{
    static selector = 'mappingService';
 

    constructor(
        private $q: angular.IQService
    ) {
      'ngInject';
    }

    mapUser(entity: any): FinalUser{
        return {
            name: entity.name,
            password: entity.password,
            todos: entity.todos
        };
    }

    mapTodo(entity: any): Todo{
        return {
            name: entity.name,
            body: entity.body,
            id: entity.id,
            creationDate: entity.creationDate,
            resolved: entity.resolved,
            categories: entity.categories,
            urgent: entity.urgent
        };
    }

}
