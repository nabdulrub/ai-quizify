import QueryProvider from "@/components/QueryProvider";
import QuizCreation from "@/components/QuizCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata = {
  title: "Quiz | AI Quizify",
};

const QuizPage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <QueryProvider>
      <QuizCreation topicParam={searchParams.topic ?? ""} />
    </QueryProvider>
  );
};

export default QuizPage;
