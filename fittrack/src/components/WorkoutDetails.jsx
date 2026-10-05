function WorkoutDetails({
  workout,
  exercises,
  onClose,
  onCompleteWorkout,
}) {
  return (
    <div className="card border-0 shadow-sm mb-5">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <p className="text-success fw-bold small mb-2">
              WORKOUT DETAILS
            </p>

            <h2 className="fw-bold mb-2">
              {workout.name}
            </h2>

            <p className="text-secondary mb-0">
              {workout.description}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="bg-light rounded-3 p-3">
              <small className="text-secondary d-block">
                Duration
              </small>

              <strong>
                {workout.duration} minutes
              </strong>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-light rounded-3 p-3">
              <small className="text-secondary d-block">
                Difficulty
              </small>

              <strong>
                {workout.difficulty}
              </strong>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bg-light rounded-3 p-3">
              <small className="text-secondary d-block">
                Exercises
              </small>

              <strong>
                {workout.exercises.length}
              </strong>
            </div>
          </div>
        </div>

        <h3 className="h5 fw-bold mb-3">
          Exercises
        </h3>

        <div className="list-group mb-4">
          {workout.exercises.map(
            (workoutExercise) => {
              const exercise = exercises.find(
                (item) =>
                  item.id ===
                  workoutExercise.exerciseId
              );

              return (
                <div
                  className="list-group-item"
                  key={workoutExercise.exerciseId}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>
                        {exercise.name}
                      </strong>

                      <small className="text-secondary d-block">
                        {exercise.category}
                      </small>
                    </div>

                    <span>
                      {workoutExercise.sets} sets ×{" "}
                      {workoutExercise.reps} reps
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() =>
            onCompleteWorkout(workout)
          }
        >
          Complete Workout
        </button>
      </div>
    </div>
  );
}

export default WorkoutDetails;