import { useEffect, useState } from "react";

function WorkoutForm({
  onAddWorkout,
  onUpdateWorkout,
  exercises,
  workoutToEdit,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseSettings, setExerciseSettings] = useState({});
  const [error, setError] = useState("");

  const isEditing = Boolean(workoutToEdit);

  useEffect(() => {
    if (!workoutToEdit) {
      return;
    }

    setName(workoutToEdit.name);
    setDescription(workoutToEdit.description);
    setDuration(String(workoutToEdit.duration));
    setDifficulty(workoutToEdit.difficulty);

    const exerciseIds = workoutToEdit.exercises.map(
      (workoutExercise) => workoutExercise.exerciseId
    );

    const settings = {};

    workoutToEdit.exercises.forEach((workoutExercise) => {
      settings[workoutExercise.exerciseId] = {
        sets: workoutExercise.sets,
        reps: workoutExercise.reps,
      };
    });

    setSelectedExercises(exerciseIds);
    setExerciseSettings(settings);
    setError("");
  }, [workoutToEdit]);

  function resetForm() {
    setName("");
    setDescription("");
    setDuration("");
    setDifficulty("Beginner");
    setSelectedExercises([]);
    setExerciseSettings({});
    setError("");
  }

  function handleExerciseToggle(exerciseId) {
    setSelectedExercises((currentExercises) => {
      if (currentExercises.includes(exerciseId)) {
        return currentExercises.filter(
          (id) => id !== exerciseId
        );
      }

      setError("");

      return [...currentExercises, exerciseId];
    });
  }

  function handleExerciseSettingChange(
    exerciseId,
    field,
    value
  ) {
    setError("");

    setExerciseSettings((currentSettings) => ({
      ...currentSettings,
      [exerciseId]: {
        ...currentSettings[exerciseId],
        [field]: Number(value),
      },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (Number(duration) <= 0) {
      setError(
        "Workout duration must be greater than 0 minutes."
      );
      return;
    }

    if (selectedExercises.length === 0) {
      setError("Please select at least one exercise.");
      return;
    }

    const hasInvalidExercise = selectedExercises.some(
      (exerciseId) => {
        const settings = exerciseSettings[exerciseId] || {
          sets: 3,
          reps: 10,
        };

        return (
          settings.sets <= 0 ||
          settings.reps <= 0
        );
      }
    );

    if (hasInvalidExercise) {
      setError(
        "Sets and reps must both be greater than 0."
      );
      return;
    }

    const workoutExercises = selectedExercises.map(
      (exerciseId) => ({
        exerciseId: exerciseId,
        sets:
          exerciseSettings[exerciseId]?.sets || 3,
        reps:
          exerciseSettings[exerciseId]?.reps || 10,
      })
    );

    if (isEditing) {
      const updatedWorkout = {
        ...workoutToEdit,
        name: name,
        description: description,
        duration: Number(duration),
        difficulty: difficulty,
        exercises: workoutExercises,
      };

      onUpdateWorkout(updatedWorkout);

      resetForm();
      return;
    }

    const newWorkout = {
      id: Date.now(),
      name: name,
      description: description,
      duration: Number(duration),
      difficulty: difficulty,
      exercises: workoutExercises,
    };

    onAddWorkout(newWorkout);

    resetForm();
  }

  function handleCancel() {
    resetForm();

    if (onCancelEdit) {
      onCancelEdit();
    }
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold mb-0">
            {isEditing
              ? "Edit Workout"
              : "Create a Workout"}
          </h2>

          {isEditing && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label
              htmlFor="workoutName"
              className="form-label fw-semibold"
            >
              Workout Name
            </label>

            <input
              id="workoutName"
              type="text"
              className="form-control"
              placeholder="Example: Morning Full Body"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="workoutDescription"
              className="form-label fw-semibold"
            >
              Description
            </label>

            <textarea
              id="workoutDescription"
              className="form-control"
              rows="3"
              placeholder="Describe your workout..."
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              required
            ></textarea>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label
                htmlFor="workoutDuration"
                className="form-label fw-semibold"
              >
                Duration (minutes)
              </label>

              <input
                id="workoutDuration"
                type="number"
                className="form-control"
                placeholder="45"
                min="1"
                value={duration}
                onChange={(event) =>
                  setDuration(event.target.value)
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="workoutDifficulty"
                className="form-label fw-semibold"
              >
                Difficulty
              </label>

              <select
                id="workoutDifficulty"
                className="form-select"
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value)
                }
              >
                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Exercises
            </label>

            <div className="row g-3">
              {exercises.map((exercise) => {
                const isSelected =
                  selectedExercises.includes(
                    exercise.id
                  );

                const settings =
                  exerciseSettings[exercise.id] || {
                    sets: 3,
                    reps: 10,
                  };

                return (
                  <div
                    className="col-12"
                    key={exercise.id}
                  >
                    <div className="border rounded-3 p-3">
                      <div className="form-check mb-3">
                        <input
                          id={`exercise-${exercise.id}`}
                          type="checkbox"
                          className="form-check-input"
                          checked={isSelected}
                          onChange={() =>
                            handleExerciseToggle(
                              exercise.id
                            )
                          }
                        />

                        <label
                          htmlFor={`exercise-${exercise.id}`}
                          className="form-check-label"
                        >
                          <strong>
                            {exercise.name}
                          </strong>

                          <span className="text-secondary d-block small">
                            {exercise.category} ·{" "}
                            {exercise.equipment}
                          </span>
                        </label>
                      </div>

                      {isSelected && (
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <label
                              htmlFor={`sets-${exercise.id}`}
                              className="form-label"
                            >
                              Sets
                            </label>

                            <input
                              id={`sets-${exercise.id}`}
                              type="number"
                              className="form-control"
                              min="1"
                              value={settings.sets}
                              onChange={(event) =>
                                handleExerciseSettingChange(
                                  exercise.id,
                                  "sets",
                                  event.target.value
                                )
                              }
                            />
                          </div>

                          <div className="col-sm-6">
                            <label
                              htmlFor={`reps-${exercise.id}`}
                              className="form-label"
                            >
                              Reps
                            </label>

                            <input
                              id={`reps-${exercise.id}`}
                              type="number"
                              className="form-control"
                              min="1"
                              value={settings.reps}
                              onChange={(event) =>
                                handleExerciseSettingChange(
                                  exercise.id,
                                  "reps",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-success"
            >
              {isEditing
                ? "Save Changes"
                : "Add Workout"}
            </button>

            {isEditing && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;