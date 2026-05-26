import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const palette = ['#6366F1', '#EC4899', '#FBBF24', '#22C55E', '#3B82F6', '#F97316'];

function Dashboard({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const average = expenses.length ? total / expenses.length : 0;
  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const monthlyData = Object.values(
    expenses.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = { month, total: 0 };
      }
      acc[month].total += item.amount;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.month) - new Date(b.month));

  const categoryData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  const topCategory = categoryData.sort((a, b) => b.value - a.value)[0]?.name || 'None';

  const generatePdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });

    doc.setFontSize(18);
    doc.text('Expense Statement', 40, 50);
    doc.setFontSize(11);
    doc.setTextColor('#4b5563');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 72);

    doc.setFontSize(12);
    doc.setTextColor('#111827');
    doc.text(`Total spend: ₹${total.toFixed(2)}`, 40, 102);
    doc.text(`Average expense: ₹${average.toFixed(2)}`, 40, 120);
    doc.text(`Top category: ${topCategory}`, 40, 138);

    const rows = expenses.map((expense) => [
      new Date(expense.date).toLocaleDateString(),
      expense.title,
      expense.category,
      `₹${expense.amount.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 170,
      head: [['Date', 'Title', 'Category', 'Amount']],
      body: rows,
      styles: { fontSize: 10, textColor: '#374151' },
      headStyles: { fillColor: '#4f46e5', textColor: '#ffffff' },
      alternateRowStyles: { fillColor: '#f8fafc' }
    });

    doc.save('expense-statement.pdf');
  };

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Spending dashboard</h2>
          <p className="mt-2 text-sm text-slate-500">Visualize your spending trends and category breakdowns.</p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <button
            type="button"
            onClick={generatePdf}
            className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
          >
            Download statement
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total spend</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">₹{total.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Avg expense</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">₹{average.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Top category</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{topCategory}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[1.75rem] bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Monthly spend</p>
              <p className="text-xs text-slate-500">Last recorded months</p>
            </div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              {monthlyData.length} months
            </span>

          </div>
          <div>
            {monthlyData.length ? (
                monthlyData.map((entry) => (
                  <div key={entry.month} className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 mb-3 shadow-sm">
                    <p className="text-sm text-slate-700">{entry.month}</p>
                    <p className="text-sm font-semibold text-slate-900">₹{entry.total.toFixed(2)}</p>
                  </div>
                ))
              
            ) : (
              <div className="rounded-3xl bg-white p-8 text-center text-slate-500">Add expenses to populate monthly report.</div>
            )}
          </div>
         
        </div>

        <div className="rounded-[1.75rem] bg-slate-50 p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-900">Category breakdown</p>
            <p className="text-xs text-slate-500">How your spending distributes across categories</p>
          </div>
          <div className="flex h-[320px] flex-col justify-center">
            {categoryData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    onClick={() => {}}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={palette[index % palette.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Category']} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12, color: '#37516B' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="rounded-3xl bg-white p-8 text-center text-slate-500">Add expenses to populate category charts.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
