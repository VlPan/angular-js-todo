import * as angular from 'angular';
import 'angular-mocks';
import { LayoutService } from './layout.service';




let layoutService: LayoutService;

describe('Layout Service', () => {

    
    beforeEach(()=>{
        angular.mock.module('application.todos');
    });

    beforeEach(inject((_layoutService_: LayoutService) => {
        layoutService = _layoutService_;

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
    }));

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('should toggle addTodoForm', () => {
        layoutService.isAddTodoFormOpen = true;
        layoutService.toggleAddTodoForm();
        expect(layoutService.isAddTodoFormOpen).toBe(false);
        layoutService.toggleAddTodoForm();
        expect(layoutService.isAddTodoFormOpen).toBe(true);
    });

    it('should close addTodoForm', () => {
        layoutService.isAddTodoFormOpen = true;
        layoutService.closeAddTodoForm();
        expect(layoutService.isAddTodoFormOpen).toBe(false);
    });

    it('should make delay before delete todo', (done) => {
        let promice = layoutService.deleteTodo();
        expect(layoutService.todoIsDeleting).toBe(true);
        promice.then(()=>{
            expect(layoutService.todoIsDeleting).toBe(false);
            done();
        });
        jasmine.clock().tick(500);
    });
});
