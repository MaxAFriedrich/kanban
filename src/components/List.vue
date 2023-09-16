<script setup>
import Item from "./Item.vue"
const p = defineProps(["list"]);
</script>

<template>
  <div class="list">
    <div class="name">{{ p.list.name }}</div>
    <hr>
    <div class="items">
      <Item v-for="item in p.list.items" :item="item" />
    </div>
    <hr>
    <button v-if="p.list.addable" class="add" @click="addItem">&plus;</button>
  </div>
</template>

<style scoped>
.list {
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: var(--bg0);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  max-width: 20%;
}

.name {
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1.3rem;
}

.items {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  width:100%;
}

hr {
  width: 95%;
}

.add {
  height: 1.4rem;
  width: 1.4rem;
  font-size: 1.3rem;
  margin: 0;
  margin-bottom: 0.3rem;
}
</style>
