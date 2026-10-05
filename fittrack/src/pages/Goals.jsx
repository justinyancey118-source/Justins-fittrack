import { useState } from "react";

import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";

import goals from "../data/goals";

function Goals() {
  const [goalsList, setGoalsList] = useState(goals);

  const [goalToEdit, setGoalToEdit] =
    useState(null);

  function handleAddGoal(newGoal) {
    setGoalsList((currentGoals) => [
      ...currentGoals,
      newGoal,
    ]);
  }

  function handleUpdateGoal(updatedGoal) {
    setGoalsList((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === updatedGoal.id
          ? updatedGoal
          : goal
      )
    );

    setGoalToEdit(null);
  }

  function handleDeleteGoal(goalId) {
    setGoalsList((currentGoals) =>
      currentGoals.filter(
        (goal) => goal.id !== goalId
      )
    );

    setGoalToEdit((currentGoal) => {
      if (currentGoal?.id === goalId) {
        return null;
      }

      return currentGoal;
    });
  }

  function handleEditGoal(goal) {
    setGoalToEdit(goal);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setGoalToEdit(null);
  }

  return (
    <>
      <section className="mb-5">
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
          <p className="text-success fw-bold small mb-2">
            FITNESS GOALS
          </p>

          <h1 className="display-6 fw-bold mb-3">
            Goals
          </h1>

          <p className="lead text-secondary mb-0">
            Set fitness goals, track your progress, and
            stay accountable.
          </p>
        </div>
      </section>

      <section className="mb-5">
        <GoalForm
          onAddGoal={handleAddGoal}
          onUpdateGoal={handleUpdateGoal}
          goalToEdit={goalToEdit}
          onCancelEdit={handleCancelEdit}
        />
      </section>

      <section>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Your Goals
            </h2>

            <p className="text-secondary mb-0">
              {goalsList.length} goal
              {goalsList.length !== 1 ? "s" : ""}{" "}
              available.
            </p>
          </div>
        </div>

        {goalsList.length > 0 ? (
          <div className="row g-4">
            {goalsList.map((goal) => (
              <div
                className="col-md-6 col-lg-4"
                key={goal.id}
              >
                <GoalCard
                  goal={goal}
                  onEditGoal={handleEditGoal}
                  onDeleteGoal={handleDeleteGoal}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-4 shadow-sm p-5 text-center">
            <h3 className="h4 fw-bold mb-2">
              No goals yet
            </h3>

            <p className="text-secondary mb-0">
              Create your first fitness goal using the
              form above.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default Goals;