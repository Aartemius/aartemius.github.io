<template>
  <div class="todos-page-wrap">
    <h1>Friday night plans</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodoTitle" placeholder="Enter a new todo" />
      <button type="submit">Add</button>
    </form>
    <div class="todos-wrap">
      <div
        :class="{ 'todo': true, 'checked': todo.completed }"
        v-for="todo in todos"
        :key="todo.id"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodoCompletion(todo)"
        />
        <template v-if="todo.id !== editingTodoId">
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }}
          </span>
          <div class="edit-btn edit-icon-wrap" @click="editMode(todo)">
            <img src="@/assets/editIcon.svg" />
          </div>
        </template>
        <template v-else>
          <input
            v-model="editedTodoTitle"
            @keyup.enter="saveTodoTitle(todo)"
          />
          <div class="edit-icon-wrap edit-btn" @click="saveTodoTitle(todo)">
            <img src="@/assets/doneIcon.svg" />
          </div>
        </template>
        <div class="edit-icon-wrap" @click="deleteTodoById(todo.id)">
          <img src="@/assets/deleteIcon.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles.scss";
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodoStore, type Todo } from '../stores/store';
import { watch } from 'vue';

export default defineComponent({
  setup() {
    const todoStore = useTodoStore();
    watch(() => todoStore.todos, (newValue, oldValue) => {
      console.log(`State changed from ${oldValue} to ${newValue}`);
    });
    const newTodoTitle = ref('');
    const editingTodoId = ref<number | null>(null);
    const editedTodoTitle = ref('');

    const addTodo = () => {
      if (newTodoTitle.value.trim()) {
        todoStore.addTodo(newTodoTitle.value.trim());
        newTodoTitle.value = '';
      }
    };

    const toggleTodoCompletion = (todo: Todo) => {
      todoStore.toggleTodoCompletion(todo);
    };

    const deleteTodoById = (id: number) => {
      todoStore.deleteTodoById(id);
    };

    const editMode = (todo: Todo) => {
      editingTodoId.value = todo.id;
      editedTodoTitle.value = todo.title;
    };

    const saveTodoTitle = (todo: Todo) => {
      todoStore.updateTodoTitle(todo, editedTodoTitle.value);
      editingTodoId.value = null;
    };

    return {
      newTodoTitle,
      todos: todoStore.todos,
      // todos: window.sessionStorage.getItem('todos') || todoStore.todos,
      editingTodoId,
      editedTodoTitle,
      addTodo,
      toggleTodoCompletion,
      deleteTodoById,
      editMode,
      saveTodoTitle,
    };
  },
});
</script>
