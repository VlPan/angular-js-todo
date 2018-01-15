export class Todo {
    id: number;
    name:string;
    body:string;
    resolved: boolean;
    creationDate: number;

    constructor(id:number, name:string, body: string){
        this.id = id;
        this.name = name;
        this.body = body;
    }
}