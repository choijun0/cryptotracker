import {atom, selector, DefaultValue} from "recoil";

interface IpafrikaInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}


export const isDarkMode = atom({
  key: "isDark",
  default: false,
})

export const search_query = atom({
  key: "search_query",
  default: "",
})

export const search_query_manager = selector({
  key: "search_query_manage",
  get: ({get})=> get(search_query),
  set: ({set}, newValue) => {
    if(typeof newValue === "string"){
      set(search_query, newValue.trim());
    }
  },
})


export const isSearching = selector({
  key: "isLoading",
  get: ({get}) => {
    return !(get(search_query) === "");
  },
})