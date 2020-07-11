import React, { useState, useEffect } from "react";
import { Box } from "theme-ui";
import GridLayout, { Layout } from "react-grid-layout";
import Notecard from "./Card";
import { useHotkeys } from "react-hotkeys-hook";
import { nanoid } from "nanoid";
import theme from "../theme";

export interface GridItemProps extends Layout {
  isEditing: boolean;
}

const Board = () => {
  const [cards, setCards] = useState([] as GridItemProps[]);
  const [verticalCollapse, setVerticalCollapse] = useState(false);
  const addNewCard = (card: GridItemProps) => {
    // console.log("added new card", card);
    setCards((cards) => [...cards, card]);
  };

  useEffect(() => {
    // console.log(cards.map((c) => [c.isDraggable, c.i]));
  }, [cards]);

  const setFocus = (index: number) => {
    setCards((cards) =>
      cards.map((c, ind) => ({
        ...c,
        isEditing: index == ind,
        isDraggable: index != ind,
      }))
    );
  };

  useHotkeys("ctrl+shift+l", () => {
    addNewCard({
      x: 0,
      y: 0,
      w: 3,
      h: 4,
      i: nanoid(),
      isEditing: false,
      isDraggable: true,
    });
  });

  useHotkeys("esc", () => {
    setFocus(-1);
  });

  /**
   * NOTE: for GridLayout, using layout prop + onLayoutChange = controlled elem
   * for uncontrolled elem, use the data-grid prop for each child
   * Controlled elem is needed here b/c we have special requirements for focusing
   */

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
        bg={theme.colors.background}
      >
        <GridLayout
          className="layout"
          layout={cards}
          cols={12}
          rowHeight={80}
          compactType={verticalCollapse ? "vertical" : null} // place items anywhere in grid
          width={1800}
          onLayoutChange={(newLayout) => {
            setCards((cards) =>
              newLayout.map((e, ind) => ({
                ...e,
                isEditing: cards[ind].isEditing,
                isDraggable: cards[ind].isDraggable,
              }))
            );
          }}
        >
          {cards.map((item: GridItemProps, index: number) => (
            <Notecard
              //   data-grid={item}
              key={item.i}
              {...item}
              onBlur={() => setFocus(-1)}
              onClick={() => setFocus(index)}
            />
          ))}
        </GridLayout>
      </Box>
    </>
  );
};
export default Board;
