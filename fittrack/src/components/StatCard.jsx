function StatCard({ title, value }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <p className="text-secondary mb-2">
          {title}
        </p>

        <h3 className="display-6 fw-bold mb-0">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default StatCard;