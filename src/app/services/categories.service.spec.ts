import * as angular from 'angular';
import 'angular-mocks';
import { CategoriesService } from './categories.service';

describe('Contacts container', () => {

    let _fakeBackend = {
        getCategories: jasmine.createSpy('getCategories')
    };

    let _categoryConverter = {
        convertCategories: jasmine.createSpy('convertCategories')
    };


  beforeEach(() => {
    angular
      .module('app', [])
      .service('categoriesService', CategoriesService)
      .value('fakeBackend', _fakeBackend)
      .value('categoryConverter', _categoryConverter);
    angular.mock.module('app');
  });

  it('should exist', angular.mock.inject((categoriesService: CategoriesService) => {
    expect(categoriesService).toBeDefined();
  }));
});
