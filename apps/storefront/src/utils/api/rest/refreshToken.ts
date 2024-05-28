import axios from "axios";
import { authApi, baseUrl } from "..";
import { ActionType, SessionContext, useSession } from "../../providers/auth";
import { Logout } from "./auth/logout";


export const refreshToken = async () => {
  const {dispatch}: any = useSession

  try {
    const res = await axios({
      url: `${baseUrl+authApi.refreshToken}`,
      method: 'GET',
      withCredentials: true
    })
      localStorage.setItem('accessToken', res.data.accessToken)
      // dispatch({type: ActionType.SET_TOKEN, payload: res.data.accessToken})
  } catch (error) {
    Logout()
    //window.location.href = '/auth/login'
    console.log(error)
  }
};
