require('dotenv').config()

const _config = {
    PORT: process.env.PORT || 4000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://rihanazar0:O3foRJNH1cKTvSsv@cluster1.kawjq.mongodb.net/LMSProject',
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET || '',
}

const config = Object.freeze(_config)

module.exports = config