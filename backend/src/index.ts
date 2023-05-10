import express from "express";
import * as dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connection from "./config/dbConfig";
import roleRouter from "./routes/roleRoutes"
import userRouter from "./routes/userRoutes"
import { error } from "console";
import { errorHandler, notFound } from "./middleware/errorHandler";
const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors({
    origin:"*"
}))

app.use(express.json())

// connection.sync({force:true}).then(() => {
//     console.log('drop and rebase')
// })

app.use("/api/user", userRouter)
app.use("/api/role", roleRouter)


app.use(notFound)
app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("Hello there")
})

connection.authenticate().then(()=> {
    console.log("Connection successful ......")
    app.listen(PORT,() => {
        return console.log(`express is started on port ${PORT}`)
    })
}).catch((error) => {
    console.log(`unable to establish connection .....`, error)
})