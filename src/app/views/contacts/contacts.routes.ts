import { AddContactContainer } from '../../components/add-contact/add-contact.container';
import { ContactsContainer } from '../../components/contacts/contacts.container';

export const routing = ($stateProvider: angular.ui.IStateProvider) => {
  'ngInject';
  $stateProvider

    .state('add-contact', {
      parent: 'app',
      url: '/contact/add',
      component: AddContactContainer.selector
    })

    .state('contacts', {
      parent: 'app',
      url: '/contact/:name',
      component: ContactsContainer.selector
    });
};
