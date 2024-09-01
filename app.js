const express = require("express")
const app = express()
const i18n = require("./config/i18n")
const i18nextMiddleware = require('i18next-http-middleware');
const dotenv = require("dotenv")
dotenv.config()
const connectToDB = require("./config/database")
const userRoutes = require("./routes/user.routes")
const bookRoutes = require("./routes/books.routes")
 const libraryRoutes = require("./routes/library.routes")
const { checkAuth, checkRole } = require("./middlewares/authmiddleware")

connectToDB()

app.use(i18nextMiddleware.handle(i18n));
app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/library", checkAuth, libraryRoutes)
 app.use("/api/books", checkAuth, checkRole("Author"), bookRoutes)


app.listen(8080, ()=>console.log("server started on 8080 port"))