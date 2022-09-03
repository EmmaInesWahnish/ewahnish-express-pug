const { normalize, schema, denormalize } = require('normalizr');

const authorSchema = new schema.Entity('author');

const messageSchema = new schema.Entity('message', {
    author: authorSchema
})

const postSchema = new schema.Entity('post', {

    message: [messageSchema]
})

let bothLists = {}

let originalSize;

let normalizedSize;

const normalizeAndDenormalize = async (messageList) => {
    let post = {
        id: 1,
        message: messageList
    }

    //Normalizing and denormalizing
    try {
        originalSize = JSON.stringify(post).length;
        console.log("Original Size ", originalSize);
        let normalizedList = await normalize(post, postSchema);
        normalizedSize = JSON.stringify(normalizedList).length;
        let percentage = Math.floor(((Number(originalSize)-Number(normalizedSize))*100)/Number(originalSize))
        console.log("Normalized size ", normalizedSize);
        console.log(JSON.stringify(normalizedList, null, '\t'))
        try {
            let denormalizedList = await denormalize(normalizedList.result, postSchema, normalizedList.entities);
            bothLists = {
                originalSize: originalSize,
                normalizedSize: normalizedSize,
                percentage: percentage,
                normalized: normalizedList,
                denormalized: denormalizedList
            }

            return bothLists;
        }
        catch (error) {
            console.log(error)
        }

    }
    catch (error) {
        console.log(error)
    }

}

module.exports = normalizeAndDenormalize