import mongoose, { Model, model, Schema } from "mongoose"

export interface IQuestion {
  text: string;
}

const QuestionShema = new Schema<IQuestion>({
	text: { type: String, required: true }
});

export const Never: Model<IQuestion, {}, {}, {}, any> = model<IQuestion>('Never', QuestionShema, 'never');
export const Rather: Model<IQuestion, {}, {}, {}, any> = model<IQuestion>('Rather', QuestionShema, 'rather');
export const Truth: Model<IQuestion, {}, {}, {}, any> = model<IQuestion>('Truth', QuestionShema, 'truth');

export type QuestionType = {
    title: string,
    color: string,
    model: Model<IQuestion, {}, {}, {}, any>
}

export const QuestionTypes: QuestionType[] = [
    {
        'title': 'ICH HAB NOCH NIE',
        'color': '#FF5D4E',
        'model': Never,
    },
    {
        'title': 'WER WÜRDE EHER',
        'color': '#85E8E0',
        'model': Rather,
    },
    {
        'title': 'WAHRHEIT',
        'color': '#47D98B',
        'model': Truth,
    }
]

export function getQuestionType(): QuestionType {
  return QuestionTypes[Math.floor(Math.random() * QuestionTypes.length)];
}

