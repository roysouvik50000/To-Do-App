import { useEffect, useState } from "react";
import "./App.css";
import ToDoCard from "./component/ToDoCard";
import Modal from "./component/newModal";
import { ToDoContext } from "./ToDoContext";

function App() {
  const [toDoTasks, setToDoTasks] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [isModalOpen, setModalOpen] = useState(false);

  function ModalClose() {
    setModalOpen(false);
  }

  function DelectToDo(delectTask) {
    setToDoTasks((curr) =>
      curr.filter((v) => {
        return v.id !== delectTask.id;
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoTasks));
  }, [toDoTasks]);

  function MarkAsComplited(complitedTask) {
    setToDoTasks((curr) => {
      return curr.map((v) => {
        if (v.id === complitedTask.id) {
          return { ...v, isComplited: !v.isComplited };
        }
        return v;
      });
    });
  }

  return (
    <>
      <ToDoContext.Provider
        value={{
          toDoTasks,
          setToDoTasks,
          isModalOpen,
          setModalOpen,
          DelectToDo,
          MarkAsComplited,
          ModalClose,
        }}
      >
        <div className="bg-linear-to-bl from-violet-500 to-fuchsia-500 min-h-screen p-5">
          <h1 className="text-center text-[36px] text-white/80 mb-6 font-black fixed left-0 right-0">
            -: TO-DO APP :-
          </h1>
          <div className="mt-12">
            {toDoTasks.map((v, i) => {
              return <ToDoCard v={v} i={i} key={i} />;
            })}
          </div>
          <div className="w-xs h-32 p-2 flex justify-center items-center bg-blue-300/50 rounded-2xl border-2 border-blue-600/20 fixed top-1/3 right-60">
            <h2 className="mx-2.5 text-2xl font-medium">Add a New Task</h2>
            <button
              type="button"
              className="cursor-pointer px-1.5 py-1 rounded-3xl bg-white text-blue-950 font-bold hover:bg-blue-600"
              onClick={() => setModalOpen(true)}
            >
              ADD TASK
            </button>
            <Modal></Modal>
          </div>
          <div className="flex justify-around bg-black/30 p-5 rounded-2xl text-white font-medium text-center w-lg fixed bottom-24 right-36 ">
            <h2 className="bg-red-700 py-0.5 px-1 rounded-xl">
              Importent <br /> Urgent{" "}
            </h2>
            <h2 className="bg-orange-700 py-0.5 px-1 rounded-xl">
              Not Importent <br /> Urgent{" "}
            </h2>
            <h2 className="bg-yellow-300 py-0.5 px-1 rounded-xl">
              Importent <br /> Not Urgent{" "}
            </h2>
            <h2 className="bg-green-500 py-0.5 px-1 rounded-xl">
              Not Importent <br /> Not Urgent{" "}
            </h2>
          </div>
        </div>
      </ToDoContext.Provider>
    </>
  );
}

export default App;
