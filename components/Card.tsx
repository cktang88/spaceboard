import React, { useState } from "react";
import { Card, Textarea } from "theme-ui";
import { GridItemProps } from "./Board";
import ReactMarkdown from "react-markdown";
import theme from "../theme";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";

interface Props extends GridItemProps {
  isEditing: boolean;
  isDraggable?: boolean;
  children?: React.ReactChildren;
  onClick: (e: React.MouseEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
}

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => (
  <SyntaxHighlighter language={language} style={tomorrow}>
    {value}
  </SyntaxHighlighter>
);

const Notecard = ({
  isEditing,
  isDraggable,
  onClick,
  onBlur,
  ...props
}: Props) => {
  const [text, setText] = useState("stuff");
  //   const [editing, setEditing] = useState(isEditing);
  //   console.log("rerendered me", props);
  return (
    <Card
      {...props}
      sx={{
        // maxWidth: 256,
        userSelect: isEditing ? "auto" : "none",
        fontSize: 14,
        fontFamily: theme.fonts.body,
      }}
      onClick={(e) => {
        onClick(e);
        // e.preventDefault();
      }}
      bg={isEditing ? "white" : "#f0f0f0"}
    >
      {/* <Image src={images.nyc} /> */}
      {isEditing ? (
        <Textarea
          sx={{
            minHeight: "100%",
            minWidth: "100%",
            fontSize: 14,
            fontFamily: theme.fonts.body,
            border: "none",
          }}
          autoFocus={true}
          value={text}
          onBlur={onBlur}
          onChange={(event) => setText(event.target.value)}
        />
      ) : (
        // <Text>{text}</Text>
        <ReactMarkdown source={text} renderers={{ code: CodeBlock }} />
      )}
      {props.children}
    </Card>
  );
};
export default Notecard;
