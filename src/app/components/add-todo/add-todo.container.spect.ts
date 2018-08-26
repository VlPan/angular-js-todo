import * as angular from 'angular';
import 'angular-mocks';
import { AddTodoContainer } from './add-todo.container';
import { IRootScopeService } from 'angular';


describe('AddTodoForm component', () => {


    let ctrl:any;
    let $q: angular.IQService;
    let scope: IRootScopeService;

    let _todoService = {
        add: jasmine.createSpy('add')
    };

    let _layoutService = {
        closeAddTodoForm: jasmine.createSpy('closeAddTodoForm')
    };


    beforeEach(()=>{
        angular.mock.module('application.todos');
    })

    beforeEach((inject(($componentController: any, _$q_:angular.IQService, _$rootScope_:IRootScopeService)=>{
        $q = _$q_;
        scope = _$rootScope_.$new();
        ctrl = $componentController(AddTodoContainer.selector, {}, {
            fetchData: ()=>{}
        });


        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
    })));

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('should exist', angular.mock.inject(($componentController: any) => {
        expect(ctrl).toBeDefined();
    }));

    it('should call `layoutService.closeAddTodoForm()` by method `closeForm`', ()=>{
        spyOn(ctrl.layoutService, 'closeAddTodoForm');
        ctrl.closeForm();
        expect(ctrl.layoutService.closeAddTodoForm).toHaveBeenCalled();
    });

    it('should add new todo', (done)=>{
        const testTodo = {name: 'test', body: 'test', categories: ['test'], urgent: false};
        spyOn(ctrl.todoService, 'add').and.returnValue($q.resolve());
        spyOn(ctrl, 'fetchData');
        ctrl.add(testTodo).then(()=>{
            expect(ctrl.todoService.add).toHaveBeenCalledWith(testTodo);
            expect(ctrl.fetchData).toHaveBeenCalled();

            done();
        });
        jasmine.clock().tick(6000);
        scope.$digest();
    });
});
