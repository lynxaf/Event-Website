import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getParticipantOrders } from '../../utils/participantApi';

export default function ParticipantOrders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    getParticipantOrders()
      .then((response) => {
        setOrders(response.data.data || []);
        setStatus('success');
      })
      .catch(() => {
        setError('Order belum dapat dimuat.');
        setStatus('error');
      });
  }, []);

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><Link to="/" className="text-decoration-none">Semina</Link><h1 className="fw-bold mt-2">Pesanan Saya</h1></div>
        <Link to="/" className="btn btn-outline-primary">Cari event</Link>
      </div>
      {location.state?.success && <div className="alert alert-success">{location.state.success}</div>}
      {status === 'loading' && <p>Memuat pesanan...</p>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}
      {status === 'success' && !orders.length && <div className="alert alert-info">Anda belum memiliki pesanan.</div>}
      <div className="row g-4">
        {orders.map((order) => (
          <div className="col-md-6" key={order._id}>
            <article className="card border-0 shadow-sm p-4 h-100">
              <div className="d-flex justify-content-between gap-2"><h5>{order.historyEvent?.title || 'Event'}</h5><span className={`badge ${order.status === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>{order.status}</span></div>
              <p className="text-secondary mb-2">{order.historyEvent?.venueName}</p>
              <p className="mb-1">Tanggal: {order.historyEvent?.date ? new Date(order.historyEvent.date).toLocaleString('id-ID') : '-'}</p>
              <p className="mb-1">Tiket: {order.totalOrderTicket}</p>
              <strong>Total: Rp {Number(order.totalPay || 0).toLocaleString('id-ID')}</strong>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
