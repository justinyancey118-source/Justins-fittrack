import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Exercises from "./pages/Exercises";
import Goals from "./pages/Goals";
import History from "./pages/History";

function App() {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem(
      "fittrack-history"
    );

    return savedHistory
      ? JSON.parse(savedHistory)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "fittrack-history",
      JSON.stringify(history)
    );
  }, [history]);

  function handleCompleteWorkout(workout) {
    const completedWorkout = {
      id: Date.now(),
      workoutName: workout.name,
      date: new Date().toISOString().split("T")[0],
      duration: workout.duration,
      exercises: workout.exercises.length,
    };

    setHistory((currentHistory) => [
      completedWorkout,
      ...currentHistory,
    ]);
  }

  function handleDeleteHistory(historyId) {
    setHistory((currentHistory) =>
      currentHistory.filter(
        (workout) => workout.id !== historyId
      )
    );
  }

  return (
    <>
      <Header />

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/workouts"
            element={
              <Workouts
                onCompleteWorkout={
                  handleCompleteWorkout
                }
              />
            }
          />

          <Route
            path="/exercises"
            element={<Exercises />}
          />

          <Route
            path="/goals"
            element={<Goals />}
          />

          <Route
            path="/history"
            element={
              <History
                history={history}
                onDeleteHistory={
                  handleDeleteHistory
                }
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;