import { createEffect, createEvent, createStore } from 'effector'
import { Auth } from "../api/index";
import { persist } from 'effector-storage/local'

export const $user = createStore<any>(null)
export const setUser = createEvent<any>()
export const logout = createEvent<any>()

persist({
  store: $user,
  key: "$user",
  keyPrefix: "v2",
});

export const authFX = createEffect<{username: string, password: string}, any, Error>(async(data: any) => {
  // const res = await PreAuth(data);
  // if (res?.status !== 200) throw new Error(res.message);
  // return res.data;

  return {
    username: data?.username,
    password: data?.password,
  }
})


$user.on(logout, () => null)
$user.on(authFX.doneData, (_, t) => t)
$user.on(setUser, (_, t) => t)


