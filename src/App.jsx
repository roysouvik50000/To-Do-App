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
        <div className="bg-linear-to-bl from-violet-500 to-fuchsia-500 min-h-screen p-5 sm:min-w-screen">
          <h1 className="text-center text-[36px] text-white/80 mb-6 font-black fixed left-0 right-0 bg-black">
            -: TO-DO APP :-
          </h1>
          <div className="mt-32">
            {toDoTasks.map((v, i) => {
              return <ToDoCard v={v} i={i} key={i} />;
            })}
          </div>
          <div className="lg:w-xs w-screen lg:h-32 h-6 lg:p-2 p-0.5 flex justify-center items-center rounded-2xl border-2 fixed lg:top-1/3 bg-black top-24 lg:right-60">
            <h2 className="mx-2.5 lg:text-2xl text-sm font-medium text-white">Add a New Task</h2>
            <button
              type="button"
              className="cursor-pointer lg:px-1.5 p-0.5 lg:py-1  rounded-3xl bg-white text-blue-950 font-bold hover:bg-blue-600"
              onClick={() => setModalOpen(true)}
            >
              ADD TASK
            </button>
            <Modal></Modal>
          </div>
          <div className="flex justify-around bg-black/30 lg:p-5 rounded-2xl text-white font-medium text-center lg:w-lg fixed lg:bottom-24 lg:right-36 bottom-0.5 right-0 left-0 p-1.5 w-screen text-[8px]">
            <h2 className="bg-red-700 py-0.5 px-1 rounded-xl">
              Importent , Urgent{" "}
            </h2>
            <h2 className="bg-orange-700 py-0.5 px-1 rounded-xl">
              Not Importent , Urgent{" "}
            </h2>
            <h2 className="bg-yellow-300 py-0.5 px-1 rounded-xl">
              Importent , Not Urgent{" "}
            </h2>
            <h2 className="bg-green-500 py-0.5 px-1 rounded-xl">
              Not Importent , Not Urgent{" "}
            </h2>
          </div>
        </div>
      </ToDoContext.Provider>
    </>
  );
}

export default App;
