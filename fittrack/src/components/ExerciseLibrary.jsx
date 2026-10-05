import { useState } from "react";
import SearchBar from "./SearchBar";
import ExerciseCard from "./ExerciseCard";

function ExerciseLibrary({ exercises }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredExercises = exercises.filter(
    (exercise) => {
      const matchesSearch = exercise.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        exercise.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <section>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Exercise Library
        </h2>

        <p className="text-secondary mb-0">
          Browse and search available exercises.
        </p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <SearchBar
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            <div className="col-md-4">
              <label
                htmlFor="categoryFilter"
                className="form-label fw-semibold"
              >
                Category
              </label>

              <select
                id="categoryFilter"
                className="form-select"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
              >
                <option value="All">All</option>
                <option value="Chest">Chest</option>
                <option value="Legs">Legs</option>
                <option value="Back">Back</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredExercises.length > 0 ? (
        <div className="row g-4">
          {filteredExercises.map((exercise) => (
            <div
              className="col-md-6 col-lg-4"
              key={exercise.id}
            >
              <ExerciseCard exercise={exercise} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-4 shadow-sm p-5 text-center">
          <h3 className="h4 fw-bold">
            No exercises found
          </h3>

          <p className="text-secondary mb-0">
            No exercises match "{searchTerm}". Try a
            different search.
          </p>
        </div>
      )}
    </section>
  );
}

export default ExerciseLibrary;