<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { links } from './router/links'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="home-link" v-if="$route.path === links.todos" to="/">Go Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
