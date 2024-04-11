export default () => ({
    secret: process.env.SECRET_JWT,
    expireJwt: process.env.JWT_EXPIRE,
    passForGoogle: process.env.PASSWORD_FOR_ACCOUNT_GOOGLE,
    googleSecretId: process.env.GOOGLE_SECRET_ID,
    googleSecretKey: process.env.GOOGLE_SECRET_KEY,
    googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL,
    secretSession: process.env.SESSION_SECRET,
    redirectForFrontUrl: process.env.REDIRECT_URL_FRONT_FOR_AUTH

})