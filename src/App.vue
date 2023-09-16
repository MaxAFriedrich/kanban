<script setup>
import Login from './components/Login.vue'
import UrlGen from './components/UrlGen.vue';
import Refresh from './components/Refresh.vue';
import List from './components/List.vue';
import { UserData,InternalState } from './state';
</script>

<template>
  <Login v-if="InternalState.key.value == null" />
  <div v-if="InternalState.key.value != null">
    <div class="toolbar">
      <UrlGen />
      <Refresh />
    </div>
    <div class="todo">
      <List v-for="list in UserData.todo.value" :list="list" />
    </div>
  </div>
</template>

<style scoped>
.todo{
  display: flex;
  margin: 1rem;
}
</style>
