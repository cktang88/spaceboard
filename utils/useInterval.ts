// from Dan Abramov https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef, MutableRefObject } from "react";

const useInterval = (callback: Function, delay: number) => {
  const savedCallback: MutableRefObject<Function | undefined> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
