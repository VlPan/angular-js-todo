export class Todo {
    id: number
    name:string;
    body:string;
    resolved: boolean;
    creationDate: Date;

    constructor(id:number, name:string, body: string){
        this.id = id;
        this.name = name;
        this.body = body;
    }
}