import express from 'express';
import multer from 'multer';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import { body, validationResult } from 'express-validator';
import fs from 'fs'; 

const router = express.Router();

const uploadDir = 'public/uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

let posts = [];

const postValidationRules = [
    body('title').trim().isLength({ max: 50 }).withMessage('Title must be under 50 characters.'),
    body('content').trim().isLength({ max: 500 }).withMessage('Content must be under 500 characters.')
];

// --- ROUTES ---

router.get('/', (req, res) => {
    res.render('index', { allPosts: posts }); 
});

router.post('/create', upload.single('image'), postValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // NEW: Re-render the page and pass the error message gracefully
        return res.render('index', { allPosts: posts, errorMessage: errors.array()[0].msg });
    }

    const cleanTitle = sanitizeHtml(req.body.title);
    const cleanContent = sanitizeHtml(req.body.content);

    const newPost = {
        id: Date.now(),
        title: cleanTitle,
        content: cleanContent,
        date: new Date().toLocaleString(),
        imagePath: req.file ? `/uploads/${req.file.filename}` : null 
    };

    posts.push(newPost);
    res.redirect('/');
});

router.get('/edit/:id', (req, res) => {
    const idToEdit = parseInt(req.params.id);
    const postToEdit = posts.find(post => post.id === idToEdit);

    if (!postToEdit) return res.redirect('/');
    res.render('edit', { post: postToEdit });
});

router.post('/edit/:id', upload.single('image'), postValidationRules, (req, res) => {
    const idToEdit = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === idToEdit);

    if (postIndex === -1) return res.redirect('/');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('edit', { post: posts[postIndex], errorMessage: errors.array()[0].msg });
    }

    posts[postIndex].title = sanitizeHtml(req.body.title);
    posts[postIndex].content = sanitizeHtml(req.body.content);
    
    if (req.file) {
        if (posts[postIndex].imagePath) {
            try {
                fs.unlinkSync(path.join('public', posts[postIndex].imagePath));
            } catch (err) {
                console.error("Could not delete old image", err);
            }
        }
        posts[postIndex].imagePath = `/uploads/${req.file.filename}`;
    }

    posts[postIndex].date = new Date().toLocaleString();
    posts[postIndex].isEdited = true;

    const updatedPost = posts.splice(postIndex, 1)[0]; 
    posts.push(updatedPost); 
    
    res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const postToDelete = posts.find(post => post.id === idToDelete);
    
    if (postToDelete && postToDelete.imagePath) {
        try {
            fs.unlinkSync(path.join('public', postToDelete.imagePath));
        } catch (err) {
            console.error("Could not delete image", err);
        }
    }

    posts = posts.filter(post => post.id !== idToDelete);
    res.redirect('/');
});

export default router;