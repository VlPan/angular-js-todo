
import * as angular from 'angular';
import 'angular-mocks';
import { TodoService } from './todo.service';
import {IRootScopeService} from 'angular';
import {FakeBackendService} from '../fake-backend/fake-backend.service';
import {TodoConverterService} from '../todo-converter/todo-converter.service';
import {Todo} from '../../models/Todo';
import {FinalUser} from '../../models/FinalUser';
import {CategoryConverterService} from '../category-converter/category-converter.service';



describe('Todo Service', () => {

    let _$q: angular.IQService;
    let _todoService: TodoService;
    let _todoConverter: TodoConverterService;
    let _fakeBackend: FakeBackendService;
    let _categoryConverter: CategoryConverterService;
    let scope: IRootScopeService;

    let todos: Todo[] = [{
        id:1,
        name: 'test',
        body: 'test',
        resolved: false,
        creationDate: 1234,
        categories: ['home'],
        urgent: false
    }];
    let testTodo = todos[0];

    let todoInServer: any = {
        idServer:1,
        nameServer: 'test',
        bodyServer: 'test',
        resolvedServer: false,
        creationDateServer: 1234,
        categoriesServer: ['test'],
        urgentServer: false
    };

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();

        angular.mock.module('application.todos');
        angular.mock.inject((todoService: TodoService, $q: angular.IQService,
                             _$rootScope_: IRootScopeService, todoConverter: TodoConverterService,
                             fakeBackend: FakeBackendService, categoryConverter: CategoryConverterService) => {
            _$q = $q;
            _todoService = todoService;
            _todoConverter = todoConverter;
            _fakeBackend = fakeBackend;
            _categoryConverter = categoryConverter;
            scope = _$rootScope_.$new();
        });

        spyOn(_fakeBackend, 'setUsers').and.returnValue(_$q.resolve());
        spyOn(_fakeBackend, 'getTodosByUser').and.returnValue(_$q.resolve());

        _todoService.todos = [];
        _todoService.todos = _todoService.todos.concat(testTodo);
        _todoService.finalUser = {name: 'test', password: 'test', todos: [testTodo]};
        _todoService.users = [{name: 'test', password: 'test', todos: [testTodo]}];
    });


    afterEach(function () {
        jasmine.clock().uninstall();
    });




    it('should get All Todos from server', ()=>{
        _todoService.getAll();
        expect(_fakeBackend.getTodosByUser).toHaveBeenCalled();
    });

    it('should get Todos', ()=>{
        _todoService.todos = todos;
        expect(_todoService.getTodos()).toEqual(todos);
    });

    it('shold add new Todo and make unique id', (done)=>{

        let todoToAdd = {
            name: 'test',
            body: 'hello',
            urgent: false,
            categories: ['cat1', 'cat2']
        };


        _todoService.add(todoToAdd).then(()=>{

            let d = Date.now();
            let dateRange = [d-10, d-9, d-8, d-7, d-6, d-5, d-4, d-3, d-2 ,d-1, d,
                d+1, d+2, d+3, d+4, d+5, d+6,d+7, d+8, d+9, d+10];
            let expectedTodo = {
                id:2,
                name: 'test',
                body: 'hello',
                urgent: false,
                categories: ['cat1', 'cat2'],
                creationDate: dateRange.find((el) => el === _todoService.todos[1].creationDate),
                resolved: false
            };

            expect(_todoService.todos[1]).toEqual(expectedTodo);
            expect(_todoService.finalUser.todos.length).toBe(2);
            expect(_fakeBackend.setUsers).toHaveBeenCalled();
            expect(_todoService.users[0]).toEqual({
                name: 'test',
                password: 'test',
                todos: [testTodo, expectedTodo]
            });
            done();
        });

        jasmine.clock().tick(6000);
        scope.$digest();
    });

    it('should get resolved Todos', ()=>{
        let resolvedTodos = _todoService.getResolvedTodos(todos);
        expect(resolvedTodos.length).toBe(0);
    });

    it('should get unresolved Todos', ()=>{
        let unresolvedTodos = _todoService.getUnresolvedTodos(todos);
        expect(unresolvedTodos.length).toBe(1);
    });

    it('should remove todo', ()=>{
        _todoService.remove(1);
        expect(_todoService.todos.length).toBe(0);
        expect(_todoService.finalUser.todos.length).toBe(0);
        expect(_todoService.users).toEqual([{name: 'test', password: 'test', todos: []}]);
        expect(_fakeBackend.setUsers).toHaveBeenCalledWith([{name: 'test', password: 'test', todos: []}]);
    });

    it('should resolve todo', ()=> {
        _todoService.resolveTodo(1);
        expect(_todoService.finalUser.todos[0].resolved).toBe(true);
        expect(_todoService.todos[0].resolved).toBe(true);
        expect(_todoService.users[0].todos[0].resolved).toBe(true);
        testTodo.resolved = true;
        expect(_fakeBackend.setUsers).toHaveBeenCalledWith([{name: 'test', password: 'test', todos: [testTodo]}]);
    });

    it('should replace current User in User Array',()=>{
        let users: FinalUser[] = [{name: 'user1', password: 'test', todos: []}, {name: 'user2', password: 'test', todos: [testTodo]}];
        let currentUser: FinalUser = {name: 'user2', password: 'test', todos: []};
        users[1].todos = [];
        expect(_todoService.replaceCurrentUserInUsersArray(currentUser, users)).toEqual(users);
    });

    it('should style categories of todos', ()=>{

        spyOn(_categoryConverter, 'toStyledCategory');
        todos[0].categories = ['home', 'test', 'work'];
        todos = todos.concat({
            id:2,
            name: 'test2',
            body: 'test2',
            resolved: false,
            creationDate: 1234,
            categories: ['selfDeveloping', 'test'],
            urgent: false
        });
        _todoService.styleCategories(todos);
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('home');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('test');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('work');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('selfDeveloping');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledTimes(5);

    });



});
