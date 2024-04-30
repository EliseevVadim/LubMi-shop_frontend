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

// leave message modal
export const $isOpenLeaveMessage = createStore<boolean>(false)
export const onChangeIsOpenLeaveMessage = createEvent<boolean>()
$isOpenLeaveMessage.on(onChangeIsOpenLeaveMessage, (_, t) => t)

// leave message modal
export const $productModal = createStore<string>('')
export const setProductModal = createEvent<string>()
$productModal.on(setProductModal, (_, t) => t)

// notification
export const $notification = createStore<any>({
  title: '',
  message: ''
})
export const onSetNotification = createEvent<any>()
export const onResetNotification = createEvent<any>()
$notification.on(onSetNotification, (_, t) => t)
$notification.on(onResetNotification, () => ({title: '', message: ''}))
