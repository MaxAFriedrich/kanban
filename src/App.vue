<script setup>
import Login from './components/Login.vue'
import UrlGen from './components/UrlGen.vue';
import Refresh from './components/Refresh.vue';
import { InternalState } from './state';
</script>

<template>
  <Login v-if="InternalState.key.value == null" />
  <div v-if="InternalState.key.value != null">
    <div class="toolbar">
      <UrlGen />
      <Refresh />
    </div>
  </div>
</template>

<style scoped></style>
