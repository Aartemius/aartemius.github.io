<template>
  <div class="todos-page-wrap">
    <h1>Friday night plans</h1>
    <button class="copy-list" @click="copyLink">Copy Link to My List</button>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodoTitle" placeholder="Add new friday plan" />
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
            type="text"
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
  data() {
    return {
      link: '',
      encodedData: '',
    };
  },
  methods: {
    copyLink() {
      const data = sessionStorage.getItem('todos');
      const encodedData = encodeURIComponent(data as string | number | boolean);
      this.link = `${window.location.href.split('?')[0]}`;
      this.encodedData = `?data=${encodedData}`;
      const el = document.createElement('textarea');
      el.value = `${this.link}${this.encodedData}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Link copied to clipboard!');
    }
  },


  setup() {
    const todoStore = useTodoStore();
    const newTodoTitle = ref('');
    const editingTodoId = ref<number | null>(null);
    const editedTodoTitle = ref('');

    watch(todoStore.todos, state => {
        sessionStorage.setItem('todos', JSON.stringify(state))
      },
      { deep: true }
    )

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
