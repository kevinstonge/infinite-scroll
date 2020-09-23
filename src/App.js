import React, { useState, useEffect, useRef } from "react";
import "./App.css";
/// maybe try this: https://medium.com/@saravananr_93203/infinite-scroll-in-react-made-easy-with-intersection-observer-33bdb5fa9cf6
function App() {
  const createListItems = () => {
    return new Array(5)
      .fill("")
      .map((e) => `item #${Math.floor(Math.random() * 10000)}`);
  };
  const [ListItems, setListItems] = useState(createListItems());
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("... loading more ...");
  const scrollBoxLastChild = useRef(null);
  const addListItems = () => {
    setListItems([...ListItems, ...createListItems()]);
  };
  const observerCallback = (entries) => {
    if (entries[0].isIntersecting && !isUpdating && ListItems.length < 150) {
      setIsUpdating(true);
      addListItems();
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
    }
    if (ListItems.length === 50) {
      setLoadingMessage("nothing more to load");
    }
  };
  const observer = new IntersectionObserver(observerCallback);
  useEffect(() => {
    scrollBoxLastChild && observer.observe(scrollBoxLastChild.current);
  }, [observer]);

  return (
    <div className="container">
      <header>number of items in state: {ListItems.length}</header>
      <div className="scrollBox">
        {ListItems.map((item, index) => {
          return (
            <p key={`${item}-${index}`}>{`paragraph element for ${item}`}</p>
          );
        })}
        <p ref={scrollBoxLastChild}>{loadingMessage}</p>
      </div>
    </div>
  );
}

export default App;
