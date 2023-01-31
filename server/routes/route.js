/**
 * We extracted Router object from express dependencie.
 * Router is a object that routes many paths in server to finish into a endpoint.
 * An endpoint is a last path that returns a final response.
 * A Same route could has multiple http request methods.
 * We could use composition to composite it functions.
 */
const { Router } = require('express')
/**
 * Multer is for upload files inside our server.
 */
const { multer_object } = require('../helpers/imageUploader')

// instance of Router.
const router = Router()

// Grabbing all controllers
const { createArticle, readArticle, updateArticle, deleteArticle, getArticles, getImage, searchEngine } = require('../controllers/Article')

// Setting the routes and its controllers,
/* 
    Some routes has middlewares.
    Middlewares are functions that intercept the call to modify the data to process it
    and return something.

    Example:

    put(multer_object.single("image"), updateArticle)
    It means: in this route with put method, before exec updateArticle controller,
    we gonna exec the multer_object.single("image") middleware, then exec the controller.
    In this case this is for upload the image in to the server, then update the article.
*/
router.get("/articles/:limit?", getArticles)
router.route("/article/:id").get(readArticle).put(multer_object.single("image"), updateArticle).delete(deleteArticle)
router.route("/article").post(multer_object.single("image"), createArticle)
router.route("/image/:image").get(getImage)
router.route("/article/:source/:search").get(searchEngine)

module.exports = router
