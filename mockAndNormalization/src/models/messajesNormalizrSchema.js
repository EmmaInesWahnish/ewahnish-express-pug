const normalize = require('normalizr');
const schema = require('normalizr');
const denormalize = require('normalizr');

const authorSchema = new schema.Entity('authors');
const commentSchema = new schema.Entity('comment',{
    author: authorSchema
})