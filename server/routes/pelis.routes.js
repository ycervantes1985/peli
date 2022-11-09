const { addPeli, getAllPelis, deletePeli, updatePeli, getOnePeli, addPeliReview } = require("../constrollers/pelis.controllers");

module.exports = (app) => {
    app.post('/api/peli', addPeli);
    app.get('/api/peli', getAllPelis);
    app.get('/api/peli/:id', getOnePeli)
    app.delete('/api/peli/:id', deletePeli);
    app.put('/api/peli/:id', updatePeli)
    app.post('/api/peli/review/:id', addPeliReview)
}
