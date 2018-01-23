import { MappingService } from './mapping.service';
import { CategoriesService } from './categories.service';
import { FinalUser } from './../models/FinalUser';
import { LocalStorageService } from './LocalStorage.service';
import { User } from '../models/User';
import { Todo } from '../models/Todo';
import * as Rx from 'rxjs/Rx';

export class UserService {
    static selector = 'userService';
    users$: any;
    private user: User;
    private users: any;

    private finalUser: FinalUser;

    constructor (
        private $q: angular.IQService,
        private localStorage: LocalStorageService,
        private categoriesService: CategoriesService,
        private mappingService: MappingService
    ){
        this.users$ = new Rx.BehaviorSubject <Todo[]>([]);
        // 'ngInject';
        
    }

    signin (name: string, password: string) {
        
        return this.$q((resolve, reject) => {



            this.localStorage.getUsers().then((result) => {
                this.users = result;
                this.users$.next(result);
                this.users = this.users.map((user:any) => this.mappingService.mapUser(user));
                console.log(this.users);
                this.finalUser = this.localStorage.findUserByProps(this.users, {name, password});


                if(!this.finalUser) {
                    this.user = new User(name, password);
                    this.finalUser = this.extendUser(this.user, []);
                    this.users = this.users.concat(this.finalUser);
                    this.localStorage.set('users', this.users);
                }

                
                this.categoriesService.getCategoriesFromLs().then(
                    categories => {
                        console.log('Handle SUCCESS categories');
                        console.log(categories);
                        resolve();
                    },
                    error => {
                        console.log('Handle REJECT categories');
                        let categories: string[] = ['work', 'home', 'health', 'selfDeveloping'];
                        this.localStorage.generateCategories(categories);
                        this.categoriesService.setStyledCategory(categories);
                        resolve();
                    }
                );
              
            });

        });
    }

    signout() {
        this.finalUser = null;
    }

    getUserName(){
        return this.finalUser.name;
    }

    getUser(): FinalUser{
        return this.finalUser;
    }

    getUsers(): FinalUser[] {
        return this.users;
    }

    isAuthorized(){
        return !!this.finalUser;
    }
    
    private extendUser(user: User, todos:Todo[]) : FinalUser{
        return new FinalUser(user.name, user.password, todos);
    }
}
