import { useState } from "react";

import StatCard from "../components/StatCard";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import GoalForm from "../components/GoalForm";

import exercises from "../data/exercises";
import workouts from "../data/workouts";
import goals from "../data/goals";

function Dashboard() {
  const [selectedWorkout, setSelectedWorkout] =
    useState(null);

  const [workoutList, setWorkoutList] =
    useState(workouts);

  const [goalsList, setGoalsList] =
    useState(goals);

  function handleStartWorkout(workout) {
    setSelectedWorkout(workout);
  }

  function handleAddWorkout(newWorkout) {
    setWorkoutList((currentWorkouts) => [
      ...currentWorkouts,
      newWorkout,
    ]);
  }

  function handleAddGoal(newGoal) {
    setGoalsList((currentGoals) => [
      ...currentGoals,
      newGoal,
    ]);
  }

  return (
    <>
      {/* Selected Workout */}
      {selectedWorkout && (
        <WorkoutDetails
          workout={selectedWorkout}
          exercises={exercises}
          onClose={() =>
            setSelectedWorkout(null)
          }
        />
      )}

      {/* Welcome Section */}
      <section className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <p className="text-success fw-bold small mb-2">
              FITNESS DASHBOARD
            </p>

            <h1 className="display-5 fw-bold mb-3">
              Welcome to FitTrack!
            </h1>

            <p className="lead text-secondary mb-0">
              Track your workouts, monitor your
              progress, and stay consistent with
              your fitness goals.
            </p>
          </div>

          <div className="col-lg-4 text-lg-end">
            <button
              className="btn btn-success btn-lg"
              onClick={() =>
                setSelectedWorkout(workouts[0])
              }
            >
              Quick Start
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Statistics */}
      <section className="mb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <StatCard
              title="Workouts"
              value={workoutList.length}
            />
          </div>

          <div className="col-md-4">
            <StatCard
              title="Exercises"
              value={exercises.length}
            />
          </div>

          <div className="col-md-4">
            <StatCard
              title="Goals"
              value={goalsList.length}
            />
          </div>
        </div>
      </section>

      {/* Create Workout */}
      <section className="mb-5">
        <WorkoutForm
          onAddWorkout={handleAddWorkout}
          exercises={exercises}
        />
      </section>

      {/* Create Goal */}
      <section className="mb-5">
        <GoalForm
          onAddGoal={handleAddGoal}
        />
      </section>

      {/* Dashboard Workout Preview */}
      <section className="mb-5">
        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            Recent Workouts
          </h2>

          <p className="text-secondary mb-0">
            Your available workouts at a glance.
          </p>
        </div>

        <div className="row g-4">
          {workoutList.slice(0, 3).map(
            (workout) => (
              <div
                className="col-md-6 col-lg-4"
                key={workout.id}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h3 className="h5 fw-bold">
                      {workout.name}
                    </h3>

                    <p className="text-secondary">
                      {workout.description}
                    </p>

                    <p className="mb-0">
                      <strong>
                        {workout.duration}
                      </strong>{" "}
                      minutes
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Goal Preview */}
      <section>
        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            Fitness Goals
          </h2>

          <p className="text-secondary mb-0">
            Your current fitness goals.
          </p>
        </div>

        <div className="row g-4">
          {goalsList.slice(0, 3).map(
            (goal) => (
              <div
                className="col-md-6 col-lg-4"
                key={goal.id}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h3 className="h5 fw-bold">
                      {goal.name}
                    </h3>

                    <p className="text-secondary">
                      {goal.description}
                    </p>

                    <strong>
                      {goal.current} /{" "}
                      {goal.target} {goal.unit}
                    </strong>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;