
// Some input data checks here...
const isValidImage = (image) => {

    const ext = image.toString().split('.')[1]
    return (ext == "jpg" || ext == "png" || ext == "jpeg")
}

const noImage = (request_data) => {
    return request_data.file || request_data.files
}

module.exports = {
    noImage, isValidImage
}