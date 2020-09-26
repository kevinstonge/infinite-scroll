import React from "react";
import "./App.css";
/// maybe try this: https://medium.com/@saravananr_93203/infinite-scroll-in-react-made-easy-with-intersection-observer-33bdb5fa9cf6
const createListItems = () => {
  return new Array(5)
    .fill("")
    .map((e) => `item #${Math.floor(Math.random() * 10000)}`);
};
class App extends React.Component {
  constructor() {
    super();
    this.scrollBoxLastChild = React.createRef(null);
    this.state = {
      listItems: createListItems(),
      loadingMessage: "... loading more ...",
      isUpdating: false,
    };
  }
  observerCallback = (entries) => {
    console.log("callback20", entries[0]);
    if (
      entries[0].isIntersecting &&
      !this.state.isUpdating &&
      this.state.listItems.length < 150
    ) {
      this.setState(
        {
          isUpdating: true,
          listItems: [...this.state.listItems, ...createListItems()],
        },
        () => {
          console.log("callback31");

          this.setState({ isUpdating: false });
        }
      );
    }
    if (this.state.listItems.length === 50) {
      this.setState({ loadingMessage: "nothing more to load" });
    }
  };
  observer = new IntersectionObserver(this.observerCallback);
  componentDidMount() {
    console.log("mount");
    this.observer.observe(this.scrollBoxLastChild.current);
  }

  render() {
    return (
      <div className="container">
        <header>number of items in state: {this.state.listItems.length}</header>
        <div className="scrollBox">
          {this.state.listItems.map((item, index) => {
            return (
              <p key={`${item}-${index}`}>{`paragraph element for ${item}`}</p>
            );
          })}
          <p ref={this.scrollBoxLastChild}>{this.state.loadingMessage}</p>
        </div>
      </div>
    );
  }
}

export default App;
