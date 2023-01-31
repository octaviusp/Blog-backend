// Importing Schema and Model from mongoose dependencies
const { Schema, model } = require('mongoose')
// a Plugin to search inside a model collection
const searchable = require('mongoose-searchable')

const limit = (number, type) => `The ${type} length of the title is ${number} letters`

// Instance of schema
const ArticleSchema = Schema({
    title: {
        type: String,
        minlength: [2, limit(2, "minimum")],
        maxlength: [50, limit(50, "maximum")]
    },
    description: {
        type: String,
        minlength: [2, limit(2, "minimum")],
        maxlength: [500, limit(500, "maximum")]
    },
    image: {
        type: String,
        default: "NoImage.png"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Setting the created schema to has the searchable plugin,
// only the fields title and description.
ArticleSchema.plugin(searchable, {
    fields: ['title', 'description'],

})

// We create a model instance calle Article, with the ARticleSchema inside Articles collection.
module.exports = model("Article", ArticleSchema, "Articles")