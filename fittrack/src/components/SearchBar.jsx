function SearchBar({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="exerciseSearch"
        className="form-label fw-semibold"
      >
        Search exercises
      </label>

      <input
        id="exerciseSearch"
        type="text"
        className="form-control"
        placeholder="Try 'bench' or 'squat'"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;