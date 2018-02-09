import * as angular from 'angular';
import 'angular-mocks';
import { CategoriesService } from './categories.service';
import { IRootScopeService } from 'angular';


describe('Coategories Service', () => {

    let _$q: angular.IQService;
    let _categoriesService: CategoriesService;
    let scope: IRootScopeService;

    let _fakeBackend = {
        getCategories: jasmine.createSpy('getCategories'),
        set: jasmine.createSpy('set')
    };

    let _categoryConverter = {
        convertCategories: jasmine.createSpy('convertCategories')
    };


  beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
      jasmine.clock().install();
    angular
      .module('app', [])
      .service('categoriesService', CategoriesService)
      .value('fakeBackend', _fakeBackend)
      .value('categoryConverter', _categoryConverter);
      angular.mock.module('app');
      angular.mock.inject((categoriesService: CategoriesService, $q: angular.IQService, _$rootScope_:IRootScopeService) => {
          _$q = $q;
          _categoriesService = categoriesService;
          scope = _$rootScope_.$new();
      });
  });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

  it('should call `fakeBackend.getCategories`when getCategoriesFromLs called', () => {
    _fakeBackend.getCategories.and.returnValue(_$q.resolve());
    _categoriesService.getCategoriesFromLs();
    expect(_fakeBackend.getCategories).toHaveBeenCalled();
  });


  it('should call styledCategories$.next() when getCategoriesFromLs return NOT EMPTY array', (done)=>{
    let categories = ['test'];
    spyOn( _categoriesService.styledCategories$, 'next');
    _fakeBackend.getCategories.and.returnValue(_$q.resolve(categories));
    _categoriesService.getCategoriesFromLs().then((categories: any) => {
      expect(_categoriesService.styledCategories$.next).toHaveBeenCalled();
      done();
    });

    jasmine.clock().tick(6000);
    scope.$digest();
  });

  it('should call categoryConverter.convertCategories when getCategoriesFromLs return NOT EMPTY array', (done)=>{
    let categories = ['test'];
    _fakeBackend.getCategories.and.returnValue(_$q.resolve(categories));
    _categoriesService.getCategoriesFromLs().then((categories: any) => {
      expect(_categoryConverter.convertCategories).toHaveBeenCalled();
      done();
  });

    jasmine.clock().tick(6000);
    scope.$digest();
  });


  it('should call styledCategories$.error() when getCategoriesFromLs return EMPTY array', (done)=>{
    spyOn( _categoriesService.styledCategories$, 'error');
    _fakeBackend.getCategories.and.returnValue(_$q.resolve([]));
    _categoriesService.getCategoriesFromLs().then((categories: any) => {
      expect(_categoriesService.styledCategories$.error).toHaveBeenCalled();
      done();
    });

    jasmine.clock().tick(6000);
    scope.$digest();
  });

  it('should call convertCategories when set Styled Category', ()=>{
    let categories = ['work', 'home'];
    let convertedCats = _categoriesService.setStyledCategory(categories);
    expect(_categoryConverter.convertCategories).toHaveBeenCalled;
  });

});
