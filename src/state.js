import { ref } from "vue"
import { UpdateGist, GetGist } from "./github"

export const InternalState = {
  id: ref(null),
  token: ref(null),
  key: ref(null),
}

// TAG = { color: "#005500", name: "New" }
// ITEM = {
//   name: "New",
//   due: "",
//   description: "",
//   tags: ref([])
// }

export let UserData = {
  todo: ref([
    {
      name: "foo",
      capacity: 5,
      addable: true,
      items: ref([{
        name: "New List Item",
        due: "",
        description: "",
        tags: ref([])
      }])
    }
  ])
}

export function Upload() {
  UpdateGist(InternalState.id.value, InternalState.token.value, UserData, InternalState.key.value)
    .then(updatedGist => {
      if (!updatedGist) {
        console.error('Failed to update gist.');
      }
    });
}

export function Download(refresh) {
  GetGist(InternalState.id.value, InternalState.token.value, InternalState.key.value)
    .then(decodedContent => {
      if (decodedContent) {
        UserData = decodedContent
  refresh.value +=1
        console.log("Rerendered")
      } else {
        console.error('Failed to fetch or decode gist data.');
      }
    });
}


