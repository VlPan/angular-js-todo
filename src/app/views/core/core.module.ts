// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';
import '@uirouter/angularjs';

import { App } from './components/app/app.component';
import { Root } from './components/root/root.component';


import { configuration } from './core.configuration';
import { routing } from './core.routes';

export const moduleName =
  angular.module('application.core', [
      'ui.router'
  ])


  .component(App.selector, App)
  .component(Root.selector, Root)


  .config(configuration)
  .config(routing)
  .name;
