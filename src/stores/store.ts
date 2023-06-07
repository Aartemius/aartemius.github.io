import { defineStore } from 'pinia';
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const urlParams = new URLSearchParams(window.location.search);
const queryData = JSON.parse(urlParams.get('data')) || null;

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: queryData || JSON.parse(window.sessionStorage.getItem('todos')) || [
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
      const index = this.todos.findIndex((todo: Todo) => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
  },
});
