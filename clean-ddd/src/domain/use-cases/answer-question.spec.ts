import { expect, test } from "vitest";
import { AnswerQuestion } from "./answer-question";

test("create a answer", () => {
  const answerQuestion = new AnswerQuestion();

  const answer = answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Answer content",
  });

  expect(answer.content).toEqual("Answer content");
});
