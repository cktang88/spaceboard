import React, { useState, useEffect } from "react";
import { Card, Textarea, Box } from "theme-ui";
import { GridItemProps } from "./Board";
import ReactMarkdown from "react-markdown";
import theme from "../theme";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import tomorrow from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
// import useInterval from "../utils/useInterval";
import localforage from "localforage";

interface Props extends GridItemProps {
  isEditing: boolean;
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
  const [text, setText] = useState("");

  useEffect(() => {
    // loading
    localforage
      .setDriver([
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ])
      .then(() => {
        localforage
          .getItem(`spaceboard_card_${props.i}`)
          .then((data) => {
            // console.log("got", data, "for", props.i);
            data && setText(data as string);
          })
          .catch((err) => console.log(err));
      });
  }, []);

  //saving each card
  const saveText = () => {
    if (isEditing) {
      localforage
        .setItem(`spaceboard_card_${props.i}`, text)
        .then(() => {
          console.log(`stored "spaceboard_card_${props.i}" successfully.`);
          //   console.log(cards);
        })
        .catch((err) => console.log(err));
    }
  };

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
        // borderTopWidth: isEditing ? "4px" : "4px",
        borderTopColor: isEditing
          ? "rgba(94, 102, 253, 1)"
          : "rgba(94, 102, 253, .5)",
      }}
      onClick={(e) => {
        e.preventDefault();

        onClick(e);
        console.log(e.button);
      }}
      bg={isEditing ? "white" : "#fafafa"}
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
            outline: "none",
          }}
          m={0}
          pt={3}
          autoFocus={true}
          value={text}
          onBlur={onBlur}
          onChange={(event) => {
            setText(event.target.value);
            // save text on change...
            saveText();
          }}
          //   onKeyDown={function (e) {
          //     if (e.key == "Tab") {
          //       console.log(e);
          //       let newText = text + "\t";
          //       //   let newText =
          //       //     text.substring(0, this.selectionStart) +
          //       //     "\t" +
          //       //     text.substr(this.selectionEnd);
          //       setText((text) => newText);
          //       e.preventDefault();
          //     }
          //   }}
        />
      ) : (
        <Box ml={2}>
          <ReactMarkdown
            //@ts-ignore
            // a hack to preserve newlines in markdown
            source={text.split("\n").join("  \n")}
            renderers={{ code: CodeBlock }}
          />
        </Box>
      )}
      {props.children}
    </Card>
  );
};
export default Notecard;
