<template>
  <div class="todos-page-wrap">
    <h1>Friday night plans</h1>
    <button class="copy-list" @click="copyLink">Copy Link to My List</button>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodoTitle" placeholder="Add new friday plan" />
      <button type="submit">Add</button>
    </form>
    <div class="todos-wrap">
      <draggable
        v-model="todos"
        :options="{ group: 'todos' }"
        @end="saveTodosOrder"
        itemKey="id"
      >
        <template #item="{ element }">
          <div :class="{ 'todo': true, 'checked': element.completed }" :key="element.id">
            <input
              type="checkbox"
              :checked="element.completed"
              @change="toggleTodoCompletion(element)"
            />
            <template v-if="element.id !== editingTodoId">
              <span :style="{ textDecoration: element.completed ? 'line-through' : 'none' }">
                {{ element.title }}
              </span>
              <div class="edit-btn edit-icon-wrap" @click="editMode(element)">
                <img src="@/assets/editIcon.svg" />
              </div>
            </template>
            <template v-else>
              <input
                type="text"
                v-model="editedTodoTitle"
                @keyup.enter="saveTodoTitle(element)"
              />
              <div class="edit-icon-wrap edit-btn" @click="saveTodoTitle(element)">
                <img src="@/assets/doneIcon.svg" />
              </div>
            </template>
            <div class="edit-icon-wrap" @click="deleteTodoById(element.id)">
              <img src="@/assets/deleteIcon.svg" />
            </div>
          </div>
        </template>
      </draggable>

    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles.scss";
</style>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useTodoStore, type Todo } from '../stores/store';
import { watch } from 'vue';
import draggable from 'vuedraggable';


export default defineComponent({
  components: {
    draggable,
  },
  data() {
    return {
      link: '',
      encodedData: '',
    };
  },
  methods: {
    copyLink() {
      const data = sessionStorage.getItem('todos');
      const encodedData = encodeURIComponent(data as string | number);
      this.link = `${window.location.href.split('?')[0]}`;
      this.encodedData = `?data=${encodedData}`;
      const el = document.createElement('textarea');
      el.value = `${this.link}${this.encodedData}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Link copied to clipboard!');
    },
    saveTodosOrder() {
      const todoStore = useTodoStore();
      todoStore.updateTodosOrder(this.todos);
    },
  },


  setup() {
    const todoStore = useTodoStore();
    const { todos } = toRefs(todoStore);
    const newTodoTitle = ref('');
    const editingTodoId = ref<number | null>(null);
    const editedTodoTitle = ref('');

    watch(todoStore.todos, state => {
        sessionStorage.setItem('todos', JSON.stringify(state))
      },
      { deep: true }
    )

    const addTodo = () => {
      if (newTodoTitle.value) {
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
      todos,
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

