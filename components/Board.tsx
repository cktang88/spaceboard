import React, { useState, useEffect } from "react";
import { Box } from "theme-ui";
import GridLayout, { Layout } from "react-grid-layout";
import Notecard from "./Card";
import { useHotkeys } from "react-hotkeys-hook";
import { nanoid } from "nanoid";

import localforage from "localforage";

export interface GridItemProps extends Layout {
  isEditing: boolean;
  initialData?: string;
}

const Board = () => {
  const [cards, setCards] = useState([] as GridItemProps[]);
  const [verticalCollapse, setVerticalCollapse] = useState(false);
  const NUM_COLS = 12;
  const addNewCard = (card: GridItemProps) => {
    // console.log("added new card", card);
    setCards((cards) => [...cards, card]);
  };

  const saveLayout = () => {
    //saving
    localforage
      .setDriver([
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ])
      .then(() =>
        localforage
          .setItem("spaceboard_layout", cards)
          .then(() => {
            console.log(`stored "spaceboard_layout" successfully.`, cards);
            //   console.log(cards);
          })
          .catch((err) => console.log(err))
      );
  };

  useEffect(() => {
    // loading
    localforage
      .setDriver([
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ])
      .then(() =>
        localforage
          .getItem("spaceboard_layout")
          .then((storedCards) => {
            setCards((storedCards || []) as GridItemProps[]);
            return storedCards || [];
          })
          .then((storedCards) =>
            // load each card's initial data
            Promise.all(
              (storedCards as GridItemProps[]).map(({ i }) => {
                localforage
                  .getItem(`spaceboard_card_${i}`)
                  .then((data: string) => {
                    console.log("got", data, "for", i);
                    const newCards = cards;
                    newCards.filter((c) => c.i == i)[0].initialData = data;
                    setCards(newCards);
                  })
                  .catch((err) => console.log(err));
              })
            )
          )
          .catch((err) => console.log(err))
      );
  }, []);

  const setFocus = (index: number) => {
    setCards((cards) =>
      cards.map((c, ind) => ({
        ...c,
        isEditing: index == ind,
        isDraggable: index != ind,
      }))
    );
  };

  useHotkeys(
    "ctrl+shift+l",
    () => {
      const cardWidth = 2;
      const newX = (cards.length * cardWidth) % NUM_COLS;
      addNewCard({
        x: newX,
        // quick and dirty placement
        y: cards
          .filter(({ x }) => x == newX)
          .reduce((sum, { h }) => sum + h, 0),
        w: cardWidth,
        h: 3,
        i: nanoid(),
        isEditing: false,
        isDraggable: true,
      });
    },
    [cards]
  );

  useHotkeys(
    "esc",
    () => {
      setFocus(-1);
    },
    [cards]
  );

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
        bg="#f0f0f0"
        // bg={theme.colors.background}
      >
        <GridLayout
          className="layout"
          layout={cards}
          cols={NUM_COLS}
          rowHeight={80}
          compactType={verticalCollapse ? "vertical" : null} // place items anywhere in grid
          width={1900}
          onLayoutChange={(newLayout) => {
            // console.log("layout changed");
            setCards((cards) =>
              newLayout.map((e, ind) => ({
                ...e,
                isEditing: cards[ind].isEditing,
                isDraggable: cards[ind].isDraggable,
              }))
            );
            // save whenever layout changed
            saveLayout();
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
