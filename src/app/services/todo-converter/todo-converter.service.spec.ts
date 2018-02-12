import * as angular from 'angular';
import 'angular-mocks';
import {TodoConverterService} from './todo-converter.service';
import {Todo} from '../../models/Todo';


describe('Todos converter Service', ()=>{

    let todoConverter: TodoConverterService;


    let todo: Todo = {
        id:1,
        name: 'test',
        body: 'test',
        resolved: false,
        creationDate: 1234,
        categories: ['test'],
        urgent: false
    };

    let todoInServer: any = {
            idServer:1,
            nameServer: 'test',
            bodyServer: 'test',
            resolvedServer: false,
            creationDateServer: 1234,
            categoriesServer: ['test'],
            urgentServer: false
    };


    beforeEach(()=>{
        angular.mock.module('application.todos');
    });

    beforeEach(inject((_todoConverter_: TodoConverterService) => {
        todoConverter = _todoConverter_;
    }));

    it('should convert user from DTO', ()=>{
        expect(todoConverter.fromDto(todoInServer)).toEqual(todo);
    });

    it('should convert user to DTO', ()=>{
        expect(todoConverter.toDto(todo)).toEqual(todoInServer);
    });

});
