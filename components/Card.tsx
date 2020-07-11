import React, { useState } from "react";
import { Card, Text, Textarea } from "theme-ui";
import { GridItemProps } from "./Board";

interface Props extends GridItemProps {
  isEditing?: boolean;
  children?: React.ReactChildren;
}

const Notecard = ({ isEditing, ...props }: Props) => {
  const [text, setText] = useState("stuff");

  return (
    <Card
      sx={{
        // maxWidth: 256,
        userSelect: isEditing ? "auto" : "none",
      }}
      {...props}
      //   width={props.w}
      //   height={props.h}
    >
      {/* <Image src={images.nyc} /> */}
      {isEditing ? (
        <Textarea>{JSON.stringify(props)}</Textarea>
      ) : (
        <Text>
          {props.w},{props.h}
        </Text>
      )}
      {props.children}
    </Card>
  );
};
export default Notecard;
