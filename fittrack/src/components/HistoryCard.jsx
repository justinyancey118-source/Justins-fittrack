function HistoryCard({
  historyItem,
  onDeleteHistory,
}) {
  const formattedDate = new Date(
    `${historyItem.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <p className="text-success fw-bold small mb-1">
          COMPLETED
        </p>

        <h3 className="h5 fw-bold mb-3">
          {historyItem.workoutName}
        </h3>

        <div className="mb-3">
          <p className="text-secondary mb-1">
            Date
          </p>

          <strong>{formattedDate}</strong>
        </div>

        <div className="mb-3">
          <p className="text-secondary mb-1">
            Duration
          </p>

          <strong>
            {historyItem.duration} minutes
          </strong>
        </div>

        <div className="mb-4">
          <p className="text-secondary mb-1">
            Exercises Completed
          </p>

          <strong>
            {historyItem.exercisesCompleted}
          </strong>
        </div>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() =>
            onDeleteHistory(historyItem.id)
          }
        >
          Delete Record
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;