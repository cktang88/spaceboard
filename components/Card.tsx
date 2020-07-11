import React, { useState } from "react";
import { Card, Text, Textarea } from "theme-ui";
import { GridItemProps } from "./Board";
import ReactMarkdown from "react-markdown";

interface Props extends GridItemProps {
  children?: React.ReactChildren;
}

const Notecard = (props: Props) => {
  const [text, setText] = useState("stuff");
  const [isEditing, setEditing] = useState(false);

  return (
    <Card
      sx={{
        // maxWidth: 256,
        userSelect: isEditing ? "auto" : "none",
      }}
      {...props}
      onClick={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      //   width={props.w}
      //   height={props.h}
    >
      {/* <Image src={images.nyc} /> */}
      {isEditing ? (
        <Textarea
          sx={{
            minHeight: "100%",
            minWidth: "100%",
          }}
          value={text}
          onChange={(event) => setText(event.target.value)}
        >
          editing...
        </Textarea>
      ) : (
        // <Text>{text}</Text>
        <ReactMarkdown source={text} />
      )}
      {props.children}
    </Card>
  );
};
export default Notecard;
