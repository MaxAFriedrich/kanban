<script setup>
import { ref } from "vue"
import Login from './components/Login.vue'
import UrlGen from './components/UrlGen.vue';
import Refresh from "./components/icons/Refresh.vue"
import List from './components/List.vue';
import {refresh, Selected, Download, Upload, UserData, InternalState } from './state';
function getUpdate() { Download() }

let runUpdate = null

window.onkeyup = (e) => {
  let needsUpdate = false
  switch (e.key) {
    case 'Escape':
      Selected.item.value = 0
      Selected.list.value = -1
      break;
    case 'h':
      if (Selected.list.value > 0) {
        Selected.list.value -= 1
      }
      break;
    case 'l':
      if (Selected.list.value < UserData.todo.value.length - 1) {
        Selected.list.value += 1
      }
      break;
    case 'j':
      if (Selected.item.value < Selected.maxItem.value)
        Selected.item.value += 1
      break;
    case 'k':
      if (Selected.item.value > 0)
        Selected.item.value -= 1
      break;
    case 'J':
      if (Selected.item.value < Selected.maxItem.value) {
        const items = UserData.todo.value[Selected.list.value].items
        const tmp = items[Selected.item.value + 1]
        items[Selected.item.value + 1] = items[Selected.item.value]
        items[Selected.item.value] = tmp
        Selected.item.value += 1
        needsUpdate = true
      }
      break;
    case 'K':
      if (Selected.item.value > 0) {
        const items = UserData.todo.value[Selected.list.value].items
        const tmp = items[Selected.item.value - 1]
        items[Selected.item.value - 1] = items[Selected.item.value]
        items[Selected.item.value] = tmp
        Selected.item.value -= 1
        needsUpdate = true
      }
      break;
    case 'H':
      if (Selected.list.value > 0 && UserData.todo.value[Selected.list.value - 1].capacity >= UserData.todo.value[Selected.list.value - 1].items.length + 1) {
        const tmp = UserData.todo.value[Selected.list.value].items[Selected.item.value]
        UserData.todo.value[Selected.list.value].items.splice(Selected.item.value,1)
        UserData.todo.value[Selected.list.value - 1].items.push(tmp)
        Selected.list.value -= 1
        Selected.maxItem.value = UserData.todo.value[Selected.list.value].items.length - 1
        Selected.item.value = Selected.maxItem.value
        needsUpdate = true
      }
      break;
    case 'L':
      if (Selected.list.value < UserData.todo.value.length - 1 && UserData.todo.value[Selected.list.value + 1].capacity >= UserData.todo.value[Selected.list.value + 1].items.length + 1) {
        const tmp = UserData.todo.value[Selected.list.value].items[Selected.item.value]
        UserData.todo.value[Selected.list.value].items.splice(Selected.item.value,1)
        UserData.todo.value[Selected.list.value + 1].items.push(tmp)
        Selected.list.value += 1
        Selected.maxItem.value = UserData.todo.value[Selected.list.value].items.length - 1
        Selected.item.value = Selected.maxItem.value
        needsUpdate = true
      }
      break;
  }

  if (needsUpdate) {
    if (runUpdate != null)
      clearTimeout(runUpdate)
    runUpdate = setTimeout(Upload, 5000)
  }
}
</script>

<template>
  <Login v-if="InternalState.key.value == null"/>
  <div v-if="InternalState.key.value != null">
    <div class="toolbar">
      <UrlGen />
      <button @click="getUpdate">
        <Refresh />
      </button>
    </div>
    <div class="todo" :key="refresh">
      <List v-for="(list, index) in UserData.todo.value" :list="list" :index="index" />
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  margin: 1rem;
}
</style>
