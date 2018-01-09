import { SignIn } from '../../components/signin/signin.component';


export const routing = ($stateProvider: angular.ui.IStateProvider) => {
    'ngInject';
    $stateProvider
        .state('signin', {
            parent: 'app',
            url: '/signin',
            component: SignIn.selector
        });
};
