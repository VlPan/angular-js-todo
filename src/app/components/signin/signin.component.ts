/**
 * Import the Component styles
 */
import './signin.component.scss';
import './btn.component.scss';
// import { Obj } from '@uirouter/angularjs';

/**
 * Import Services
 */
import { UserService } from '../../services/users.service';
import { ContactsService } from '../../services/contacts.service';
class SignInController {
    constructor(
        private $location: ng.ILocationService, 
        private userService: UserService,
        private contactsService: ContactsService
    ) {
        'ngInject';
      }

      $onInit(){
          if(this.userService.getUserName()){
            this.$location.url('/app/contact');
          }
      }
    
    submit(name: string): void {
        this.userService.signin(name);
        console.log(this.userService.getUserInfo());
        this.$location.url('/app/contact');
    }
}

export class SignIn implements angular.IComponentOptions {
    static selector = 'signin';
    static controller = SignInController;
    static template = require('./signin.component.html');
}
