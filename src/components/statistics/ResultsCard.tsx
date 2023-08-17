import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
};

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold"></CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/5">
        {accuracy > 75 ? (
          <>
            <Trophy className="" stroke="#FFD700" size={100} />
            <div className="flex flex-col text-2xl font-semibold text-[#FFD700]">
              <span>Impressive!</span>
              <span className="text-sm text-center text-black opacity-50">
                {`> 75 accuracy`}
              </span>
            </div>
          </>
        ) : accuracy > 25 ? (
          <>
            <Trophy className="" stroke="#C0C0C0" size={100} />
            <div className="flex flex-col text-2xl font-semibold text-[#7e7e7e]">
              <span>Good Job!</span>
              <span className="text-sm text-center text-black opacity-50">
                {`> 25 accuracy`}
              </span>
            </div>
          </>
        ) : (
          <>
            <Trophy className="" stroke="#CD7F32" size={100} />
            <div className="flex flex-col text-2xl font-semibold text-[#CD7F32]">
              <span>Nice Try!</span>
              <span className="text-sm text-center text-black opacity-50">
                {`< 25 accuracy`}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
