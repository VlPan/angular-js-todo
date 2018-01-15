
import './polyfills';
import './vendor';


import './css-settings/index.scss';


import * as angular from 'angular';


import { moduleName as appModule } from './app/app.module';

const bootstrapModuleName = angular.module('application.bootstrap', [
  appModule
]).name;
