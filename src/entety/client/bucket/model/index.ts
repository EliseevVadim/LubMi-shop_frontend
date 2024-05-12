import { createEffect, createEvent, createStore, sample } from "effector";
import { persist } from 'effector-storage/local'
import { bucketCalculate, bucketCheckout, bucketCities } from "../api/index";
import { debounce } from "patronum";

export const $bucket = createStore<any[]>([]);
export const $bucketCalculated = createStore<any[]>([]);

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

export const CalculateBucketFx = createEffect<any, any, Error>(async(data) => {
  const res = await bucketCalculate($bucket?.getState());
  if (res?.status !== 200) throw new Error(res.message);
  return res.data;
});
$bucketCalculated.on(CalculateBucketFx.doneData, (_, t) => t)

$bucket.on(addToBucketEvent, (state, payload) => {
  const doctorExists: any = state?.find(item => item?.article === payload?.article && item?.size?.id === payload?.size?.id);
  if (doctorExists) {
    return state.map((item: any) => item.article === doctorExists?.article ? {
      ...item,
      quantity: item?.quantity + 1
    } : item);
  } else {
    return [...state, payload];
  }
})
$bucket.on(changeCountEvent, (state, payload) => {
  return state.map((item: any) => item.article === payload?.article
    ? payload
    : item
  );
})
$bucket.on(removeFromBucketEvent, (state, payload) => {
  return state.filter((item: any) => item?.article !== payload?.article && item?.size?.id !== payload?.article?.size?.id)
})
$bucket.on(resetBucket, () => [])

//города
export const $cities = createStore<any[]>([]);
export const $selectedCities = createStore<any>(null);

export const onSelectCity = createEvent<any>();
$selectedCities.on(onSelectCity, (_, t) => t)

export const $selectedDelivery = createStore<any>('cd');
export const onSelectDelivery = createEvent<any>();
$selectedDelivery.on(onSelectDelivery, (_, t) => t)

export const CityFX = createEffect<any, any, Error>(async(data) => {
  const res = await bucketCities(data);
  if (!res.success) throw new Error(res.message);
  return res.cities;
});
$cities.on(CityFX.doneData, (_, t) => t)
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



