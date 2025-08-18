import type { Component, ParentProps } from "solid-js";

const App: Component = (props: ParentProps) => {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
};

export default App;
