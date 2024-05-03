import { api } from "../../../../api/ApiWithoutToken";
import { apiToken } from "../../../../api/ApiWithToken";

export const Auth = async (data: {username: string, password: string}): Promise<any> => {
  return await api.post("", {username: data?.username, password: data.password});
};

