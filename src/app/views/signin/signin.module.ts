
import * as angular from 'angular';


import { SignIn } from '../../components/signin/signin.component';

import { UserService } from '../../services/users.service';

import { routing } from './signin.routes';
import { FakeBackendService } from '../../services/fake-backend.service';


export const moduleName =
    angular.module('application.signin', [
        'ui.router'
    ])

 
        .component(SignIn.selector, SignIn)

        .service(UserService.selector, UserService)
        .service(FakeBackendService.selector, FakeBackendService)
        
        .config(routing)
        .name;
