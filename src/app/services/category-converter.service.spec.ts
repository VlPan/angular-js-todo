import * as angular from 'angular';
import 'angular-mocks';
import { CategoryConverterService } from './category-converter.service';
import { StyledCategory } from '../models/StyledCategory';



describe('Coategories Service', () => {
    let _categoryConverter: CategoryConverterService;
  beforeEach(() => {
    angular
      .module('app', [])
      .service('categoryConverter', CategoryConverterService)
      angular.mock.module('app');
      angular.mock.inject((categoryConverter: CategoryConverterService) => {
        _categoryConverter = categoryConverter;
      });
  });



    it('should convert category by `toStyle method`', ()=>{
        expect(_categoryConverter.toStyledCategory('work')).toEqual(jasmine.any(StyledCategory));
        expect(_categoryConverter.toStyledCategory('home')).toEqual(jasmine.any(StyledCategory));
        expect(_categoryConverter.toStyledCategory('health')).toEqual(jasmine.any(StyledCategory));
        expect(_categoryConverter.toStyledCategory('selfDeveloping')).toEqual(jasmine.any(StyledCategory));
        expect(_categoryConverter.toStyledCategory('wrongTest')).not.toEqual(jasmine.any(StyledCategory));
    })

    it('should convert categories', () => {
        spyOn(_categoryConverter, 'toStyledCategory');
        let convertedCategories = _categoryConverter.convertCategories(['home', 'health', 'work', 'selfDeveloping']);
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('home');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('health');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('work');
        expect(_categoryConverter.toStyledCategory).toHaveBeenCalledWith('selfDeveloping');
    });


});
