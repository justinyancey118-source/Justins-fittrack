import { useEffect, useState } from "react";

function GoalForm({
  onAddGoal,
  onUpdateGoal,
  goalToEdit,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [unit, setUnit] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const isEditing = Boolean(goalToEdit);

  useEffect(() => {
    if (!goalToEdit) {
      return;
    }

    setName(goalToEdit.name);
    setDescription(goalToEdit.description);
    setTarget(String(goalToEdit.target));
    setCurrent(String(goalToEdit.current));
    setUnit(goalToEdit.unit);
    setDeadline(goalToEdit.deadline);
    setError("");
  }, [goalToEdit]);

  function resetForm() {
    setName("");
    setDescription("");
    setTarget("");
    setCurrent("");
    setUnit("");
    setDeadline("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (Number(target) <= 0) {
      setError("Goal target must be greater than 0.");
      return;
    }

    if (Number(current) < 0) {
      setError("Current progress cannot be negative.");
      return;
    }

    if (Number(current) > Number(target)) {
      setError(
        "Current progress cannot be greater than the target."
      );
      return;
    }

    if (isEditing) {
      const updatedGoal = {
        ...goalToEdit,
        name: name,
        description: description,
        target: Number(target),
        current: Number(current),
        unit: unit,
        deadline: deadline,
      };

      onUpdateGoal(updatedGoal);

      resetForm();
      return;
    }

    const newGoal = {
      id: Date.now(),
      name: name,
      description: description,
      target: Number(target),
      current: Number(current),
      unit: unit,
      deadline: deadline,
      status: "In Progress",
    };

    onAddGoal(newGoal);

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
              ? "Edit Fitness Goal"
              : "Create a Fitness Goal"}
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
              htmlFor="goalName"
              className="form-label fw-semibold"
            >
              Goal Name
            </label>

            <input
              id="goalName"
              type="text"
              className="form-control"
              placeholder="Example: Run 5 miles"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="goalDescription"
              className="form-label fw-semibold"
            >
              Description
            </label>

            <textarea
              id="goalDescription"
              className="form-control"
              rows="3"
              placeholder="Describe your fitness goal..."
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              required
            ></textarea>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label
                htmlFor="goalTarget"
                className="form-label fw-semibold"
              >
                Target
              </label>

              <input
                id="goalTarget"
                type="number"
                className="form-control"
                placeholder="100"
                min="1"
                value={target}
                onChange={(event) =>
                  setTarget(event.target.value)
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="goalCurrent"
                className="form-label fw-semibold"
              >
                Current Progress
              </label>

              <input
                id="goalCurrent"
                type="number"
                className="form-control"
                placeholder="25"
                min="0"
                value={current}
                onChange={(event) =>
                  setCurrent(event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label
                htmlFor="goalUnit"
                className="form-label fw-semibold"
              >
                Unit
              </label>

              <input
                id="goalUnit"
                type="text"
                className="form-control"
                placeholder="lbs, miles, workouts, etc."
                value={unit}
                onChange={(event) =>
                  setUnit(event.target.value)
                }
                required
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="goalDeadline"
                className="form-label fw-semibold"
              >
                Deadline
              </label>

              <input
                id="goalDeadline"
                type="date"
                className="form-control"
                value={deadline}
                onChange={(event) =>
                  setDeadline(event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-success"
            >
              {isEditing
                ? "Save Changes"
                : "Add Goal"}
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

export default GoalForm;