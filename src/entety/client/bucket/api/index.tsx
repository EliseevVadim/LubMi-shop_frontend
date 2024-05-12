import { api } from "../../../../api/ApiWithoutToken";
import { $selectedCities } from "../model/index";


export const bucketCheckout = async (data: any): Promise<any> => {
  const response = await api.post<any>("/service/checkout/",data);
  return response;
};

export const bucketCities = async (search: any): Promise<any> => {
  const response = await api.get<any>(`/service/cities/${search}/`);
  return response.data;
};

export const bucketCalculate = async (data: any): Promise<any> => {
  const response = await api.post<any>("/service/estimate-scart/", {
    cu_city_uuid: $selectedCities.getState()?.id,
    scart: data?.map((item: any) => ({ppk: item?.article, size_id: item?.size?.id, quantity: item?.quantity}))
  });
  return response;
};
