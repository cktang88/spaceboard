import React, { useState } from "react";
import { Box } from "theme-ui";
import GridLayout from "react-grid-layout";
import Notecard from "./Card";
import { useHotkeys } from "react-hotkeys-hook";
import { nanoid } from "nanoid";
import theme from "../theme";

export type GridItemProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  i?: string;
};

const Board = () => {
  // layout is an array of objects, see the demo for more complete usage
  //   const layout = [
  //     { i: "a", x: 0, y: 0, w: 1, h: 2 }, // static: true
  //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 6 },
  //     { i: "c", x: 4, y: 0, w: 1, h: 2 },
  //   ];
  const [cards, setCards] = useState([] as GridItemProps[]);
  const [verticalCollapse, setVerticalCollapse] = useState(false);
  const addNewCard = (card: GridItemProps) => {
    console.log("added new card", card);
    setCards((cards) => [...cards, card]);
  };

  useHotkeys("ctrl+shift+l", () => {
    addNewCard({ x: 0, y: 0, w: 2, h: 2, i: nanoid() });
  });

  return (
    <>
      <button onClick={() => setVerticalCollapse(!verticalCollapse)}>
        Vertical Collapse: {verticalCollapse ? "On" : "Off"}
      </button>

      <Box
        sx={{
          border: "3px solid rgba(94, 102, 253, 0.25)",
          borderRadius: "8px",
        }}
        m={2}
        p={2}
        bg={theme.colors.muted}
      >
        <GridLayout
          className="layout"
          // layout={layout}
          cols={12}
          rowHeight={80}
          verticalCompact={verticalCollapse} // place items anywhere in grid
          // onLayoutChange={() => {}}
          width={1800}
        >
          {cards.map((item: GridItemProps) => (
            <Notecard data-grid={item} key={item.i} {...item} />
          ))}
        </GridLayout>
      </Box>
    </>
  );
};
export default Board;
