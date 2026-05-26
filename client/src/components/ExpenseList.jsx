function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) {
    return <div className="rounded-3xl bg-slate-50 p-10 text-center text-slate-500">No expenses tracked yet. Add your first expense to start seeing insights.</div>;
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1.8fr_0.75fr_0.75fr_0.5fr] gap-4 bg-slate-100 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 sm:grid">
        <span>Item</span>
        <span>Category</span>
        <span>Amount</span>
        <span className="text-right">Action</span>
      </div>

      <div className="divide-y divide-slate-200">
        {expenses.map((expense) => (
          <div key={expense._id} className="grid gap-4 px-6 py-5 text-sm text-slate-700 sm:grid-cols-[1.8fr_0.75fr_0.75fr_0.5fr] sm:items-center">
            <div>
              <div className="font-semibold text-slate-900">{expense.title}</div>
              <div className="mt-1 text-xs text-slate-500">{new Date(expense.date).toLocaleDateString()}</div>
            </div>
            <div className="text-slate-600">{expense.category}</div>
            <div className="text-slate-900 font-semibold">${expense.amount.toFixed(2)}</div>
            <div className="text-right sm:text-right">
              <button
                onClick={() => onDelete(expense._id)}
                className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
