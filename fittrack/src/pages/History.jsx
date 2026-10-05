function History({
  history,
  onDeleteHistory,
}) {
  function formatDate(dateString) {
    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleDelete(workout) {
    const confirmed = window.confirm(
      `Delete "${workout.workoutName}" from your workout history?`
    );

    if (!confirmed) {
      return;
    }

    onDeleteHistory(workout.id);
  }

  return (
    <>
      <section className="mb-5">
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
          <p className="text-success fw-bold small mb-2">
            WORKOUT HISTORY
          </p>

          <h1 className="display-6 fw-bold mb-3">
            History
          </h1>

          <p className="lead text-secondary mb-0">
            Review your completed workouts and track your
            consistency over time.
          </p>
        </div>
      </section>

      <section>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Completed Workouts
            </h2>

            <p className="text-secondary mb-0">
              {history.length} completed workout
              {history.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {history.length > 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3">
                        Workout
                      </th>

                      <th className="py-3">
                        Date
                      </th>

                      <th className="py-3">
                        Duration
                      </th>

                      <th className="py-3">
                        Exercises
                      </th>

                      <th className="py-3">
                        Status
                      </th>

                      <th className="py-3 text-end pe-4">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map((workout) => (
                      <tr key={workout.id}>
                        <td className="px-4">
                          <strong>
                            {workout.workoutName}
                          </strong>
                        </td>

                        <td>
                          {formatDate(workout.date)}
                        </td>

                        <td>
                          {workout.duration} min
                        </td>

                        <td>
                          {workout.exercises}
                        </td>

                        <td>
                          <span className="badge text-bg-success">
                            Completed
                          </span>
                        </td>

                        <td className="text-end pe-4">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleDelete(workout)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-4 shadow-sm p-5 text-center">
            <h3 className="h4 fw-bold mb-2">
              No workout history yet
            </h3>

            <p className="text-secondary mb-0">
              Complete a workout and it will appear here.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default History;