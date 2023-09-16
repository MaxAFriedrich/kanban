import { ref } from "vue"
import { UpdateGist, GetGist } from "./github"

export const InternalState = {
  id: ref(null),
  token: ref(null),
  key: ref(null),
}

export let UserData = {
  todo: ref([
    {
      name: "foo",
      capacity: 5,
      addable: true,
      items: ref([
        {
          name: "first item",
          due: "some date",
          description: "This is the description field",
          tags: ref([{
            color: "red",
            name: "hello"
          }])
        }
      ])
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

export function Download() {
  GetGist(InternalState.id.value, InternalState.token.value, InternalState.key.value)
    .then(decodedContent => {
      if (decodedContent) {
        UserData = decodedContent
      } else {
        console.error('Failed to fetch or decode gist data.');
      }
    });
}


