import { CategoriesService } from '../categories/categories.service';
import { FinalUser } from '../../models/FinalUser';
import { FakeBackendService } from '../fake-backend/fake-backend.service';
import { User } from '../../models/User';
import { Todo } from '../../models/Todo';
import * as Rx from 'rxjs/Rx';
import { StyledCategory } from '../../models/StyledCategory';
import {UserConverterService} from '../user-converter/user-converter.service';

export class UserService {
    static selector = 'userService';
    users$: any = Rx.Observable.fromPromise(this.fakeBackend.getUsers());
    private user: User;
    private users: any;

    private finalUser: FinalUser;

    constructor (
        private $q: angular.IQService,
        private fakeBackend: FakeBackendService,
        private categoriesService: CategoriesService,
        private userConverter: UserConverterService,
        private $state: angular.ui.IStateService
    ){
        
        'ngInject';
        
    }

    signin (name: string, password: string) {
        
        return this.$q((resolve, reject) => {
            this.users$
            .subscribe((userInfo: any) => {
                this.users = userInfo;
                this.users = this.users.map((user:any) => this.userConverter.fromDto(user));
                this.finalUser = this.fakeBackend.findUserByProps(this.users, {name, password});

                if(!this.finalUser) {
                    this.user = new User(name, password);
                    this.finalUser = this.extendUser(this.user, []);
                    this.users = this.users.concat(this.finalUser);
                    this.fakeBackend.setUsers(this.users);
                }

                
                this.categoriesService.getCategoriesFromLs().then(
                    this.categoriesService.styledCategories$.subscribe(
                        (categories:any) => {
                            resolve();
                        },
                        (error: any) => {
                            let categories: string[] = ['work', 'home', 'health', 'selfDeveloping'];
                            this.fakeBackend.generateCategories(categories);
                            this.categoriesService.setStyledCategory(categories);
                            resolve();
                        })
                );
            });
        });
    }

    signout() {
        this.finalUser = null;
        this.users = null;
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

    checkIfLogged(){
        if(this.isAuthorized()){
            this.$state.go('todos');
            alert('You are already authorizate. Redirect to your todos');
        }
    }

    checkIfNotLogged(){
        if(!this.isAuthorized()){
            this.$state.go('signin');
            alert('You sould authorizate first');
        }
    }
    
    private extendUser(user: User, todos:Todo[]) : FinalUser{
        return new FinalUser(user.name, user.password, todos);
    }
}
