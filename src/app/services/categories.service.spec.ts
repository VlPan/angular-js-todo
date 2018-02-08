import * as angular from 'angular';
import 'angular-mocks';
import { CategoriesService } from './categories.service';


describe('Contacts container', () => {

    let _$q: angular.IQService;
    let _categoriesService: CategoriesService;

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
      angular.mock.inject((categoriesService: CategoriesService, $q: angular.IQService) => {
          _$q = $q;
          _categoriesService = categoriesService;
      });

  });

  it('should exist', () => {
    expect(_categoriesService).toBeDefined();
  });


  it('should call `fakeBackend.getCategories`when getCategoriesFromLs called', () => {
    _fakeBackend.getCategories.and.returnValue(_$q.resolve());
    _categoriesService.getCategoriesFromLs();
    expect(_fakeBackend.getCategories).toHaveBeenCalled();
  });

});
