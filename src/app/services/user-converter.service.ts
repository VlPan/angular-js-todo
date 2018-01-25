import { FinalUser } from './../models/FinalUser';

import {TodoConverterService} from './todo-converter.service';
export class UserConverterService{
    static selector = 'userConverter';


    constructor(
        private $q: angular.IQService,
        private todoConverter: TodoConverterService
    ) {
        'ngInject';
    }

    mapUser(entity: any): FinalUser{
        return {
            name: entity.nameServer,
            password: entity.passwordServer,
            todos: entity.todosServer.map((todo:any) => this.todoConverter.mapTodo(todo))
        };
    }

    mapUserToServer(user: FinalUser){
        return {
            nameServer: user.name,
            passwordServer: user.password,
            todosServer: user.todos.map((todo) => this.todoConverter.mapTodoToServer(todo))
        };
    }


}
