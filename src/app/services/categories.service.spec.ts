import * as angular from 'angular';
import 'angular-mocks';
import { CategoriesService } from './categories.service';


describe('Coategories Service', () => {

    let _$q: angular.IQService;
    let _categoriesService: CategoriesService;
    let timerCallback = jasmine.createSpy('timerCallback');


    let _fakeBackend = {
        getCategories: jasmine.createSpy('getCategories'),
        set: jasmine.createSpy('set')
    };

    let _categoryConverter = {
        convertCategories: jasmine.createSpy('convertCategories')
    };


  beforeEach(() => {
      jasmine.clock().install();
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
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
  });

    afterEach(function() {
        jasmine.clock().uninstall();
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
