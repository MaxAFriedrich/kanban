<script setup>
import { Download, InternalState } from "../state"

function login() {
  InternalState.id.value = document.getElementById("id").value
  InternalState.token.value = document.getElementById("token").value
  InternalState.key.value = document.getElementById("key").value
  Download()
}


function getUrlCreds() {
  const encodedCreds = window.location.hash.slice(1);
  const b64 = atob(encodedCreds)
  if (b64 < 5) {
    return
  }
  try {
    const params = JSON.parse(b64)
    if (params.id && params.key && params.token) {
      InternalState.id.value = params.id
      InternalState.token.value = params.token
      InternalState.key.value = params.key
      Download()
    }
  } catch (SyntaxError) { }
}


getUrlCreds();

</script>

<template>
  <div class="wrapper">
    <label for="key">Key: </label>
    <div class="item">
      <input type="password" id="key">
    </div>
    <label for="token">Github Token: </label>
    <div class="item">
      <input type="password" id="token">
    </div>
    <label for="id">Gist ID: </label>
    <div class="item">
      <input type="text" id="id">
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

button {
  width: 10ch;
}
</style>
