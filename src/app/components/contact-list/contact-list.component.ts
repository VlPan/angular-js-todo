/**
 * Import the Component styles
 */
import './contact-list.component.scss';

class ContactListController {
  contacts: { name: string }[];
  username: string = this.$stateParams['name'] || 'defaultName';
  contactRemoved: ($event: { $event: { id: number }}) => void;
  constructor(
    private $stateParams: ng.ui.IStateParamsService
) {
    'ngInject';
  }

  remove(contact: { id: number }) {
    this.contactRemoved({
      $event: {
          id: contact.id
      }
    });
  }

}

export class ContactList implements angular.IComponentOptions {
  
  static selector = 'contactList';
  static bindings = {
    contacts: '<',
    contactRemoved: '&'
  };
  static controller = ContactListController;
  static template = require('./contact-list.component.html');
}
