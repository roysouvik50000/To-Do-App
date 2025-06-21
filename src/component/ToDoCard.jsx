import { useContext } from "react";
import { ToDoContext } from "../ToDoContext";
export default function ToDoCard({ v, i }) {
  const { DelectToDo, MarkAsComplited } = useContext(ToDoContext);
  let border = "";
  if (v.priority1 == "Importent" && v.priority2 == "Urgent") {
    border = "border-6 border-red-700";
  } else if (v.priority1 == "Importent" && v.priority2 == "Not Urgent") {
    border = "border-6 border-yellow-300";
  } else if (v.priority1 == "Not Importent" && v.priority2 == "Urgent") {
    border = "border-6 border-orange-700";
  } else {
    border = "border-6 border-green-500";
  }

  return (
    <>
      <div
        className={`bg-black/40 w-lg text-white font-[500] px-2 py-5 rounded-xl ms-8 mb-1.5 ${border} 
        ${v.isComplited ? "line-through" : ""}
        
        `}
      >
        <ul>
          <li>
            {i + 1}. {v.task}
          </li>
          <li>Due date :- {v.dueDate}</li>
          <li>
            Priorityes :- {v.priority1} , {v.priority2}
          </li>
        </ul>
        <div className="flex justify-end pt-2.5">
          <button
            type="button"
            className="cursor-pointer px-1.5 py-1 rounded-3xl bg-white text-blue-950 font-bold hover:bg-blue-600 hover:text-white mx-1"
            onClick={() => MarkAsComplited(v)}
          >
            Mark As Complited
          </button>
          <button
            type="button"
            className="cursor-pointer px-1.5 py-1 rounded-3xl bg-white text-blue-950 font-bold hover:bg-blue-600 hover:text-white mx-1"
            onClick={() => DelectToDo(v)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
