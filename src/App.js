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

  const addListItems = () => {
    setListItems([...ListItems, ...createListItems()]);
  };
  const scrollBoxLastChild = useRef(null);

  const handleScroll = (e) => {
    const top = scrollBoxLastChild.current.getBoundingClientRect().top;
    const winHeight = window.innerHeight;
    if (top < winHeight && !isUpdating) {
      setIsUpdating(true);
      addListItems();
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    scrollBoxLastChild && console.log(scrollBoxLastChild);
  }, [scrollBoxLastChild]);

  return (
    <div className="container">
      <header>number of items in state: {ListItems.length}</header>
      <div className="scrollBox" onScroll={handleScroll}>
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
