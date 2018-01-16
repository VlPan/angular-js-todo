import { Todo } from './Todo';
import { User } from './User';
import { IHaveTodos } from './Interfaces/todoInterface';

export class FinalUser extends User implements IHaveTodos{
    todos: Todo[];
    constructor(name: string, password: string, todos: Todo[]){ 
        super(name, password);
        this.todos = todos;
    }
}
