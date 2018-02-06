import * as angular from 'angular';
import 'angular-mocks';
import { AddTodoContainer } from './add-todo.container';

describe('AddContactForm component', () => {

    let _todoService = {
        add: jasmine.createSpy('add')
    };

    let _layoutService = {
        closeAddTodoForm: jasmine.createSpy('closeAddTodoForm')
    };


    beforeEach(() => {
        angular
            .module('app', [])
            .component(AddTodoContainer.selector, AddTodoContainer)
            .value('todoService', _todoService)
            .value('layoutService', _layoutService);
        angular.mock.module('app');
    });

    it('should exist', angular.mock.inject(($componentController: any) => {
        const component = $componentController(AddTodoContainer.selector, {}, {});
        expect(component).toBeDefined();
    }));
});
