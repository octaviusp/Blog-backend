/**
 * Multer is for upload files into the server.
 * 
 * In this case we'll use multer to upload image files.
 */
const multer = require('multer')
const { isValidImage } = require('../helpers/validatorInputs')

/**
 * multer.diskSTorage set where and how the data will be stored inside the server.
 */
const settings = multer.diskStorage({
    // Destination set the final path where the images will be uploaded.
    destination: function (req, file, cb) {

        // If is a valid image upload, otherwise no.
        if (isValidImage(file.originalname)) {
            // cb = stands for callback, callback is a function pass like parameter into another function.
            /* 
                This functions are called first order functions, this could receive another functions.
                The first parameter in this case is for errors, we don't have errors so null.
                Finally the path where image will be uploaded.
            */
            cb(null, './assets/articles')
        } else {
            // If the image isn't valid, throw an error.
            throw new Error("Please provide a valid image")
        }
    },
    // Filename set the final name of the uploaded file.
    filename: function (req, file, cb) {
        // cb = callback, 
        // This cb is for set the name.
        cb(null, "article-" + file.originalname)
    }
})

// Creating a instance of multer with previous storage settings 
const multer_object = multer({ storage: settings })

// just add a string to another string
const parseName = (name) => "article-" + name


module.exports = { multer_object, parseName }
