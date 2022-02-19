// import all the query objects
const addQueries = require('./addQueries');
const getQueries = require('./getQueries');
const removeQueries = require('./removeQueries');
const updateQueries = require('./updateQueries');

// export those objects back to index.js in root
module.exports = { addQueries, getQueries, removeQueries, updateQueries }