import axios from "axios"
import { baseUrl, authApi } from "../.."
import { Login } from "../../../interfaces/login"

export const LoginApi = async (data: Login) => {
  try {
    const res = await axios({
      url: `${baseUrl+authApi.login}`,
      method: 'POST',
      data: data,
      withCredentials: true
    })
    localStorage.setItem('accessToken', res.data.accessToken)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Error');
    }
  }
}
