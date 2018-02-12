import * as angular from 'angular';
import 'angular-mocks';
import { LayoutService } from './layout.service';




let layoutService: LayoutService;

describe('Layout Service', () => {

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
        angular
            .module('app', [])
            .service('_layoutService', LayoutService);


        angular.mock.module('app');
        angular.mock.inject((_layoutService: LayoutService) => {
            layoutService = _layoutService;
        });
    });

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
