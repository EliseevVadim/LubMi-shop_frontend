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

// checkout
export const $isOpenCheckout = createStore<boolean>(false)
export const onChangeIsOpenCheckout = createEvent<boolean>()
$isOpenCheckout.on(onChangeIsOpenCheckout, (_, t) => t)

// search
export const $isOpenSearch = createStore<boolean>(false)
export const onChangeIsOpenSearch = createEvent<boolean>()
$isOpenSearch.on(onChangeIsOpenSearch, (_, t) => t)

// leave message modal
export const $isOpenLeaveMessage = createStore<any>('')
export const onChangeIsOpenLeaveMessage = createEvent<any>()
$isOpenLeaveMessage.on(onChangeIsOpenLeaveMessage, (_, t) => t)
export const $isOpenLeaveMessageSize = createStore<any>('')
export const onChangeIsOpenLeaveMessageSize = createEvent<any>()
$isOpenLeaveMessageSize.on(onChangeIsOpenLeaveMessageSize, (_, t) => t)

// leave message modal
export const $productModal = createStore<any>({})
export const setProductModal = createEvent<any>()
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
