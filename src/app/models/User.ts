import {Todo} from './Todo';
export class User {
    name: string;
    email: string;
    password: string;
    todos: Todo[];
    constructor(name: string, email:string, password:string){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
