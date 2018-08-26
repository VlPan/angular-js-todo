import './signin.component.scss';
import './btn.component.scss';
import './loader.component.scss';

import { UserService } from '../../services/users/users.service';
import { Boverage } from '../../OOP-Templates/Decorator/Boverage';
import { Expresso } from './../../OOP-Templates/Decorator/drinks/Expresso';
import { Mocha } from '../../OOP-Templates/Decorator/decorators/Mocha';
import { Soy } from '../../OOP-Templates/Decorator/decorators/Soy';




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
        this.userService.checkIfLogged();

        // test
        let boverage = new Expresso();
        boverage = new Mocha(boverage);
        boverage = new Mocha(boverage);
        boverage = new Soy(boverage);
        console.log(boverage.cost());
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
