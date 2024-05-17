import { api } from "../../../../api/ApiWithoutToken";
import { $selectedCities, $selectedStreet } from "../model/index";


export const bucketCheckout = async (data: any): Promise<any> => {
  const response = await api.post<any>("/service/checkout/",data);
  return response;
};

export const bucketCities = async (search: any): Promise<any> => {
  const response = await api.get<any>(`/service/cities/${search}/`);
  return response.data;
};

export const bucketStreet = async (data: any): Promise<any> => {
  if ($selectedCities?.getState()?.id){
    const response = await api.get<any>(`/service/streets/${$selectedCities?.getState()?.id}/${data}/`);
    return response.data;
  }
};

export const bucketBuilding = async (data: any): Promise<any> => {
  if ($selectedCities?.getState()?.id && $selectedStreet){
    console.log(`/service/streets/${$selectedCities?.getState()?.id}/${$selectedStreet?.getState()}/${data}/`)
    const response = await api.get<any>(`/service/buildings/${$selectedCities?.getState()?.id}/${$selectedStreet?.getState()}/${data}/`);
    return response.data;
  }
};

export const bucketCalculate = async (data: any): Promise<any> => {
  const response = await api.post<any>("/service/estimate-scart/", {
    cu_city_uuid: $selectedCities.getState()?.id,
    scart: data?.map((item: any) => ({ppk: item?.article, size_id: item?.size?.id, quantity: item?.quantity}))
  });
  return response;
};

export const CheckOrderPayed = async (invoice_id: any): Promise<any> => {
  const res = await api.get<any>(`/yookassa/payments/${invoice_id}/status/`);
  return res;
};
