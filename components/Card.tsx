import React, { useState } from "react";
import { Card, Text, Textarea } from "theme-ui";

type Props = {
  isEditing?: boolean;
  children?: React.ReactChildren;
};

const Notecard = ({ isEditing, ...props }: Props) => {
  const [text, setText] = useState("stuff");

  return (
    <Card
      sx={{
        // maxWidth: 256,
        userSelect: isEditing ? "auto" : "none",
      }}
      {...props}
    >
      {/* <Image src={images.nyc} /> */}
      {isEditing ? (
        <Textarea>{JSON.stringify(props)}</Textarea>
      ) : (
        <Text>
          {props.w}
          {props.h}
        </Text>
      )}
      {props.children}
    </Card>
  );
};
export default Notecard;
