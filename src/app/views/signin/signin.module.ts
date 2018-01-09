// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';

/**
 * Import Module Components
 */

import { SignIn } from '../../components/signin/signin.component';

/**
 * Import Module Containers
 */


/**
 * Import Module Services
 */


/**
 * Import Module Routing
 */
import { routing } from './signin.routes';

export const moduleName =
    angular.module('application.signin', [
        'ui.router'
    ])

    /**
     * Register Module Components
     */
        .component(SignIn.selector, SignIn)

        /**
         * Register Module Containers
         */
        /**
         * Register Module Services
         */

        /**
         * Register Module Configuration
         */
        .config(routing)
        .name;
