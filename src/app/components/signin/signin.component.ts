/**
 * Import the Component styles
 */
import './signin.component.scss';
import './btn.component.scss';
import { Obj } from '@uirouter/angularjs';

class SignInController {
    name: string = 'Jane';
    constructor(
        private $location: ng.ILocationService
    ) {
        'ngInject';
      }
    
    submit(name: string): void {
        console.log(name);
        this.$location.url('/app/contact/' + name);
    }
}

export class SignIn implements angular.IComponentOptions {
    static selector = 'signin';
    static controller = SignInController;
    static template = require('./signin.component.html');
}
