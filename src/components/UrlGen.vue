<script setup>
import { ref } from "vue"
import Qr from "./icons/Qr.vue"
import Copy from "./icons/Copy.vue"
import { InternalState } from "../state";
import { QRCode } from "../qrcode.min"

const url = ref(null)
const svg = ref()

function copy() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url.value)
      .then(() => {
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard: ', err);
      });
  } else {
    console.error('Clipboard API is not available in this browser');
  }
}

function createUrlCreds() {
  const credentials = {
    id: InternalState.id.value,
    token: InternalState.token.value,
    key: InternalState.key.value
  }
  const jsonCredentials = JSON.stringify(credentials);
  const base64Credentials = btoa(jsonCredentials);

  url.value = `${window.location.origin}/#${base64Credentials}`;
  make(url.value)
}
function make(text) {
  const width = Math.min(window.innerWidth * 0.45, window.innerHeight * 0.45)
  svg.value = new QRCode({
    msg: text,
    dim: width,
    pad: 4,
    mtx: -1,
    ecl: "H",
    ecb: 1,
    pal: ["#000", "#ffffff"],
    vrb: 0,
  }).outerHTML;
}
</script>

<template>
  <button @click="createUrlCreds">
    <Qr />
  </button>
  <div v-if="url != null" class="modal-shade"></div>
  <div v-if="url != null" class="modal">
    <div class="close">
      <button @click="url = null">&cross;</button>
    </div>
    <div class="url">
      <pre><code>{{ url }}</code></pre>
      <button @click="copy">
        <Copy />
      </button>
    </div>
    <div id="qr" v-html="svg"></div>
  </div>
</template>

<style scoped>
button {
  outline: none;
  border: none;
  background: none;
  color: inherit;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 2rem;
  margin: 1rem;
}

button svg {
  width: 2rem;
}

pre {
  width: 100%;
  overflow: hidden;
}

.modal {
  width: 50vw;
  position: absolute;
  top: 4rem;
  left: 20vw;
  background-color: var(--bg1);
  padding: 1rem;
}

.url {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
}

.close {
  display: flex;
  justify-content: flex-end;
}

#qr {
  width: fit-content;
  margin: auto;
}

.modal-shade {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #55555555;
}
</style>
