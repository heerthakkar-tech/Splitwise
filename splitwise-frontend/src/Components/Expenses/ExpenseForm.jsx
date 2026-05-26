function ExpenseForm({
  description,
  setDescription,
  amount,
  setAmount,
  handleSubmit,
  navigate,
  children,
}) {
  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        className="input"
        type="text"
        placeholder="Expense description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="input"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <h3 className="paid_h3">You are automatically included as payer</h3>

      {children}

      <div className="button-row-container">
        <button type="submit" className="expense-btn">
          Split Expense
        </button>

        <button
          type="button"
          className="expense-btn secondary-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
