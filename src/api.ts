import express, { Request, Response } from "express";
import { IQuestion, QuestionType, getQuestionType } from "./modules/global";
import { Model } from "mongoose";

export const router = express.Router();

// Route to new question
router.get('/newquestion', async (req: Request, res: Response) => {
    const questionType: QuestionType = getQuestionType();
    const questionModel: Model<IQuestion, {}, {}, {}, any> = questionType.model;
    
    // Get a random number from all entrys from the Document
    const count: number = await questionModel.countDocuments({});
    const random: number = Math.floor(Math.random() * count);

    //Load all Questions from the Document but only get the one with the offset from our random number
    const question = await questionModel.findOne().skip(random);

    //Send Back Data from the Choosen entry
    res.status(200).send({
        text: question.text,
        title: questionType.title,
        color: questionType.color
    });
})