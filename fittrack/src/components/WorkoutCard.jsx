function WorkoutCard({
  workout,
  exercises,
  onStartWorkout,
  onEditWorkout,
  onDeleteWorkout,
}) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="h5 fw-bold mb-0">
            {workout.name}
          </h3>

          <span className="badge text-bg-success">
            {workout.difficulty}
          </span>
        </div>

        <p className="text-secondary">
          {workout.description}
        </p>

        <div className="mb-3">
          <strong>Exercises:</strong>

          <ul className="list-group list-group-flush mt-2">
            {workout.exercises.map((workoutExercise) => {
              const exercise = exercises.find(
                (exercise) =>
                  exercise.id ===
                  workoutExercise.exerciseId
              );

              return (
                <li
                  key={workoutExercise.exerciseId}
                  className="list-group-item px-0"
                >
                  <div className="d-flex justify-content-between">
                    <span>{exercise.name}</span>

                    <span className="text-secondary">
                      {workoutExercise.sets} sets ×{" "}
                      {workoutExercise.reps} reps
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-3">
          <strong>Duration:</strong>{" "}
          {workout.duration} minutes
        </div>

        <div className="d-flex gap-2 mt-auto">
          <button
            type="button"
            className="btn btn-success flex-grow-1"
            onClick={() =>
              onStartWorkout(workout)
            }
          >
            Start Workout
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() =>
              onEditWorkout(workout)
            }
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() =>
              onDeleteWorkout(workout.id)
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;