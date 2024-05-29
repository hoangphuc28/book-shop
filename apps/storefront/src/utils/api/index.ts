export const baseUrl = process.env.API_BASE_URL
export const authApi = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  refreshToken: '/auth/refresh',
  resetPassword: '/auth/password-reset',
  verifyResetPassword: '/auth/verify-password-reset',

}
export const accountApi = {
  getInformation: "/account/information",
}
export const resource = {
  uploadAvatar: '/resource/avatar'
}

