import axios, { AxiosError } from "axios";
import { authApi, baseUrl } from "../../../api/index";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth";
import { LogoutApi } from "./logout";



export const refreshToken = async () => {
  try {
    const res = await axios({
      url: `${baseUrl+authApi.refreshToken}`,
      method: 'GET',
      withCredentials: true
    })
    localStorage.setItem('accessToken', res.data.accessToken)
    return res.data
  } catch (error) {
    LogoutApi()
    console.log(error)
  }
};
