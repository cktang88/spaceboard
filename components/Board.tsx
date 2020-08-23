import React, { useState, useEffect } from "react";
import { Box } from "theme-ui";
import GridLayout, { Layout } from "react-grid-layout";
import Notecard from "./Card";
import { useHotkeys } from "react-hotkeys-hook";
import { nanoid } from "nanoid";

import localforage from "localforage";

export interface GridItemProps extends Layout {
  isEditing: boolean;
}

const Board = () => {
  const [cards, setCards] = useState([] as GridItemProps[]);
  // const isPressed = useIsHotkeyPressed();
  const [verticalCollapse, setVerticalCollapse] = useState(false);
  const NUM_COLS = 12;
  const addNewCard = (card: GridItemProps) =>
    setCards((cards) => [...cards, card]);

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
          .catch((err) => console.log(err))
      );
  }, []);

  const saveLayout = () => {
    //saving
    localforage
      .setDriver([
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ])
      .then(() => {
        localforage
          .setItem("spaceboard_layout", cards)
          .then(() => {
            console.log(`stored "spaceboard_layout" successfully.`, cards);
            //   console.log(cards);
          })
          .catch((err) => console.log(err));
      });
  };
  const setFocus = (index: number) => {
    setCards((cards) =>
      cards.map((c, ind) => ({
        ...c,
        isEditing: index == ind,
        isDraggable: index != ind,
      }))
    );
  };
  // const removeCard = (key: string) => {
  //   // remove card
  //   console.log("removing card...");
  //   localforage.removeItem(`spaceboard_card_${key}`);
  //   setCards((cards) => cards.filter(({ i }) => i !== key));
  //   saveLayout();
  // };

  useHotkeys(
    "alt+n",
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

  // useHotkeys(
  //   "alt+d",
  //   () => {
  //     isDeletingMode ? setDeletingMode(false) : setDeletingMode(true);
  //     console.log("set deleting mode", isDeletingMode);
  //   },
  //   [cards]
  // );

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
              onClick={() => {
                // if (!isDeletingMode) {
                setFocus(index);
                // } else {
                //   removeCard(item.i);
                // }
              }}
            />
          ))}
        </GridLayout>
      </Box>
    </>
  );
};
export default Board;
