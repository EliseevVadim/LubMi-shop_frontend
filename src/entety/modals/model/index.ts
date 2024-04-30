import { createEvent, createStore } from "effector";

// mob menu
export const $isOpenMobMenu = createStore<boolean>(false)
export const onChangeIsOpenMobMenu = createEvent<boolean>()
$isOpenMobMenu.on(onChangeIsOpenMobMenu, (_, t) => t)

// favorite
export const $isOpenFavorite = createStore<boolean>(false)
export const onChangeIsOpenFavorite = createEvent<boolean>()
$isOpenFavorite.on(onChangeIsOpenFavorite, (_, t) => t)

// bucket
export const $isOpenBucket = createStore<boolean>(false)
export const onChangeIsOpenBucket = createEvent<boolean>()
$isOpenBucket.on(onChangeIsOpenBucket, (_, t) => t)

// search
export const $isOpenSearch = createStore<boolean>(false)
export const onChangeIsOpenSearch = createEvent<boolean>()
$isOpenSearch.on(onChangeIsOpenSearch, (_, t) => t)

// notification
export const $notification = createStore<any>({
  title: '',
  message: ''
})
export const onSetNotification = createEvent<any>()
export const onResetNotification = createEvent<any>()
$notification.on(onSetNotification, (_, t) => t)
$notification.on(onResetNotification, () => ({title: '', message: ''}))
