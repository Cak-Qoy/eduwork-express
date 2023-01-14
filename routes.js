const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const {name, age} = req.query;
    res.send({
        status: 'successfully',
        message: 'wellcome to express js tutorial',
        name,
        age
    })
})

router.get('/product/:id', (req, res) => {
    res.json({
        id: req.params.id,
        message: 'wellcome to get params'
    })
})

router.post('/users/', upload.single('image'), (req, res) => {
    const { name, age } = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target);
        res.json({name, age, image});
        // res.sendFile(target);
    }
})

// router.get('/:category/:tag', (req, res) => {
//     const {category, tag} = req.params;
//     res.json({category, tag})
// })

module.exports = router;