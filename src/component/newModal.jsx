import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToDoContext } from "../ToDoContext";

const Modal = () => {
  const { setToDoTasks, isModalOpen, ModalClose } = useContext(ToDoContext);

  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority1, setPriority1] = useState("");
  const [priority2, setPriority2] = useState("");

  const submitTask = () => {
    setToDoTasks((curr) => [
      ...curr,
      {
        id: uuidv4(),
        task,
        dueDate,
        priority1,
        priority2,
        isComplited: false,
      },
    ]);
    setTask("");
    setDueDate("");
    setPriority1("");
    setPriority2("");
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">TO-DO-LIST</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-5xl"
          onClick={ModalClose}
        >
          &times;
        </button>
        <form
          action=""
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <label>New Task :-</label>
            <input
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
              placeholder="Add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div>
            <label>Date :-</label>
            <input
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label>Priorityes :-</label>
            <select
              // defaultValue="Choose..."
              value={priority1}
              onChange={(e) => setPriority1(e.target.value)}
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
            >
              <option value="Choose...">Choose...</option>
              <option value={"Importent"}>Importent</option>
              <option value={"Not Importent"}>Not Importent</option>
            </select>
            <select
              // defaultValue="Choose..."
              value={priority2}
              onChange={(e) => setPriority2(e.target.value)}
              className="border-2 border-black/30 rounded-2xl p-1 mx-1.5 my-1"
            >
              <option value="Choose...">Choose...</option>
              <option value={"Urgent"}>Urgent</option>
              <option value={"Not Urgent"}>Not Urgent</option>
            </select>
          </div>

          <button
            variant="primary"
            className="cursor-pointer px-1.5 py-1 rounded-3xl bg-blue-950 text-white font-bold hover:bg-blue-600 hover:text-white my-7 float-right"
            type="submit"
            onClick={submitTask}
          >
            Submit
          </button>
        </form>
        <button
          type="button"
          className="cursor-pointer px-1.5 py-1 rounded-3xl bg-blue-950 text-white font-bold hover:bg-blue-600 hover:text-white mx-1 my-7"
          onClick={ModalClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Modal;
