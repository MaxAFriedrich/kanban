<script setup>
import { onMounted, ref } from "vue"

import { Upload } from "../state"

import Edit from "./icons/Edit.vue"
import Remove from "./icons/Remove.vue"
import UploadIcon from "./icons/Upload.vue"

import Tag from "./Tag.vue"

const p = defineProps(["item", "index", "list"])
const showModal = ref(false)

function removeTag(index) {
  p.item.tags.pop(index)
}

function addTag() {
  p.item.tags.push({ color: "#005500", name: "New" })
}

function upload() {
  showModal.value = false
  if (p.item.new != undefined) {
    delete p.item.new
  }
  Upload();
}

function close() {
  showModal.value = false
  if (p.item.new != undefined) {
    p.list.items.pop(p.index)
  }
}

function isPast(date) {
  if (date == "") return false;
  const currentDate = new Date();
  const targetDate = new Date(date);
  return targetDate < currentDate;
}
function isNext3Days(date) {
  if (date == "") return false;
  const currentDate = new Date();
  const targetDate = new Date(date);
  const threeDaysLater = new Date();
  threeDaysLater.setDate(currentDate.getDate() + 3);
  return targetDate >= currentDate && targetDate <= threeDaysLater;
}

onMounted(() => {
  if (p.item.new != undefined) {
    showModal.value = true
  }
})
</script>

<template>
  <div class="modal-shade" v-if="showModal"></div>
  <div class="modal" v-if="showModal">
    <div class="close">
      <h2 class="title">Edit: <input class="inherited" v-model="p.item.name"></h2>
      <button class="modalButton" @click="close">&cross;</button>
    </div>
    <div class="modalItem">
      <label for="desc">Description:</label>
      <textarea id="desc" v-model="p.item.description"></textarea>
    </div>
    <div class="modalItem">
      <label for="date">Due Date:</label>
      <input type="date" v-model="p.item.due">
    </div>
    <div class="modalItem">
      <label>Tags</label>
      <div class="tagEdit">
        <div class="tagItem" v-for="(tag, index) in p.item.tags">
          <input v-model="tag.name">
          <input v-model="tag.color" type="color">
          <button class="modalButton" @click="removeTag(index)">
            <Remove />
          </button>
        </div>
      </div>
      <div class="close">
        <div></div>
        <button class="modalButton" @click="addTag">&plus;</button>
      </div>
    </div>
    <div class="close">
      <div></div>
      <button class="modalButton" @click="upload">
        <UploadIcon />
      </button>
    </div>
  </div>
  <div class="item">
    <div class="row">
      <div class="name">{{ p.item.name }}</div>
      <button class="edit" @click="showModal = true">
        <Edit />
      </button>
    </div>
    <div class="row">
      <div class="date" :class="{ 'red': isPast(p.item.due), 'orange': isNext3Days(p.item.due) }">{{ p.item.due }}</div>
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
  padding: 0.5rem;
  margin: 0.3rem 0;
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

.date {
  color: var(--text0);
}

.red {
  color: var(--fail);
}

.orange {
  color: var(--warn);
}

.modalButton {
  margin: 0.5rem;
  height: 3rem;
  width: 3rem;
  font-size: 2rem;
  padding: 0.3rem;
}

.modalButton svg {
  width: 2rem;
  height: 2rem;
}

.title {
  width: 75%;
  overflow: hidden;
}

.inherited {
  background-color: inherit;
  display: inline;
  width: calc(100% - 7ch);
}

.modalItem {
  margin: 0.5rem 0;
}

.tagEdit {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.tagItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg1);
  margin: 0.5rem;
  height: 2rem;
}

.tagItem input {
  background: none;
}
</style>
