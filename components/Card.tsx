import React, { useState } from "react";
import { Card, Text, Textarea } from "theme-ui";
import { GridItemProps } from "./Board";
import ReactMarkdown from "react-markdown";
import theme from "../theme";

interface Props extends GridItemProps {
  isEditing: boolean;
  isDraggable?: boolean;
  children?: React.ReactChildren;
  onClick: (e: React.MouseEvent) => void;
}

const Notecard = ({ isEditing, isDraggable, onClick, ...props }: Props) => {
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
      //   onBlur={() => setEditing(false)}
      onClick={(e: React.MouseEvent) => {
        // e.preventDefault();
        onClick(e);
      }}
      bg={isEditing ? "white" : "#f0f0f0"}
      //   width={props.w}
      //   height={props.h}
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
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      ) : (
        // <Text>{text}</Text>
        <ReactMarkdown source={text} />
      )}
      {props.children}
    </Card>
  );
};
export default Notecard;
