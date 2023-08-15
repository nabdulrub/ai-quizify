"use client";

import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer } from "lucide-react";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { useToast } from "./ui/use-toast";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question"> };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState(0);
  const [isCorrect, setIsCorrect] = React.useState(0);
  const [isWrong, setIsWrong] = React.useState(0);
  const { toast } = useToast();

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedChoice],
      };
      const response = await axios.post("api/checkAnswer", payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: "Correct!",
            description: "You got it right!",
            variant: "success",
          });
          setIsCorrect((prevCorrect) => prevCorrect + 1);
        } else {
          toast({
            title: "Wrong!",
            description: "You got it wrong :(",
            variant: "destructive",
          });
          setIsWrong((prevWrong) => prevWrong + 1);
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, toast]);

  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl sm:w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400 mr-2">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800 uppercase">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span>00:00</span>
          </div>
        </div>
        <MCQCounter correctAnswers={5} wrongAnswers={3} />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-zinc-600/50 divide-y">
            <div className="">{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              className="justify-start w-full py-8 gap-3 mb-4"
              key={index}
              variant={selectedChoice === index ? "default" : "secondary"}
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button
          className="mt-2"
          onClick={() => setQuestionIndex((prev) => prev + 1)}
        >
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
