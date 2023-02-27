import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Option } from "../entities/options.entity";
import { Question } from "../entities/question.entity";
import { Quiz } from "../entities/quiz.entity";
import { IOption } from "../interfaces/option.interface";
import { IQuestion } from "../interfaces/question.interface";
import { IQuiz } from "../interfaces/quiz.interface";
import { CommonService } from "../services/common.service";

const NAMESPACE = "QuizController";

const createQuiz = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, is_publish, questions } = req.body as IQuiz;

    try {

        if (!questions) {
            return res
                .status(400)
                .json({ status: "error", message: "Validation error!", error: "questions mest be required." });
        }

        const quiz = Quiz.create({
            title,
            description,
            is_publish,
        })

        const errors = await validate(quiz);
        if (errors.length > 0) {
            return res
                .status(400)
                .json({ status: "error", message: "Validation error!", errors: errors });
        }

        const quizSaved = await quiz.save();

        if (questions.length == 0) {
            return res
                .status(400)
                .json({ status: "error", message: "Validation error!", error: "questions must not empty." });
        }

        questions.forEach(async (question: IQuestion) => {

            const newQuestion = Question.create({
                text_question: question.text_question,
                is_mandatory: question.is_mandatory,
                quiz: quizSaved
            })

            const errors = await validate(newQuestion);

            if (errors.length > 0) {
                return res
                    .status(400)
                    .json({ status: "error", message: "Validation error!", errors: errors });
            }

            const questionSave = await newQuestion.save();
            question.options.forEach(async (option: IOption) => {
                const newOption = Option.create({
                    text_option: option.text_option,
                    is_answer: option.is_answer,
                    question: questionSave
                })

                const errors = await validate(newOption);

                if (errors.length > 0) {
                    return res
                        .status(400)
                        .json({ status: "error", message: "Validation error!", errors: errors });
                }

                await newOption.save();

            });

        })

        return res
            .status(201)
            .json({ status: "success", message: "Save successful.", data: quizSaved });


    } catch (error) {
        return res
            .status(500)
            .json({ status: "error", message: "Internal server error!", error: error, });
    }

}

const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const quizRepository = AppDataSource.getRepository(Quiz)

    const service = new CommonService<Quiz>(quizRepository);

    try {

        const quiz: Quiz = await service.findOne({ where: { id: id } });
        if (!quiz) {
            return res
                .status(403)
                .json({ message: "Internal server error!", error: "Data not found." });
        }


        return res
            .status(200)
            .json({ status: "success", message: "Save successful.", data: quiz });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!", error: error });
    }


}


const getQuizs = async (req: Request, res: Response, next: NextFunction) => {
    const quizRepository = AppDataSource.getRepository(Quiz)
    const is_publish = req.query.publish;
    const service = new CommonService<Quiz>(quizRepository);

    try {

        if (!is_publish) {
            const quizs: Quiz[] = await service.all({ relations: ["questions", "questions.options"] });
            return res
                .status(200)
                .json({ status: "success", message: "Save successful.", data: quizs });
        }

        const quizs: Quiz[] = await service.all({ where: { is_publish: is_publish === "1" }, relations: ["questions", "questions.options"] });



        return res
            .status(200)
            .json({ status: "success", message: "Save successful.", data: quizs });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!", error: error });
    }

}





const getQuizByPagination = async (req: Request, res: Response, next: NextFunction) => {
    const quizRepository = AppDataSource.getRepository(Quiz)
    const is_publish = req.query.publish;
    const page: number = parseInt(req.query.page as any) || 1;
    const service = new CommonService<Quiz>(quizRepository);

    try {

        if (!is_publish) {
            const quizs: Quiz[] = await service.paginate(page, ["questions", "questions.options"]);
            return res
                .status(200)
                .json({ status: "success", message: "Save successful.", result: quizs });
        }

        const quizs: Quiz[] = await service.paginate(page, { is_publish: is_publish === "1" }, ["questions", "questions.options"]);



        return res
            .status(200)
            .json({ status: "success", message: "Save successful.", result: quizs });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!", error: error });
    }

}


export default {
    createQuiz,
    getQuiz,
    getQuizs,
    getQuizByPagination
}



