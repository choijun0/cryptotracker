import {atom, selector} from "recoil";

export const coinList = atom({
  key: "coinList",
  default: [],
})

export const isDarkMode = atom({
  key: "isDark",
  default: false,
})

export const coinSearchQuery = atom({
  key: "coin_name",
  default: "",
}) 


export const isSearching = selector({
  key: "isSearching",
  get: ({get}) => {
    const queryString = get(coinSearchQuery);
    if(queryString === ""){
      return false;
    }
    return queryString;
  }
})