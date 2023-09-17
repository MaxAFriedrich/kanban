import {ref} from "vue"
import CryptoJS from "crypto-js"

export async function GetGist(gistId, token,key) {
  const url = `https://api.github.com/gists/${gistId}`;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  return fetch(url, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(`GitHub API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.files) {
        // Assuming you have a single file in the gist
        const fileKey = Object.keys(data.files)[0];
        const content = data.files[fileKey].content;

        const out = decrypt(content,key);
        return out
      } else {
        console.log('Gist data does not contain content.');
        return null;
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      return null;
    });
}

export async function UpdateGist(gistId, token, fileContent,key) {
  const url = `https://api.github.com/gists/${gistId}`;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };


  const updatedData = {
    files: {
      ["todo"]: {
        content: encrypt(fileContent,key),
      },
    },
  };

  const body = JSON.stringify(updatedData);

  return fetch(url, { method: 'PATCH', headers, body })
    .then(response => {
      if (!response.ok) {
        throw new Error(`GitHub API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error.message);
      return null;
    });
}


function encrypt(data, key) {
  let out = JSON.stringify(data)
  return CryptoJS.AES.encrypt(out, key).toString();
}


function decrypt(ciphertext, key) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return deserializeObject(bytes.toString(CryptoJS.enc.Utf8))
}

// Function to deserialize an object with Vue refs
function deserializeObject(json) {
  return JSON.parse(json, (key, value) => {
    if (typeof value === 'object' && value !== null && '__v_isRef' in value) {
      return ref(value._value)
    }
    return value;
  });
}
