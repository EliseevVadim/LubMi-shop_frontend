import { api } from "../../../api/ApiWithoutToken";

export const postFeedBack = async (data: any): Promise<any> => {
  const response = await api.post<any>("/customer/notify-me-product-delivery/",data);
  return response.data;
};
