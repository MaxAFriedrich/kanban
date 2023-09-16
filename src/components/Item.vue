<script setup>
import Edit from "./icons/Edit.vue"
import Tag from "./Tag.vue"
const p = defineProps(["item"])
</script>

<template>
  <div class="item">
    <div class="row">
      <div class="name">{{ p.item.name }}</div>
      <button class="edit">
        <Edit />
      </button>
    </div>
    <div class="row">
      <div class="date">{{ p.item.due }}</div>
      <div class="tags">
        <Tag v-for="tag in p.item.tags" :tag="tag" />
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
  padding: 0;
  font-size: unset;
}

button svg {
  height: 1rem;
  width: 1rem;
}

.item {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: calc(100% - 1rem);
  background-color: var(--bg1);
  padding:0.5rem;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.tags {
  display: flex;

}
</style>
