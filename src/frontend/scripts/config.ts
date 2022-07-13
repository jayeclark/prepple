export const GOOGLE_AUTH_URI = process.env.GOOGLE_AUTH_URI
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

export const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=${new Date(Date.now()).getTime()}&redirect_uri=${encodeURI(FRONTEND_URL)}/api/auth/callback/google&client_id=662813541403-ci6knndlpefbftbrdi33vco30vmtq1rr.apps.googleusercontent.com`;