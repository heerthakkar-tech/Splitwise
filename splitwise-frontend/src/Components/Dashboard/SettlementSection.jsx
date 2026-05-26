function SettlementSection({ settlements }) {
  return (
    <div className="list-section">
      <div className="list-title">
        <h2>Settlement</h2>
      </div>

      {settlements.length === 0 ? (
        <p>No pending settlements</p>
      ) : (
        settlements.map((settlement, index) => (
          <div key={index} className="person-card">
            <span className="person-name">{settlement.name}</span>
            <span
              className="person-price"
              style={{
                color: settlement.type === "You Owe" ? "red" : "green",
              }}
            >
              {settlement.type === "You Owe"
                ? `Pay ₹${settlement.amount}`
                : `Receive ₹${settlement.amount}`}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default SettlementSection;
