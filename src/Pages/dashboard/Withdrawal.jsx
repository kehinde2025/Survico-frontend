import { useState } from 'react';

export default function Withdrawal() {
  const [method, setMethod] = useState('usdt');
  const [form, setForm] = useState({
    amount: '',
    bankName: '',
    accountNumber: '',
    usdtAddress: '',
    giftCardType: '',
    giftCardEmail: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [history, setHistory] = useState([
    { id: 1, amount: 10, method: 'USDT', status: 'Paid', date: '2025-07-05' },
    { id: 2, amount: 7, method: 'Bank', status: 'Pending', date: '2025-07-01' },
  ]);

  const [userPoints, setUserPoints] = useState(120);
  const [convertPoints, setConvertPoints] = useState('');
  const [balance, setBalance] = useState(22.5);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(form.amount);
    if (amount < 5) {
      alert('Minimum withdrawal is $5');
      return;
    }

    if (amount > balance) {
      alert('Withdrawal amount exceeds your available balance.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccessMsg('✅ Withdrawal request submitted successfully!');
      setHistory([
        {
          id: Date.now(),
          amount,
          method:
            method === 'usdt'
              ? 'USDT'
              : method === 'bank'
              ? 'Bank'
              : 'Gift Card',
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
        },
        ...history,
      ]);

      setBalance(balance - amount);

      setForm({
        amount: '',
        bankName: '',
        accountNumber: '',
        usdtAddress: '',
        giftCardType: '',
        giftCardEmail: '',
      });
    }, 1500);
  };

  const handleConvertPoints = () => {
    const pts = parseInt(convertPoints);
    if (isNaN(pts) || pts <= 0) {
      alert('Enter a valid number of points.');
      return;
    }

    if (pts > userPoints) {
      alert('You do not have that many points.');
      return;
    }

    const usd = pts / 100;

    setUserPoints(userPoints - pts);
    setBalance(balance + usd);
    setConvertPoints('');
    alert(`✅ Successfully converted ${pts} pts to $${usd.toFixed(2)}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 text-center">💸 Withdrawal</h2>

      <div className="text-center text-sm text-gray-600">
        Available Balance:{' '}
        <span className="font-bold text-green-600">${balance.toFixed(2)}</span>
      </div>

      {/* Convert Points */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="font-bold text-gray-700">Convert Points to USD</h3>
        <p className="text-sm text-gray-600">
          Available Points: <span className="font-bold">{userPoints} pts</span> (100 pts = $1)
        </p>
        <input
          type="number"
          placeholder="Points to convert"
          value={convertPoints}
          onChange={(e) => setConvertPoints(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleConvertPoints}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
        >
          Convert Points to USD
        </button>
      </div>

      {successMsg && (
        <div className="bg-green-100 text-green-700 text-sm text-center px-4 py-2 rounded">
          {successMsg}
        </div>
      )}

      {/* Withdrawal Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm mb-1">Amount (USD)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Minimum $5"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="usdt">USDT (TRC20)</option>
            <option value="bank">Bank Transfer</option>
            <option value="giftcard">Gift Card</option>
          </select>
        </div>

        {/* Bank Fields */}
        {method === 'bank' && (
          <>
            <div>
              <label className="block text-sm mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {/* USDT Fields */}
        {method === 'usdt' && (
          <div>
            <label className="block text-sm mb-1">USDT Wallet Address (TRC20)</label>
            <input
              type="text"
              name="usdtAddress"
              value={form.usdtAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        )}

        {/* Gift Card Fields */}
        {method === 'giftcard' && (
          <>
            <div>
              <label className="block text-sm mb-1">Gift Card Type</label>
              <select
                name="giftCardType"
                value={form.giftCardType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select Gift Card</option>
                <option value="Amazon">Amazon</option>
                <option value="iTunes">iTunes</option>
                <option value="Google Play">Google Play</option>
                <option value="Steam">Steam</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Recipient Email</label>
              <input
                type="email"
                name="giftCardEmail"
                value={form.giftCardEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter email to receive gift card"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full text-white py-2 rounded transition ${
            submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Withdrawal'}
        </button>
      </form>

      <div className="text-xs text-gray-500 text-center pt-2">
        💡 <strong>Note:</strong> Minimum withdrawal is <strong>$5</strong>. Requests are processed within 24–48 hours.
      </div>

      {/* Withdrawal History */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h3 className="text-md font-bold mb-3 text-gray-800">🧾 Withdrawal History</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">No withdrawals yet.</p>
        ) : (
          <ul className="divide-y text-sm">
            {history.map((entry) => (
              <li key={entry.id} className="flex justify-between py-2">
                <span>
                  {entry.date} - ${entry.amount} ({entry.method})
                </span>
                <span
                  className={`font-medium ${
                    entry.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {entry.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
