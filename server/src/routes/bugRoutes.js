import express from 'express';
import { getBugs, createBug } from '../controllers/bugController.js';

const router = express.Router();

router.get('/', getBugs);
router.post('/', createBug);

export default router;
