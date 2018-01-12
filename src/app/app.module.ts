
import * as angular from 'angular';

import { moduleName as coreModule } from './views/core/core.module';
import { moduleName as contactsModule } from './views/todos/todos.module';
import { moduleName as signInModule } from './views/signin/signin.module';

export const moduleName =
  angular.module('application', [
      coreModule,
      signInModule,
      contactsModule,
  ])
  .name;
