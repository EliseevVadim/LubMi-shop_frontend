import { createEffect, createEvent, createStore, sample } from "effector";
import { persist } from 'effector-storage/local'
import {
  bucketBuilding,
  bucketCalculate,
  bucketCheckout,
  bucketCities, bucketPSVs,
  bucketStreet,
  CheckOrderPayed, CheckRussianPost, prPostOfficesPost
} from "../api/index";
import { debounce } from "patronum";

export const $bucket = createStore<any[]>([]);
export const $bucketCalculated = createStore<any>(null);

persist({
  store: $bucket,
  key: "bucket",
  keyPrefix: "v1",
});
persist({
  store: $bucketCalculated,
  key: "bucketCalculated",
  keyPrefix: "v1",
});

export const addToBucketEvent = createEvent<any>();
export const removeFromBucketEvent = createEvent<any>();
export const resetBucket = createEvent<any>();
export const changeCountEvent = createEvent<any>();


export const BucketCheckoutFx = createEffect<any, any, Error>(async(data) => {
  const res = await bucketCheckout(data);
  if (res?.status !== 200) throw new Error(res.message);
  return res.data;
});

export const CalculateBucketFx = createEffect<any, any, Error>(async() => {
  const res = await bucketCalculate($bucket?.getState());
  if (res?.status !== 200) throw new Error(res.message);
  return res.data;
});
$bucketCalculated.on(CalculateBucketFx.doneData, (_, t) => t)

$bucket.on(addToBucketEvent, (state, payload) => {

  const doctorExists: any = state?.find(item => item?.article === payload?.article && item?.size?.id === payload?.size?.id);
  if (doctorExists) {
    return state.map((item: any) => item?.article === doctorExists?.article && item?.size?.id === doctorExists?.size?.id ? {
      ...item,
      quantity: item?.quantity + 1
    } : item);
  } else {
    return [...state, payload];
  }
})
$bucket.on(changeCountEvent, (state, payload) => {
  return state.map((item: any) => item.article === payload?.article && item?.size?.id === payload?.size?.id
    ? payload
    : item
  );
})
$bucket.on(removeFromBucketEvent, (state, payload) => {
  return state?.filter((item: any) => String(item?.article).concat(item?.size?.id) !== String(payload?.article).concat(payload?.size?.id))
})
$bucket.on(resetBucket, () => [])

//города
export const $cities = createStore<any[]>([]);
export const $pvs = createStore<any[]>([]);
export const $streets = createStore<any[]>([]);
export const $building = createStore<any[]>([]);
export const $selectedCities = createStore<any>(null);
export const $selectedPVS  = createStore<any>(null);
export const $selectedStreet = createStore<any>(null);
export const $selectedBuilding = createStore<any>(null);

export const onSelectCity = createEvent<any>();
export const onSelectPVS = createEvent<any>();
export const onSelectStreet = createEvent<any>();
export const onSelectBuilding = createEvent<any>();
$selectedCities.on(onSelectCity, (_, t) => t)
$selectedPVS.on(onSelectPVS, (_, t) => t)
$selectedStreet.on(onSelectStreet, (_, t) => t)
$selectedBuilding.on(onSelectBuilding, (_, t) => t)

export const $selectedDelivery = createStore<any>('cd');
export const onSelectDelivery = createEvent<any>();
$selectedDelivery.on(onSelectDelivery, (_, t) => t)

export const CityFX = createEffect<any, any, Error>(async(data) => {
  const res = await bucketCities(data);
  if (!res.success) throw new Error(res.message);
  return res?.cities;
});
export const PVSFX = createEffect<any, any, Error>(async(data) => {
  const res = await bucketPSVs(data);
  if (!res.success) throw new Error(res.message);
  return res?.['delivery-points'];
});
export const StreetFX = createEffect<any, any, Error>(async(data) => {
  const res = await bucketStreet(data);
  if (!res.success) throw new Error(res.message);
  return res?.streets;
});
export const BuildingFX = createEffect<any, any, Error>(async(data) => {
  const res = await bucketBuilding(data);
  if (!res.success) throw new Error(res.message);
  return res?.buildings;
});
$cities.on(CityFX.doneData, (_, t) => t)
$pvs.on(PVSFX.doneData, (_, t) => t)
$streets.on(StreetFX.doneData, (_, t) => t)
$building.on(BuildingFX.doneData, (_, t) => t)

//города


const CalcDebounce = createEvent<any>();
const CalculateDebounce = debounce({
  source: CalcDebounce,
  target: CalculateBucketFx,
  timeout: 1000,
});

sample({
  clock: [removeFromBucketEvent, changeCountEvent, addToBucketEvent, onSelectCity],
  target: CalcDebounce,
});


export const $activeOrderId = createStore<any>(null)
export const changeActiveOrder = createEvent<any>()
persist({
  store: $activeOrderId,
  key: "activeOrderId",
  keyPrefix: "v1",
});
$activeOrderId.on(changeActiveOrder, (_, t) => t)

export const CheckOrderPayedFx = createEffect<void, boolean, Error>(async() => {
  if (!$activeOrderId?.getState()) return;
  const res = await CheckOrderPayed($activeOrderId?.getState());
  if (res?.status !== 200) throw new Error(res.message);
  return res;
});

export const $isRussianPostAvaible = createStore(true)

export const CheckRussianPostFx = createEffect<void, boolean, Error>(async() => {
  const data = {
    region: $selectedCities.getState()?.region,
    city: $selectedCities.getState()?.city,
    street: $selectedStreet.getState(),
    building: $selectedBuilding.getState()
  }

  console.log(data)
  console.log($selectedCities.getState())

  const res = await CheckRussianPost(data);
  if (res?.status !== 200) throw new Error(res.message);
  return res?.data?.['address-is-valid'];
});

$isRussianPostAvaible.on(CheckRussianPostFx.doneData, (_,t ) => t)


