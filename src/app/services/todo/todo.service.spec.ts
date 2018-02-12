
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

    let $q: angular.IQService;
    let todoService: TodoService;
    let todoConverter: TodoConverterService;
    let fakeBackend: FakeBackendService;
    let categoryConverter: CategoryConverterService;
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

    beforeEach(()=>{
        angular.mock.module('application.todos');
    });

    beforeEach(inject((_todoService_: TodoService, _$q_: angular.IQService,
        _$rootScope_: IRootScopeService, _todoConverter_: TodoConverterService,
        _fakeBackend_: FakeBackendService, _categoryConverter_: CategoryConverterService) => {
       
        $q = _$q_;
        todoService = _todoService_;
        todoConverter = _todoConverter_;
        fakeBackend = _fakeBackend_;
        categoryConverter = _categoryConverter_;
        scope = _$rootScope_.$new();

        spyOn(fakeBackend, 'setUsers').and.returnValue($q.resolve());
        spyOn(fakeBackend, 'getTodosByUser').and.returnValue($q.resolve());

        todoService.todos = [];
        todoService.todos = todoService.todos.concat(testTodo);
        todoService.finalUser = {name: 'test', password: 'test', todos: [testTodo]};
        todoService.users = [{name: 'test', password: 'test', todos: [testTodo]}];

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
    }));

    afterEach(function () {
        jasmine.clock().uninstall();
    });




    it('should get All Todos from server', ()=>{
        todoService.getAll();
        expect(fakeBackend.getTodosByUser).toHaveBeenCalled();
    });

    it('should get Todos', ()=>{
        todoService.todos = todos;
        expect(todoService.getTodos()).toEqual(todos);
    });

    it('shold add new Todo and make unique id', (done)=>{

        let todoToAdd = {
            name: 'test',
            body: 'hello',
            urgent: false,
            categories: ['cat1', 'cat2']
        };


        todoService.add(todoToAdd).then(()=>{

            let d = Date.now();
            let dateRange = [d-10, d-9, d-8, d-7, d-6, d-5, d-4, d-3, d-2 ,d-1, d,
                d+1, d+2, d+3, d+4, d+5, d+6,d+7, d+8, d+9, d+10];
            let expectedTodo = {
                id:2,
                name: 'test',
                body: 'hello',
                urgent: false,
                categories: ['cat1', 'cat2'],
                creationDate: dateRange.find((el) => el === todoService.todos[1].creationDate),
                resolved: false
            };

            expect(todoService.todos[1]).toEqual(expectedTodo);
            expect(todoService.finalUser.todos.length).toBe(2);
            expect(fakeBackend.setUsers).toHaveBeenCalled();
            expect(todoService.users[0]).toEqual({
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
        let resolvedTodos = todoService.getResolvedTodos(todos);
        expect(resolvedTodos.length).toBe(0);
    });

    it('should get unresolved Todos', ()=>{
        let unresolvedTodos = todoService.getUnresolvedTodos(todos);
        expect(unresolvedTodos.length).toBe(1);
    });

    it('should remove todo', ()=>{
        todoService.remove(1);
        expect(todoService.todos.length).toBe(0);
        expect(todoService.finalUser.todos.length).toBe(0);
        expect(todoService.users).toEqual([{name: 'test', password: 'test', todos: []}]);
        expect(fakeBackend.setUsers).toHaveBeenCalledWith([{name: 'test', password: 'test', todos: []}]);
    });

    it('should resolve todo', ()=> {
        todoService.resolveTodo(1);
        expect(todoService.finalUser.todos[0].resolved).toBe(true);
        expect(todoService.todos[0].resolved).toBe(true);
        expect(todoService.users[0].todos[0].resolved).toBe(true);
        testTodo.resolved = true;
        expect(fakeBackend.setUsers).toHaveBeenCalledWith([{name: 'test', password: 'test', todos: [testTodo]}]);
    });

    it('should replace current User in User Array',()=>{
        let users: FinalUser[] = [{name: 'user1', password: 'test', todos: []}, {name: 'user2', password: 'test', todos: [testTodo]}];
        let currentUser: FinalUser = {name: 'user2', password: 'test', todos: []};
        users[1].todos = [];
        expect(todoService.replaceCurrentUserInUsersArray(currentUser, users)).toEqual(users);
    });

    it('should style categories of todos', ()=>{

        spyOn(categoryConverter, 'toStyledCategory');
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
        todoService.styleCategories(todos);
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('home');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('test');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('work');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('selfDeveloping');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledTimes(5);

    });



});
