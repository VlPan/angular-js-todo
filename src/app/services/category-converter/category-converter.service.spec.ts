import * as angular from 'angular';
import 'angular-mocks';
import { CategoryConverterService } from './category-converter.service';
import { StyledCategory } from '../../models/StyledCategory';



describe('Coategories-converter Service', () => {
    let categoryConverter: CategoryConverterService;

    beforeEach(()=>{
        angular.mock.module('application.todos');
    });

    beforeEach(inject((_categoryConverter_: CategoryConverterService) => {
        categoryConverter = _categoryConverter_;
    }));



    it('should convert category by `toStyle method`', ()=>{
        expect(categoryConverter.toStyledCategory('work')).toEqual(jasmine.any(StyledCategory));
        expect(categoryConverter.toStyledCategory('home')).toEqual(jasmine.any(StyledCategory));
        expect(categoryConverter.toStyledCategory('health')).toEqual(jasmine.any(StyledCategory));
        expect(categoryConverter.toStyledCategory('selfDeveloping')).toEqual(jasmine.any(StyledCategory));
        expect(categoryConverter.toStyledCategory('wrongTest')).not.toEqual(jasmine.any(StyledCategory));
    });

    it('should convert categories', () => {
        spyOn(categoryConverter, 'toStyledCategory');
        categoryConverter.convertCategories(['home', 'health', 'work', 'selfDeveloping']);
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('home');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('health');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('work');
        expect(categoryConverter.toStyledCategory).toHaveBeenCalledWith('selfDeveloping');
    });


});
