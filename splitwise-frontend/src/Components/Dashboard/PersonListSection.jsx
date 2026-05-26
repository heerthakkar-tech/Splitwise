function PersonListSection({ title, people }) {
  return (
    <div className="list-section">
      <div className="list-title">
        <h2>{title}</h2>
      </div>

      {people.length === 0 ? (
        <p>No pending amounts</p>
      ) : (
        people.map((person) => (
          <div key={person.id} className="person-card">
            <span className="person-name">{person.name}</span>
            <span className="person-price">₹{person.amount}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default PersonListSection;
