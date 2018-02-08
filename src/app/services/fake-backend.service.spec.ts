import * as angular from 'angular';
import 'angular-mocks';
import { FakeBackendService } from './fake-backend.service';
import {UserConverterService} from './user-converter.service';
import {TodoConverterService} from './todo-converter.service';
import { FinalUser } from '../models/FinalUser';
import { Todo } from '../models/Todo';


describe('Fake backend Service', () => {

    let _$q: angular.IQService;
    let _fakeBackend: FakeBackendService;
    let scope: any;

    let users: FinalUser[] = [{
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
    }];

    let usersInServer: any = [{
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
    }];

    let user: FinalUser = users[0];


    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
        angular
            .module('app', [])
            .service('fakeBackend', FakeBackendService)
            .service('userConverter', UserConverterService)
            .service('todoConverter', TodoConverterService);


        angular.mock.module('app');
        angular.mock.inject((fakeBackend: FakeBackendService, $q: angular.IQService) => {
            _$q = $q;
            _fakeBackend = fakeBackend;
        });

        inject(function(_$rootScope_:any){
            scope = _$rootScope_.$new();
          })

    });



    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('should exist', () => {
        expect(_fakeBackend).toBeDefined();
    });


    it('should set into localStorage', () => {
        _fakeBackend.set('test', ['test']);
        let result = JSON.parse(localStorage.getItem('test'));
        expect(result[0]).toBe('test');
    });


    it('should get from localStorage', () => {
        localStorage.setItem('test', JSON.stringify(['test']));
        let result = _fakeBackend.get('test');
        expect(result[0]).toBe('test');
    });


    it('should remove from localStorage', () => {
        localStorage.setItem('test', JSON.stringify(['test']));
        _fakeBackend.remove('test');
        let result = JSON.parse(localStorage.getItem('test'));
        expect(result).toBe(null);
    });


    it('should get Users', () => {
        var users: Object[];
        _fakeBackend.set('users', [{firstname: 'hello', lastname: 'world'}]);
        _fakeBackend.getUsers().then((_users: Object[])=>{
            users = _users;
            expect(users[0].firstname).toBe('hello');
            expect(users[0].lastname).toBe('world');
        });
        
        jasmine.clock().tick(6000);
        scope.$digest();
    });


    it('should get todos by user', () => {
        localStorage.setItem('users', JSON.stringify(usersInServer));
       _fakeBackend.getTodosByUser(user).then((todos: any) => {
            expect(todos).toEqual(usersInServer[0].todosServer);
       });
       jasmine.clock().tick(6000);
       scope.$digest();
    });


    it('should frind users by props', ()=>{
        let user = _fakeBackend.findUserByProps(users, {name: 'John', 'password': '123'})
        expect(user).toEqual(users[0]);
    });


    it('should generate categories', () => {
        let categories: string[] = ['test'];
        _fakeBackend.generateCategories(categories);
        categories = JSON.parse(localStorage.getItem('categories'));
        expect(categories[0]).toBe('test');
    });


    it('should get categories', () => {
        localStorage.setItem('categories', JSON.stringify(['test']));
        _fakeBackend.getCategories().then((categories: string[]) => {
            expect(categories[0]).toBe('test');
        })
        jasmine.clock().tick(6000)
        scope.$digest();
    });

    
    it('should set Convert Users  and set them in localStorage', () => {
        _fakeBackend.setUsers(users).then((convertedUsers:any)=>{
            expect(convertedUsers[0]).toEqual(usersInServer[0]);
        });
        jasmine.clock().tick(6000)
        scope.$digest();
    })
});
