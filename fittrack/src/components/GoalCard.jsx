function GoalCard({
  goal,
  onEditGoal,
  onDeleteGoal,
}) {
  const progress = Math.min(
    100,
    Math.round((goal.current / goal.target) * 100)
  );

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="h5 fw-bold mb-0">
            {goal.name}
          </h3>

          <span className="badge text-bg-success">
            {goal.status}
          </span>
        </div>

        <p className="text-secondary">
          {goal.description}
        </p>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">
            Progress
          </span>

          <strong>
            {goal.current} / {goal.target} {goal.unit}
          </strong>
        </div>

        <div
          className="progress mb-3"
          role="progressbar"
          aria-label={`${goal.name} progress`}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>

        <p className="small text-secondary">
          Deadline: {goal.deadline}
        </p>

        <div className="d-flex gap-2 mt-auto">
          <button
            type="button"
            className="btn btn-outline-primary flex-grow-1"
            onClick={() => onEditGoal(goal)}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => onDeleteGoal(goal.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;