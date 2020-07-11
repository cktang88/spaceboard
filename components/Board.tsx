import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import Notecard from "./Card";
import { useHotkeys } from "react-hotkeys-hook";

const Board = () => {
  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 }, // static: true
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 6 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  const [cards, setCards] = useState([]);
  const addNewCard = () => {};

  useHotkeys("ctrl+shift+l", () => {
    console.log("added new card.");
    addNewCard();
  });

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={80}
      onLayoutChange={() => {}}
      width={1200}
      style={{ border: "1px solid black" }}
    >
      <Notecard key="a" />
      <Notecard key="b" />
      <Notecard key="c" />
    </GridLayout>
  );
};
export default Board;
