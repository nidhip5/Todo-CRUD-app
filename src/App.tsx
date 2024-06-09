import { FaPen, FaClipboardList } from "react-icons/fa";
import TodoList from "./components/TodoList";
import "./CSS/App.css";

function App() {
  return (
    <div className="main">
      <div className="main-class">
        {/* <div className="App"> */}
        <p className="name">TODO</p>
        {/* </div> */}
      </div>
      <div className="header">
        <div className="logoside">
          <FaPen />
          <h1>What to Do</h1>
          <FaClipboardList />
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
