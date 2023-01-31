// Importing express library to access server methods, handle http protocol and more.
const express = require('express')
// Importing a connection js file to connect to mongodb cloud atlas.
const connection = require('./db/connect')
// Importing my routes created for endpoints.
const routes = require('./routes/route')

// Creating an instance of express object
/**
 * This object contains all logic to handle http requests,
 * And modify server behavior like middlewares etc...
 * 
 * A Middleware is a software that intercept a call between previous two softwares and it
 * could modify the data in movement to process and return back to the destination modified.
 */
const app = express()

// Middlewares for some compatibility with http request

// Json() allows us to convert the body into json. 
app.use(express.json())
// Urlencoded allows us to encoded the form-data-urlencoded to key/value pairs and use it in the app.
app.use(express.urlencoded({ extended: true }))
// use our customized routes created with previous path /api/
app.use("/api", routes)


// set the port that the sv will be listening
const port = 8000
const after_listen = () => {
    console.log(
        "Listening to ", port
    )
}

const start = () => {
    // connect to database
    connection()
    console.log("Connected to database...")
    // set app to listen
    app.listen(port, after_listen())
}

start()