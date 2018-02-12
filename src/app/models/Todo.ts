import { Category } from '@uirouter/angularjs';

export class Todo {
    id: number;
    name:string;
    body:string;
    resolved: boolean;
    creationDate: number;
    categories: string[];
    urgent: boolean;
    
    constructor(id:number, name:string, body: string, urgent: boolean, categories: string[]){
        this.id = id;
        this.name = name;
        this.body = body;
        this.urgent = urgent;
        this.categories = categories;
    }
}
