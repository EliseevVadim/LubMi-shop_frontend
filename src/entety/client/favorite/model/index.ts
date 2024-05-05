import { createEffect, createEvent, createStore } from "effector";
import { persist } from 'effector-storage/local'

export const $favorites = createStore<any[]>([]);
persist({
  store: $favorites,
  key: "favorites",
  keyPrefix: "v1",
});

export const onChangeFavorite = createEvent<any>()

$favorites.on(onChangeFavorite, (state, payload) => {
  const doctorExists = state.some(item => item?.article === payload?.article);

  if (doctorExists) {
    return state.filter(item => item?.article !== payload?.article);
  } else {
    return [...state, payload];
  }
})
