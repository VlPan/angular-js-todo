import './signin.component.scss';
import './btn.component.scss';

import { User } from '../../models/User';

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
          if(this.userService.isAuthorized()){
            alert('You are already authorized. Redirect to your todos!');
            this.$location.url('/app/todo');
          }
      }
    
    submit(name: string, password: string): void {
        this.userService.signin(name, password);

        console.log(this.userService.getUserInfo());
        this.$location.url('/app/todo');
    }
}

export class SignIn implements angular.IComponentOptions {
    static selector = 'signin';
    static controller = SignInController;
    static template = require('./signin.component.html');
}
