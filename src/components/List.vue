<script setup>
import { ref, watch } from "vue"
import Item from "./Item.vue"
import DumpAll from "./icons/DumpAll.vue";
import { Upload, Selected } from "../state";
const p = defineProps(["list", "index",]);

function addItem() {
  if (p.list.capacity <= p.list.items.length) {
    return
  }
  const item = {
    name: "New",
    due: "",
    description: "",
    tags: ref([])
  }
  item.new = true
  p.list.items.push(item)
  if (Selected.list.value == p.index) {
    Selected.maxItem.value = p.list.items.length - 1
    Selected.item.value = Selected.maxItem.value
  }
}

function clearItem() {
  while (p.list.items.length) {
    p.list.items.pop()
  }
  Upload()
}

watch(Selected.list, async (newVal, oldVal) => {
  if (newVal == p.index)
    Selected.maxItem.value = p.list.items.length - 1
})


</script>

<template>
  <div class="list" :class="{ 'selected': Selected.list.value == p.index }">
    <div class="top" :class="{ 'space': p.list.dumpable === true }">
      <div>
        <div class="name">{{ p.list.name }}</div> ({{ p.list.items.length }}/{{ p.list.capacity }})
      </div>
      <button class="icon" v-if="p.list.dumpable === true" @click="clearItem">
        <DumpAll />
      </button>
    </div>
    <hr>
    <div class="items">
      <Item v-for="(item, index) in p.list.items" :index="index" :item="item" :list="p.list" :listIndex="p.index" />
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

.top {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
}

.space {
  width: 85%;
  justify-content: space-between;
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
  width: 100%;
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

.icon {
  height: 1.4rem;
  width: 1.4rem;
  margin: 0;
  font-size: 0;
}

.icon svg {
  height: 1.3rem;
  width: 1.3rem;
}

.selected {
  background-color: var(--highlight) !important;
}
</style>
