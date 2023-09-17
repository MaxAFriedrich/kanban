<script setup>
import { ref } from "vue"
import Login from './components/Login.vue'
import UrlGen from './components/UrlGen.vue';
import Refresh from "./components/icons/Refresh.vue"
import List from './components/List.vue';
import { Download, UserData, InternalState } from './state';
let refresh = ref(0);
function getUpdate() { Download(refresh) }
</script>

<template>
  <Login v-if="InternalState.key.value == null" />
  <div v-if="InternalState.key.value != null">
    <div class="toolbar">
      <UrlGen />
      <button @click="getUpdate">
        <Refresh />
      </button>
    </div>
    <div class="todo" :key="refresh">
      <List v-for="list in UserData.todo.value" :list="list" />
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  margin: 1rem;
}
</style>
