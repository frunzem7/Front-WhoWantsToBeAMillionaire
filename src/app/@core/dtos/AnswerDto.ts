import {QuestionDto} from "./QuestionDto";

export class AnswerDto {
  id!: number;
  answer: string | undefined = "";
  isCorrect: boolean = false;
  question: QuestionDto = new QuestionDto();
}
