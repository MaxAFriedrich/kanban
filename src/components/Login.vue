<script setup>
import Paste from "./icons/Paste.vue"
import { InternalState } from "../state"

function login() {
  InternalState.id.value = document.getElementById("id").value
  InternalState.token.value = document.getElementById("token").value
  InternalState.key.value = document.getElementById("key").value
}


function getUrlCreds() {
  const encodedCreds = window.location.hash.slice(1)[1];
  try{
  const params = JSON.parse(atob(encodedCreds))
  if (params.id && params.key && params.token) {
    InternalState.id.value = params.id
    InternalState.token.value = params.token
    InternalState.key.value = params.key
  }
  }catch{

  }
}


getUrlCreds();

</script>

<template>
  <div class="wrapper">
    <label for="key">Key: </label>
    <div class="item">
      <input type="password" id="key">
      <Paste />
    </div>
    <label for="token">Github Token: </label>
    <div class="item">
      <input type="password" id="token">
      <Paste />
    </div>
    <label for="id">Gist ID: </label>
    <div class="item">
      <input type="text" id="id">
      <Paste />
    </div>
    <button @click="login">Login</button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 1rem;
  justify-content: center;
}

.item {
  margin: 1rem;
  display: flex;
}

.item * {
  margin: 0.5rem;
}

input {
  background-color: var(--bg1);
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
}

button {
  background-color: var(--bg1);
  color: inherit;
  font: inherit;
  border: none;
  outline: none;
  margin: 1;
  height: 3rem;
  width: 10ch;
  font-size: 2rem
}
</style>
