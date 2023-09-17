import { ref } from "vue"
import { UpdateGist, GetGist } from "./github"

export const refresh = ref(0)

export const Selected = {
  item:ref(0),
  list:ref(-1),
  maxItem:ref(0),
}

export const InternalState = {
  id: ref(null),
  token: ref(null),
  key: ref(null),
}

export let UserData = {
  todo: ref([
    {
      name: "Firehose",
      capacity: 25,
      addable: true,
      items: ref([])
    },
    {
      name: "To Do",
      capacity: 7,
      items: ref([])
    },
    {
      name: "Doing",
      capacity: 2,
      items: ref([])
    },
    // {
    //   name: "Task 1",
    //   capacity: 5,
    //   addable: true,
    //   tuckable: true,
    //   items: ref([])
    // },
    // {
    //   name: "Task 2",
    //   capacity: 5,
    //   addable: true,
    //   tuckable: true,
    //   items: ref([])
    // },
    {
      name: "Complete",
      capacity: 5,
      dumpable: true,
      items: ref([])
    },
    // {
    //   name: "Bin",
    //   capacity: 5,
    //   dumpable: true,
    //   items: ref([])
    // }
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
        refresh.value +=1
        console.log("Rerendered")
      } else {
        console.error('Failed to fetch or decode gist data.');
      }
    });
}


