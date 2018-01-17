import { UserService } from './../../services/users.service';

import './hw-header.component.scss';

class HeaderController {
  userName: string;
  // private isAddTodoFormOpen: boolean = false;
  constructor(
      private userService: UserService,
      private $state: angular.ui.IStateService,
  ) {
      'ngInject';
      this.userName = this.userService.getUserName();
      console.log(this.userName);
    }

  signout(){
    this.userService.signout();
    this.$state.go('signin');
  }
}

export class HeaderComponent implements angular.IComponentOptions {
  static selector = 'hwHeader';
  static controller = HeaderController;
  static template = require('./hw-header.component.html');
}
