import React, { useState } from "react";

const CardComponent = () => {
  const [todolist, setTodolist] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>("");


  return (
    <div>
      <label htmlFor="todo"> todo</label>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} style={{border: "1px solid black"}} type="text" id="todo" placeholder="Enter your todo" />
      <button style={{border: "1px solid black"}} onClick={() => setTodolist([...todolist, todo])}>Add</button>
      {
        todolist.map((item, index) => {

          return(
            <div key={index}>
              {item}
              <button style={{border: "1px solid black"}} onClick={() => setTodolist(todolist.filter((item, i) => i !== index))}>Delete</button>
            </div>
          )
        })
      }
    
    </div>
  );
};

export default CardComponent;
