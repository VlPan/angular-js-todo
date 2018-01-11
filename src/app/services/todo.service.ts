import { LocalStorage } from './LS.service';
export class TodoService{
    static selector = 'todoService'
    todos: {id:number, title: string, body:string, date: Date, resolved: boolean}[];

    constructor(
        private $q: angular.IQService,
        private localStorage: LocalStorage
    ) {
      'ngInject';
    }

    getAll(){
        return this.$q.resolve(this.todos);
    }

    add(todo: { title: string, body: string }) {
        let highestId = 0;
        if(this.todos && this.todos.length !== 0){
          highestId = this.todos
          .map(t => t.id)
          .reduce((a, b) => Math.max(a, b), 1);
        }
    
          let todoToAdd = {
            id: highestId + 1,
            title: todo.title,
            body: todo.body,
            date: new Date(),
            resolved: false,
          };
          console.log(todoToAdd);
        this.todos.push(todoToAdd);
        this.localStorage.set('todos', this.todos);
      }

      remove(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.localStorage.set('todos', this.todos);
      }

      resolve(id:number){
          let todoToResolve = this.todos.find(todo => todo.id === id);
          todoToResolve.resolved = true;
          this.todos = this.todos.map((todo) => { 
              return todo.id === id ? todoToResolve : todo; 
            });
        //   this.todos.forEach(function(todo, i) { if (todo.id == id) this.toods[i] = todoToResolve; });
      }
}
