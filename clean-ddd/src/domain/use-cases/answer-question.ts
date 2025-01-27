import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answersRepository.create(answer);

    return answer;
  }
}
