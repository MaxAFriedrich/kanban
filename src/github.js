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

        return decrypt(content,key);
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

// // Replace '<YOUR-TOKEN>' and '<GIST_ID>' with your actual token and gist ID
// const yourToken = '<YOUR-TOKEN>';
// const gistId = '<GIST_ID>';

// getGist(gistId, yourToken)
//   .then(decodedContent => {
//     if (decodedContent) {
//       console.log('Decoded Gist Content:', decodedContent);
//     } else {
//       console.log('Failed to fetch or decode gist data.');
//     }
//   });

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

// // Replace '<YOUR-TOKEN>', '<GIST_ID>', '<fileName>', and '<fileContent>'
// const yourToken = '<YOUR-TOKEN>';
// const gistId = '<GIST_ID>';
// const fileContent = 'Hello World from GitHub'; // Replace with the actual file content

// updateGistFile(gistId, yourToken, fileContent)
//   .then(updatedGist => {
//     if (updatedGist) {
//       console.log('Updated Gist:', updatedGist);
//     } else {
//       console.log('Failed to update gist.');
//     }
//   });


function encrypt(data, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}


function decrypt(ciphertext, key) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
