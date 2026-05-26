function SummaryCards({ totals }) {
  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Owed To You</h3>
        <p>₹{totals.totalOwedToYou}</p>
      </div>

      <div className="card">
        <h3>You Owe</h3>
        <p>₹{totals.totalYouOwe}</p>
      </div>

      <div className="card">
        <h3>Net Balance</h3>
        <p>₹{totals.netBalance}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
