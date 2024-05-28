import { ActionType, useSession } from "../../../providers/auth"
import axios from "axios"
import { baseUrl, authApi } from "../.."

export const Logout = async () => {
  try {
    await axios({
      url: `${baseUrl + authApi.logout}`,
      method: 'POST',
      withCredentials: true,
    })
    localStorage.removeItem('accessToken')
  } catch (error: any) {
    console.log(error)
  }
}
