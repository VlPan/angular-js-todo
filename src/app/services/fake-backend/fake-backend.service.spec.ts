import * as angular from 'angular';
import 'angular-mocks';
import { FakeBackendService } from './fake-backend.service';
import {UserConverterService} from '../user-converter/user-converter.service';
import {TodoConverterService} from '../todo-converter/todo-converter.service';
import { FinalUser } from '../../models/FinalUser';
import {IRootScopeService } from 'angular';



describe('Fake backend Service', () => {

    let $q: angular.IQService;
    let fakeBackend: FakeBackendService;
    let scope: IRootScopeService;
    

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



    beforeEach(()=>{
        angular.mock.module('application.todos');
    });

    beforeEach(inject((_fakeBackend_: FakeBackendService, _$q_: angular.IQService, _$rootScope_:IRootScopeService) => {
        $q = _$q_;
        fakeBackend = _fakeBackend_;
        scope = _$rootScope_.$new();

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
    }));

    afterEach(function() {
        jasmine.clock().uninstall();
        localStorage.removeItem('users');
        localStorage.removeItem('categories');
    });

    it('should set into localStorage', () => {
        fakeBackend.set('test', ['test']);
        let result = JSON.parse(localStorage.getItem('test'));
        expect(result[0]).toBe('test');
    });


    it('should get from localStorage', () => {
        localStorage.setItem('test', JSON.stringify(['test']));
        let result = fakeBackend.get('test');
        expect(result[0]).toBe('test');
    });


    it('should remove from localStorage', () => {
        localStorage.setItem('test', JSON.stringify(['test']));
        fakeBackend.remove('test');
        let result = JSON.parse(localStorage.getItem('test'));
        expect(result).toBe(null);
    });


    it('should get Users', (done) => {
        var users: any;
        fakeBackend.set('users', usersInServer);
        fakeBackend.getUsers().then((_users: Object[])=>{
            users = _users;
            expect(users).toEqual(_users);
            done();
        });
        
        jasmine.clock().tick(6000);
        scope.$digest();
    });

    it('should get Users and if they are empty set them', (done) => {
        var users: any;
        localStorage.removeItem('users');
        fakeBackend.getUsers().then((_users: Object[])=>{
            users = JSON.parse(localStorage.getItem('users'));
            expect(users).toEqual([]);
            done();
        });
        
        jasmine.clock().tick(6000);
        scope.$digest();
    });


    it('should get todos by user', (done) => {
        localStorage.setItem('users', JSON.stringify(usersInServer));
       fakeBackend.getTodosByUser(user).then((todos: any) => {
            expect(todos).toEqual(usersInServer[0].todosServer);
            done();
       });
       jasmine.clock().tick(6000);
       scope.$digest();
    });

   
    it('should find users by props', ()=>{
        let user = fakeBackend.findUserByProps(users, {name: 'John', 'password': '123'});
        expect(user).toEqual(users[0]);
    });


    it('should generate categories', () => {
        let categories: string[] = ['test'];
        fakeBackend.generateCategories(categories);
        categories = JSON.parse(localStorage.getItem('categories'));
        expect(categories[0]).toBe('test');
    });


    it('should get categories', (done) => {
        localStorage.setItem('categories', JSON.stringify(['test']));
        fakeBackend.getCategories().then((categories: string[]) => {
            expect(categories[0]).toBe('test');
            done();
        });
        jasmine.clock().tick(6000);
        scope.$digest();
    });


    it('should set Convert Users  and set them in localStorage', (done) => {
        fakeBackend.setUsers(users).then((convertedUsers:any)=>{
            expect(convertedUsers[0]).toEqual(usersInServer[0]);
            done();
        });
        jasmine.clock().tick(6000);
        scope.$digest();
    });

    it('should has users', ()=>{
        localStorage.setItem('users', JSON.stringify(usersInServer));
        expect(fakeBackend.has('users')).toBe(true);
    });
});
