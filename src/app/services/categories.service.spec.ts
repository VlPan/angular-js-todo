import * as angular from 'angular';
import 'angular-mocks';
import { CategoriesService } from './categories.service';


describe('Contacts container', () => {

    let _$q: angular.IQService;
    let _categoriesService: CategoriesService;

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
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;
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

    it('should call `categoryConverter.convertCategories` when categories is not empty', (done) => {
        _fakeBackend.set.and.callFake(()=>{
            localStorage.setItem('categories', JSON.stringify(['test']));
        });
        _fakeBackend.getCategories.and.returnValue(_$q.resolve());

        _categoriesService.getCategoriesFromLs().then((categories: string[])=>{
            expect(categories.length).toBe(1);
            expect(_categoryConverter.convertCategories).toHaveBeenCalled();
            done();
        });
    });

    it('takes a long time', (done) => {
        setTimeout(function() {
            done();
        }, 3000);
    });

});
