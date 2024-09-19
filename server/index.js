require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
const staticPath = path.join(__dirname, 'static');
app.use('/static', express.static(staticPath));
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}


start()