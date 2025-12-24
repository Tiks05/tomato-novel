import axios from 'axios'
/**
 * OAuth2 / OpenID Connect token response
 * Returned by POST /connect/token
 */
export interface OAuthTokenResponse {
  /** Access token */
  access_token: string

  /** Refresh token */
  refresh_token: string

  /** Expiration time in seconds */
  expires_in: number

  /** Token type (usually "Bearer") */
  token_type: string

  /** Granted scopes */
  scope?: string
}

const oauthAxios = axios.create({
  timeout: 5000,
})

/**
 * Refresh Token Grant
 */
export const refreshAccessToken = async (refreshToken: string): Promise<OAuthTokenResponse> => {
  const form = new URLSearchParams()
  form.append('grant_type', 'refresh_token')
  form.append('refresh_token', refreshToken)

  const { data } = await oauthAxios.post('https://localhost:7000/connect/token', form, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return data
}

/**
 * Password Grant（可选，登录时用）
 */
export const fetchTokenByPassword = async (username: string, password: string): Promise<OAuthTokenResponse> => {
  const form = new URLSearchParams()
  form.append('grant_type', 'password')
  form.append('username', username)
  form.append('password', password)
  form.append('scope', 'openid offline_access onlinestudy_api.read')

  const { data } = await oauthAxios.post('https://localhost:7000/connect/token', form, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return data
}
