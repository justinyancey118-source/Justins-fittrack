function ExerciseCard({ exercise }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h3 className="h5 fw-bold mb-3">
          {exercise.name}
        </h3>

        <p className="mb-2">
          <strong>Category:</strong>{" "}
          {exercise.category}
        </p>

        <p className="mb-2">
          <strong>Equipment:</strong>{" "}
          {exercise.equipment}
        </p>

        <span className="badge text-bg-success">
          {exercise.difficulty}
        </span>
      </div>
    </div>
  );
}

export default ExerciseCard;