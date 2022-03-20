import {atom, selector} from "recoil";


export const isDarkMode = atom({
  key: "isDark",
  default: false,
})

export const search_query = atom({
  key: "search_query",
  default: "",
})

export const isSearching = selector({
  key: "isLoading",
  get: ({get}) => {
    const query = get(search_query); //subscribe search_query(Atom)
    return (query !== "")
  },
})