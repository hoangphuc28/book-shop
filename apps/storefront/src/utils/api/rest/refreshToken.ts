import axios, { AxiosError } from "axios";
import { authApi, baseUrl } from "..";
import { Logout } from "./auth/logout";


export const refreshToken = async (callBack: void) => {

  try {
    const res = await axios({
      url: `${baseUrl+authApi.refreshToken}`,
      method: 'GET',
      withCredentials: true
    })
    return res.data
  } catch (error) {
    Logout()
    console.log(error)
  }
};
