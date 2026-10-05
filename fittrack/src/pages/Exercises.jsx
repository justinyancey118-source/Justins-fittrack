import ExerciseLibrary from "../components/ExerciseLibrary";
import exercises from "../data/exercises";

function Exercises() {
  return (
    <>
      <section className="mb-5">
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
          <p className="text-success fw-bold small mb-2">
            EXERCISE LIBRARY
          </p>

          <h1 className="display-6 fw-bold mb-3">
            Exercises
          </h1>

          <p className="lead text-secondary mb-0">
            Browse exercises, search by name, and filter by category.
          </p>
        </div>
      </section>

      <ExerciseLibrary exercises={exercises} />
    </>
  );
}

export default Exercises;