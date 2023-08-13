"use client";

import { useTheme } from "next-themes";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {};

const data = [
  {
    text: "Hey",
    value: 3,
  },
  {
    text: "Me",
    value: 8,
  },
  {
    text: "Now",
    value: 2,
  },
  {
    text: "Comp",
    value: 9,
  },
];

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 18;
};

const CustomWordCloud = (props: Props) => {
  const theme = useTheme();

  return (
    <>
      <D3WordCloud
        height={500}
        font={"Times"}
        data={data}
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme == "dark" ? "white" : "black"}
      />
    </>
  );
};

export default CustomWordCloud;
