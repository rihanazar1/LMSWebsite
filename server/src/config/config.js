require('dotenv').config()

const _config = {
    PORT: process.env.PORT || 4000,
    MONGODB_URL: process.env.MONGODB_URL ,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET ,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY ,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ,
    CLOUDINARY_NAME:  process.env.CLOUDINARY_NAME ,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY ,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY ,
    CURRENCY : process.env.CURRENCY,
    STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET
}

const config = Object.freeze(_config)

module.exports = config