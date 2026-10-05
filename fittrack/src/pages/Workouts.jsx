import { useState } from "react";

import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";

import exercises from "../data/exercises";
import workouts from "../data/workouts";

function Workouts({ onCompleteWorkout }) {
  const [workoutList, setWorkoutList] =
    useState(workouts);

  const [selectedWorkout, setSelectedWorkout] =
    useState(null);

  const [workoutToEdit, setWorkoutToEdit] =
    useState(null);

  function handleAddWorkout(newWorkout) {
    setWorkoutList((currentWorkouts) => [
      ...currentWorkouts,
      newWorkout,
    ]);
  }

  function handleUpdateWorkout(updatedWorkout) {
    setWorkoutList((currentWorkouts) =>
      currentWorkouts.map((workout) =>
        workout.id === updatedWorkout.id
          ? updatedWorkout
          : workout
      )
    );

    setWorkoutToEdit(null);

    setSelectedWorkout((currentWorkout) => {
      if (
        currentWorkout?.id ===
        updatedWorkout.id
      ) {
        return updatedWorkout;
      }

      return currentWorkout;
    });
  }

  function handleDeleteWorkout(workoutId) {
    setWorkoutList((currentWorkouts) =>
      currentWorkouts.filter(
        (workout) => workout.id !== workoutId
      )
    );

    setSelectedWorkout((currentWorkout) => {
      if (currentWorkout?.id === workoutId) {
        return null;
      }

      return currentWorkout;
    });

    setWorkoutToEdit((currentWorkout) => {
      if (currentWorkout?.id === workoutId) {
        return null;
      }

      return currentWorkout;
    });
  }

  function handleStartWorkout(workout) {
    setSelectedWorkout(workout);
  }

  function handleEditWorkout(workout) {
    setWorkoutToEdit(workout);
    setSelectedWorkout(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleComplete(workout) {
    onCompleteWorkout(workout);
    setSelectedWorkout(null);
  }

  function handleCancelEdit() {
    setWorkoutToEdit(null);
  }

  function handleCloseWorkout() {
    setSelectedWorkout(null);
  }

  return (
    <>
      <section className="mb-5">
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
          <p className="text-success fw-bold small mb-2">
            WORKOUT MANAGEMENT
          </p>

          <h1 className="display-6 fw-bold mb-3">
            Workouts
          </h1>

          <p className="lead text-secondary mb-0">
            Create, manage, and start your workouts.
          </p>
        </div>
      </section>

      {selectedWorkout && (
        <WorkoutDetails
          workout={selectedWorkout}
          exercises={exercises}
          onClose={handleCloseWorkout}
          onCompleteWorkout={handleComplete}
        />
      )}

      <section className="mb-5">
        <WorkoutForm
          onAddWorkout={handleAddWorkout}
          onUpdateWorkout={handleUpdateWorkout}
          exercises={exercises}
          workoutToEdit={workoutToEdit}
          onCancelEdit={handleCancelEdit}
        />
      </section>

      <section>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Your Workouts
            </h2>

            <p className="text-secondary mb-0">
              {workoutList.length} workout
              {workoutList.length !== 1
                ? "s"
                : ""}{" "}
              available.
            </p>
          </div>
        </div>

        {workoutList.length > 0 ? (
          <div className="row g-4">
            {workoutList.map((workout) => (
              <div
                className="col-md-6 col-lg-4"
                key={workout.id}
              >
                <WorkoutCard
                  workout={workout}
                  exercises={exercises}
                  onStartWorkout={
                    handleStartWorkout
                  }
                  onEditWorkout={
                    handleEditWorkout
                  }
                  onDeleteWorkout={
                    handleDeleteWorkout
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-4 shadow-sm p-5 text-center">
            <h3 className="h4 fw-bold mb-2">
              No workouts yet
            </h3>

            <p className="text-secondary mb-0">
              Create your first workout using the
              form above.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default Workouts;