/**
 * Import the Component styles
 */
import './contact-list.component.scss';
 /**
 * Import the Services
 */
import { UserService } from '../../services/users.service';

class ContactListController {
  contacts: { name: string }[];
  username: string;
  contactRemoved: ($event: { $event: { id: number }}) => void;
  constructor(
    private $stateParams: ng.ui.IStateParamsService,
    private userService: UserService,
    private $location: ng.ILocationService, 
) {
    'ngInject';
  }


  $onInit() {
    // this.username = this.userService.getUserName();
    // if(!this.username){
    //   alert('You should authorize first!');
    //   this.$location.url('/app/signin');
    // }
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
