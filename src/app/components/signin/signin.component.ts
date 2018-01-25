import './signin.component.scss';
import './btn.component.scss';
import './loader.component.scss';

import { UserService } from '../../services/users.service';




class SignInController {
    infoFetching: boolean = false;
    constructor(
        private $state: angular.ui.IStateService,
        private userService: UserService,
        private $scope: any
    ) {
        'ngInject';
      }

    $onInit(){

        if(this.userService.isAuthorized()){
            alert('You are already authorized. Redirect to your todos!');
            this.$state.go('todos');
        }
    }
    
    submit(name: string, password: string): void {
        this.$scope.infoFetching = true;

        this.userService.signin(name, password).then(()=> {
            this.$scope.infoFetching = false;
            this.$state.go('todos');
        });
    }
}

export class SignIn implements angular.IComponentOptions {
    static selector = 'signin';
    static controller = SignInController;
    static template = require('./signin.component.html');
}
