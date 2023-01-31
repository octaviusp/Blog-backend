// Importing mongoose dependecies
/**
 * Mongoose is an ODM (Object data mapping) - an ODM is a software that
 * transform SQL queries into Objects.
 * It means that a query could be made writing something like:
 * Database.create(new_Data), and this function will save that new_Data variable.
 * OF course the new_data needs to follow a protocol or a schema to be inserted.
 * In the case of NoSql databases like mongo, we could insert many jsons as we want
 * an it could has whatever schema it has.
 * Mongoose start from:
 * 
 * Create a schema - Schema is a structure that the data inserted need to follow.
 * Create a model - a Model is the object that will follow the schema structure and 
 * it contains all methods of sql queryes.
 * Create a collection - a collection is a set of documents and that documents
 * are jsons that are created by the model following the schema.
 * MOngodb transform json into bson, binary json, to operate faster within it.
 */
const { mongoose } = require('mongoose')
// Private env dependencie, we need to configure the path of the env file.
require('dotenv').config({ path: '../../../private.env' })

/**
 * Asynchronous call to mongoose connection.
 * It needs to be asynchronous cause this call may late.
 * And we need to wait the response to know if we could continue or not.
 * This is inside a try/catch block, cause this codeblock is prone to error.
 */
const connection = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }

}


module.exports = connection