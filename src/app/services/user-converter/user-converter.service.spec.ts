import * as angular from 'angular';
import 'angular-mocks';

import {FinalUser} from '../../models/FinalUser';
import {UserConverterService} from './user-converter.service';
import {TodoConverterService} from '../todo-converter/todo-converter.service';

describe('User converter Service', ()=>{

   let userConverter: UserConverterService;

    let user: FinalUser = {
        name: 'John',
        password: '123',
        todos: [{
            id:1,
            name: 'test',
            body: 'test',
            resolved: false,
            creationDate: 1234,
            categories: ['test'],
            urgent: false
        }]
    };

    let userInServer: any = {
        nameServer: 'John',
        passwordServer: '123',
        todosServer: [{
            idServer:1,
            nameServer: 'test',
            bodyServer: 'test',
            resolvedServer: false,
            creationDateServer: 1234,
            categoriesServer: ['test'],
            urgentServer: false
        }]
    };


    beforeEach(()=>{
        angular.mock.module('application.todos');
    });

    beforeEach(inject((_userConverter_: UserConverterService) => {
        userConverter = _userConverter_;
    }));

   it('should convert user from DTO', ()=>{
       expect(userConverter.fromDto(userInServer)).toEqual(user);
   });

    it('should convert user to DTO', ()=>{
        expect(userConverter.toDto(user)).toEqual(userInServer);
    });

});
