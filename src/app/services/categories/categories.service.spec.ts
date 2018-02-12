import * as angular from 'angular';
import 'angular-mocks';
import { CategoriesService } from './categories.service';
import { IRootScopeService } from 'angular';
import { FakeBackendService } from '../fake-backend/fake-backend.service';
import { CategoryConverterService } from '../category-converter/category-converter.service';


describe('Coategories Service', () => {

    let $q: angular.IQService;
    let categoriesService: CategoriesService;
    let scope: IRootScopeService;
    let fakeBackend: FakeBackendService;
    let categoryConverter: CategoryConverterService;

    beforeEach(()=>{
      angular.mock.module('application.todos');
    })

    beforeEach(inject((_categoriesService_: CategoriesService, _$q_: angular.IQService, _$rootScope_:IRootScopeService,
      _fakeBackend_: FakeBackendService, _categoryConverter_: CategoryConverterService)=>{
      
      $q = _$q_;
      categoriesService = _categoriesService_;
      fakeBackend = _fakeBackend_;
      categoryConverter = _categoryConverter_;
      scope = _$rootScope_.$new();

      jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
      jasmine.clock().install();

    
      spyOn(fakeBackend, 'set');
      spyOn(categoryConverter, 'convertCategories');
    
    }));

    afterEach(function() {
        jasmine.clock().uninstall();
    });

  it('should call `fakeBackend.getCategories`when getCategoriesFromLs called', () => {
    spyOn(fakeBackend, 'getCategories').and.returnValue($q.resolve());
    categoriesService.getCategoriesFromLs();
    expect(fakeBackend.getCategories).toHaveBeenCalled();
  });


  it('should call styledCategories$.next() when getCategoriesFromLs return NOT EMPTY array', (done)=>{
    
    spyOn( categoriesService.styledCategories$, 'next');
    let categories = ['test'];
    spyOn(fakeBackend, 'getCategories').and.returnValue($q.resolve(categories));
    categoriesService.getCategoriesFromLs().then((categories: any) => {
      expect(categoriesService.styledCategories$.next).toHaveBeenCalled();
      done();
    });

    jasmine.clock().tick(6000);
    scope.$digest();
  });

  it('should call categoryConverter.convertCategories when getCategoriesFromLs return NOT EMPTY array', (done)=>{
    let categories = ['test'];
    spyOn(fakeBackend, 'getCategories').and.returnValue($q.resolve(categories));
    categoriesService.getCategoriesFromLs().then((categories: any) => {
      expect(categoryConverter.convertCategories).toHaveBeenCalled();
      done();
  });

    jasmine.clock().tick(6000);
    scope.$digest();
  });


  it('should call styledCategories$.error() when getCategoriesFromLs return EMPTY array', (done)=>{
    spyOn( categoriesService.styledCategories$, 'error');
    spyOn(fakeBackend, 'getCategories').and.returnValue($q.resolve([]));
    categoriesService.getCategoriesFromLs().then((categories: any) => {
      expect(categoriesService.styledCategories$.error).toHaveBeenCalled();
      done();
    });

    jasmine.clock().tick(6000);
    scope.$digest();
  });

  it('should call convertCategories when set Styled Category', ()=>{
    let categories = ['work', 'home'];
    categoriesService.setStyledCategory(categories);
    expect(categoryConverter.convertCategories).toHaveBeenCalled();
  });

});
