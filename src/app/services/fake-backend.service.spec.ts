import * as angular from 'angular';
import 'angular-mocks';
import { FakeBackendService } from './fake-backend.service';
import {UserConverterService} from './user-converter.service';
import {TodoConverterService} from './todo-converter.service';


describe('Fake backend Service', () => {

    let _$q: angular.IQService;
    let _fakeBackend: FakeBackendService;

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        jasmine.clock().install();
        angular
            .module('app', [])
            .service('fakeBackend', FakeBackendService)
            .service('userConverter', UserConverterService)
            .service('todoConverter', TodoConverterService);

        angular.mock.module('app');
        angular.mock.inject((fakeBackend: FakeBackendService, $q: angular.IQService) => {
            _$q = $q;
            _fakeBackend = fakeBackend;
        });
    });



    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('should exist', () => {
        expect(_fakeBackend).toBeDefined();
    });

    it('should set into localStorage', () => {
        _fakeBackend.set('test', ['test']);
        let result = JSON.parse(localStorage.getItem('test'));
        expect(result[0]).toBe('test');
    });

    it('should get from localStorage', () => {
        localStorage.setItem('test', JSON.stringify(['test']));
        let result = _fakeBackend.get('test');
        expect(result[0]).toBe('test');
    });

    it('should remove from localStorage', () => {
        localStorage.setItem('test', JSON.stringify(['test']));
        _fakeBackend.remove('test');
        let result = _fakeBackend.get('test');
        expect(result).toBe(null);
    });

    it('should get Users', () => {
        var users;
        _fakeBackend.set('users', [{firstname: 'hello', lastname: 'world'}]);
        _fakeBackend.getUsers().then((_users)=>{
            users = _users;
            expect(users).toBeDefined();
        });
        jasmine.clock().tick(6000);
    });


});
