
import './polyfills';
import './vendor';


import './css-settings/index.scss';
import * as angular from 'angular';


import { moduleName as appModule } from './app/app.module';

export const bootstrapModuleName = angular.module('application.bootstrap', [
  appModule
]).name;



// COMMAND PATTERN TEST

// import { Comp } from './app/OOP-Templates/Command/Comp';
// import { UserInvoker } from './app/OOP-Templates/Command/Invoker/UserInvoker';
// import { StartCommand } from './app/OOP-Templates/Command/Commands/StartCommand';
// import { StopCommand } from './app/OOP-Templates/Command/Commands/StopCommand';
// import { ResetCommand } from './app/OOP-Templates/Command/Commands/ResetCommand';


//   let c = new Comp();
//   let user = new UserInvoker(new StartCommand(c), new StopCommand(c), new ResetCommand(c));
//   user.startComputer();
//   user.stopComputer();
//   user.resetComputer();


// FABRIC PATTERN TEST




