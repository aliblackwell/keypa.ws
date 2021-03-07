const nano = require('nano')(`https://aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}@db.keypa.ws:6984`);

const { AnalyticsNotification } = require("./mailer")

async function LogEvent(req, event) {
    try {
        // const isLive = req.body.hostName.includes("www")
        // isLive && AnalyticsNotification(event.eventType)
        const db = isLive ? "analytics" : "dev-analytics"
        const analyticsDb = nano.db.use(db)
        return await analyticsDb.insert(req.body)
    } catch (e) {
        throw e
    }
}

module.exports = { LogEvent }