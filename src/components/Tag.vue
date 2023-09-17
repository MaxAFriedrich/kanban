<script setup>
const p = defineProps(["tag"])
</script>

<template>
  <div class="tag" :style="{ backgroundColor: p.tag.color }">
    {{ p.tag.name }}
  </div>
</template>

<style>
.tag {
  border-radius: 0.1rem;
  margin: 0.1rem;
}
</style>
