import { LocalStorageService } from './LocalStorage.service';
export class ContactsService {
  static selector = 'contactsService';
  contacts: { id: number, lastName: string, firstName: string }[] = this.localStorage.get('contacts') || [];

  constructor(
      private $q: angular.IQService,
      private localStorage: LocalStorageService
  ) {
    'ngInject';
  }

  getAll() {
    return this.$q.resolve(this.contacts);
  }

  add(contact: { lastName: string, firstName: string }) {
    let highestId = 0;
    if(this.contacts && this.contacts.length !== 0){
      highestId = this.contacts
      .map(c => c.id)
      .reduce((a, b) => Math.max(a, b), 1);
    }

      let contactToAdd = {
        id: highestId + 1,
        firstName: contact.firstName,
        lastName: contact.lastName
      };
      console.log(contactToAdd);
    this.contacts.push(contactToAdd);
    this.localStorage.set('contacts', this.contacts);
  }

  remove(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.localStorage.set('contacts', this.contacts);
  }
}
