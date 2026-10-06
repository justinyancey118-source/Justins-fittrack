import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Exercises from "./pages/Exercises";
import Goals from "./pages/Goals";
import History from "./pages/History";

function NotFound() {
  return (
    <section className="text-center py-5">
      <div className="bg-white rounded-4 shadow-sm p-5">
        <h1 className="display-4 fw-bold mb-3">
          404
        </h1>

        <h2 className="h4 fw-bold mb-3">
          Page Not Found
        </h2>

        <p className="text-secondary mb-4">
          The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="btn btn-success"
        >
          Return to Dashboard
        </a>
      </div>
    </section>
  );
}

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
          <Route
            path="/"
            element={<Dashboard />}
          />

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

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;