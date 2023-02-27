import 'reflect-metadata';
import express = require('express');
import quizController from '../controller/quiz.controller';


const router = express.Router();


/**
 * Routing for the quiz API
 * @param {express.Router} router
 */


router.post('/create',quizController.createQuiz);

/** Quiz
 * Get quizs @query: is_publish = 0 | 1,
 */

router.get('/all',quizController.getQuizs);


/** Quiz
 * Get quizs by pagination @query: is_publish = 0 | 1,
 */

router.get('/paginate',quizController.getQuizByPagination);


/** Quiz
 * Get quiz @params: id,
 */

router.get('/:id',quizController.getQuiz);



export = router;
