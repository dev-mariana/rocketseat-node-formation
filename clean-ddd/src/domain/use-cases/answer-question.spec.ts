import { Answer } from "../entities/answer";
import { AnswerQuestion } from "./answer-question";

const fakeAnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create a answer", async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Answer content",
  });

  expect(answer.content).toEqual("Answer content");
});
