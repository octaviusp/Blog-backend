// Importing article model from articles
/**
 * This instance of articles will be set up automatically when we connect to mongodb.
 * So once the connection is correct, article.find() will search in that database.
 * According the configured, article will search inside "Articles" collection in mongodb.
 */
const article = require('../models/Articles')
// A filesystem native library of node.
const fs = require('fs')
// A Path native library of node to send files to the client.
const path = require('path')
// To parse image names.
const { parseName } = require('../helpers/imageUploader')

/**
 * @dev this function read only one article with the unique _id set by mongo.
 * @param {req} request object 
 * @param {res} response object
 */
const readArticle = async (req, res) => {

    try {
        const article_found = await article.findById(req.params.id)

        if (!article_found) {
            res.status(200).json({ "Articles": "No articles", "Count": 0 })
        }

        res.status(200).json({ "Articles": article_found, "Count": article_found.length })
    } catch (error) {
        res.status(400).json({
            "Status": "Article wasn't found",
        })
    }


}

/**
 * @dev this function create and article with body params.
 * The body will be parsed into a json thanks to express.json() middleware.
 * @param {req} request object 
 * @param {res} response object
 */
const createArticle = async (req, res) => {


    const article_received = req.body


    try {

        if (req.file) {
            article_received.image = parseName(req.file.originalname)
        } else {
            article_received.image = "NoImage.png"
        }

        await article.create(article_received)

        res.status(201).json({
            "Status": "Article created successfully",
            "Article": article_received
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "Status": "We can't create the article, see error in the next text.",
        })
    }

}

/**
 * @dev this function delete an article by unique _id.
 * @param {req} request object 
 * @param {res} response object
 */
const deleteArticle = async (req, res) => {

    try {
        const article_removed = await article.findOneAndDelete({ _id: req.params.id })

        if (!article_removed) {
            res.status(200).json({
                "Status": "Article wasn't found",
                "Article": {}
            })
        }

        res.status(200).json({
            "Status": "Article removed successfully",
            "Article": article_removed
        })
    } catch (error) {
        res.status(400).json({
            "Status": "We can't remove the article",
        })
    }
}

/**
 * @dev this function update an article by the unique id.
 * also uses body to set new data, thx to express.json().
 * @param {req} request object 
 * @param {res} response object
 */
const updateArticle = async (req, res) => {


    try {

        const new_data = req.body

        if (req.file) {
            new_data.image = parseName(req.file.originalname)
        }

        const article_updated = await article.findByIdAndUpdate(req.params.id, new_data, { new: true })


        res.status(200).json({
            "Status": "Article updated successfully",
            "Article": article_updated
        })

    } catch (error) {
        res.status(400).json({
            "Status": "We can't remove the article",
        })
    }

}

/**
 * @dev this function returns all articles into an array.
 * We could set a limit to paginate it.
 * @param {req} request object 
 * @param {res} response object
 */
const getArticles = async (req, res) => {

    try {
        const number = req.params.limit
        const limit = (parseInt(number)) ? parseInt(number) : undefined;
        const articles = await article.find({}).limit(limit)

        res.status(200).json({ articles, "Count": articles.length })
    } catch (error) {
        res.status(400).json({
            "Status": "There isn't articles to see",
        })
    }
}

const getImage = async (req, res) => {

    let local_path = "./assets/articles/" + req.params.image
    try {
        fs.access(local_path, (image) => {
            res.status(200).sendFile(path.resolve(local_path))
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: "Image doesn't exists"
        });
    }
}

/**
 * @dev this function are made for search articles more faster with keywords.
 * We could set the source of search title or description.
 * This are posible thanks to params into the url.
 * @param {req} request object 
 * @param {res} response object
 */
const searchEngine = async (req, res) => {

    let search = req.params.search
    const source = req.params.source
    let splitted
    try {
        splitted = search.split('+').join(" ")
    } catch {
        splitted = search
    }
    let compatible_articles

    try {

        if (source == "title") {
            compatible_articles = await article.find({ title: splitted })
        } else if (source == "description") {
            compatible_articles = await article.find({ description: splitted })
        }

        res.status(200).json({
            Status: "Success",
            Articles: compatible_articles,
            Count: compatible_articles.length
        })




    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Articles: [{}],
            Count: 0

        })
    }


}

module.exports = {
    createArticle,
    readArticle,
    updateArticle,
    deleteArticle,
    getArticles,
    getImage,
    searchEngine
}