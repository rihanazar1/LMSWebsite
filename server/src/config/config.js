require('dotenv').config()

const _config = {
    PORT: process.env.PORT || 4000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://rihanazar0:O3foRJNH1cKTvSsv@cluster1.kawjq.mongodb.net/LMSProject',
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || 'whsec_4yDiWJJtcV/Khuh2hNjfC/L3OR8kLpCc',
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || 'pk_test_YWN0aXZlLXJhdmVuLTgyLmNsZXJrLmFjY291bnRzLmRldiQ',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || 'sk_test_XAYi5O5tqG8ZsZXBGdXeHQQNZSThl6vFNfd5MHUKQd',
    CLOUDINARY_NAME:  process.env.CLOUDINARY_NAME || 'dmjwywk01',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '215873972446872',
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY || 'sSUjHJjoJmkFMqJoDYpCA9lyi4Y',
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51R2eX5LuW9QvPZB5itvPolwbVbSTlv3PxFd8vMJW54WjQ4myjLdV6FMraNlNN3RtXBjcluPjwYmRM6CiU2A0NFib00DU0GBrc0',
    STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY || 'sk_test_51R2eX5LuW9QvPZB5yThGFSe4dyEp3mczi13XSXOVwvxejbOypJoJJS3RG2nhs8l4ZUHUjSfXrv7rjVVRwLaZ0W4100yUOGQsHI',
    CURRENCY : process.env.CURRENCY,
    STRIPE_WEBHOOK_SECRET : process.env.STRIPE_WEBHOOK_SECRET || 'whsec_bl4gp6n9WiKGconJGeUjTej2mzSsdhGw' 
}

const config = Object.freeze(_config)

module.exports = config