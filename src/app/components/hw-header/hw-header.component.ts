import { UserService } from '../../services/users/users.service';

import './hw-header.component.scss';

class HeaderController {
  userName: string;
  constructor(
      private userService: UserService,
      private $state: angular.ui.IStateService,
      private $window: angular.IWindowService
  ) {
      'ngInject';
      this.userName = this.userService.getUserName();
    }

  signout(){
    this.userService.signout();
    this.$state.go('signin');
    this.$window.location.reload();
  }
}

export class HeaderComponent implements angular.IComponentOptions {
  static selector = 'hwHeader';
  static controller = HeaderController;
  static template = require('./hw-header.component.html');
}
