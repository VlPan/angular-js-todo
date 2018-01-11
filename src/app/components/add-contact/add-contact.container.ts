import { ContactsService } from '../../services/contacts.service';
import { UserService } from '../../services/users.service';
import * as angular from 'angular';


class AddContactController {

  constructor(
      private contactsService: ContactsService,
      private $state: angular.ui.IStateService,
      private userService: UserService,
      private $location: ng.ILocationService, 
  ) {
    'ngInject';
  }

  $onInit(){
    if(!this.userService.getUserName()){
      alert('You should authorize first!');
      this.$location.url('/app/signin');
    }
  }
  add(contact: { lastName: string, firstName: string })  {
    this.contactsService.add(contact);
    this.$state.go('contacts');
  }
}

export class AddContactContainer implements angular.IComponentOptions {
  static selector = 'addContact';
  static controller = AddContactController;
  static template = `
  <div class="row">
    <div class="col-md-12">
      <h1>Add contact</h1>
      <add-contact-form contact-added="$ctrl.add($event.contact)"></add-contact-form>
      <a class="btn btn-default btn-block" ui-sref="contacts">Back</a>
    </div>
  </div>
  `;
}
