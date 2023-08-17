"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 18;
};

const CustomWordCloud = ({ formattedTopics }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <div className="word-cloud">
        <D3WordCloud
          height={500}
          font={"Times"}
          data={formattedTopics}
          fontSize={fontSizeMapper}
          rotate={0}
          padding={10}
          fill={theme.theme === "dark" ? "white" : "black"}
          onWordClick={(e, d) => {
            router.push("/quiz?topic=" + d.text);
          }}
        />
      </div>
    </>
  );
};

export default CustomWordCloud;
