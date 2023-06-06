// import { defineStore } from 'pinia';

// export interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// export const useTodoStore = defineStore('todo', {
//   state: () => ({
//     todos: [{
//       id: 1,
//       title: 'Buy vodka',
//       completed: true
//     }, {
//       id: 2,
//       title: 'Get drunk',
//       completed: false
//     }] as Todo[],
//   }),
//   actions: {
//     addTodo(title: string) {
//       const newTodo: Todo = {
//         id: this.todos.length + 1,
//         title,
//         completed: false,
//       };

//       this.todos.push(newTodo);
//     },
//     updateTodoTitle(todo: Todo, newTitle: string) {
//       todo.title = newTitle;
//     },
//     toggleTodoCompletion(todo: Todo) {
//       todo.completed = !todo.completed;
//     },
//     deleteTodoById(id: number) {
//       const index = this.todos.findIndex(todo => todo.id === id);
//       if (index !== -1) {
//         this.todos.splice(index, 1);
//       }
//     },
//   },
// });

import { defineStore } from 'pinia';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      {
        id: 1,
        title: 'Buy vodka',
        completed: true,
      },
      {
        id: 2,
        title: 'Get drunk',
        completed: false,
      },
    ] as Todo[],
  }),
  actions: {
    addTodo: function (title: string) {
      const newTodo: Todo = {
        id: this.todos.length + 1,
        title,
        completed: false,
      };

      this.todos.push(newTodo);
    },
    updateTodoTitle: function (todo: Todo, newTitle: string) {
      todo.title = newTitle;
    },
    toggleTodoCompletion: function (todo: Todo) {
      todo.completed = !todo.completed;
    },
    deleteTodoById: function (id: number) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
  },
});
