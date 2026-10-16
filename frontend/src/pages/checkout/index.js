import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getParticipantPayments, getPublicEvent, createCheckout } from '../../utils/participantApi';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [personalDetail, setPersonalDetail] = useState({ firstName: '', lastName: '', email: '' });
  const [status, setStatus] = useState('loading');
  const [payment, setPayment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPublicEvent(id)
      .then((eventResponse) => {
        const loadedEvent = eventResponse.data.data;
        const organizer = loadedEvent.organizer?._id || loadedEvent.organizer;
        setEvent(loadedEvent);
        return getParticipantPayments(organizer);
      })
      .then((paymentResponse) => {
        setPayments((paymentResponse.data.data || []).filter((item) => item.status !== false));
        setStatus('success');
      })
      .catch(() => {
        setError('Detail event atau metode pembayaran belum dapat dimuat.');
        setStatus('error');
      });
  }, [id]);

  const selectedTickets = useMemo(
    () => (event?.tickets || [])
      .map((ticket) => ({ ticketCategories: { type: ticket.type, price: ticket.price }, sumTicket: Number(quantities[ticket._id] || 0) }))
      .filter((ticket) => ticket.sumTicket > 0),
    [event, quantities]
  );
  const total = selectedTickets.reduce((sum, ticket) => sum + ticket.ticketCategories.price * ticket.sumTicket, 0);

  const submit = async (submitEvent) => {
    submitEvent.preventDefault();
    setError('');
    if (!selectedTickets.length || !payment || !personalDetail.firstName || !personalDetail.lastName || !personalDetail.email) {
      setError('Lengkapi data diri, tiket, dan metode pembayaran.');
      return;
    }
    setSubmitting(true);
    try {
      await createCheckout({ event: id, personalDetail, payment, tickets: selectedTickets });
      navigate('/participant/orders', { replace: true, state: { success: 'Order berhasil dibuat dan menunggu pembayaran.' } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Checkout gagal. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') return <main className="container py-5"><p>Memuat checkout...</p></main>;
  if (status === 'error') return <main className="container py-5"><div className="alert alert-danger">{error}</div><Link to="/" className="btn btn-primary">Kembali</Link></main>;

  return (
    <main className="container py-5">
      <Link to={`/details/${id}`} className="text-decoration-none">← Kembali ke detail event</Link>
      <h1 className="fw-bold mt-3">Checkout Tiket</h1>
      <p className="text-secondary">{event.title}</p>
      <form onSubmit={submit} className="row g-4 mt-2">
        <div className="col-lg-7">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <section className="card border-0 shadow-sm p-4 mb-4">
            <h5>Data Pemesan</h5>
            <div className="row">
              {['firstName', 'lastName'].map((field) => (
                <div className="col-md-6 mb-3" key={field}>
                  <label className="form-label" htmlFor={field}>{field === 'firstName' ? 'Nama depan' : 'Nama belakang'}</label>
                  <input required id={field} className="form-control" value={personalDetail[field]} onChange={(e) => setPersonalDetail({ ...personalDetail, [field]: e.target.value })} />
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label" htmlFor="checkout-email">Email</label>
                <input required type="email" id="checkout-email" className="form-control" value={personalDetail.email} onChange={(e) => setPersonalDetail({ ...personalDetail, email: e.target.value })} />
              </div>
            </div>
          </section>
          <section className="card border-0 shadow-sm p-4 mb-4">
            <h5>Pilih Tiket</h5>
            {event.tickets.map((ticket) => (
              <div className="d-flex justify-content-between align-items-center border-bottom py-3" key={ticket._id}>
                <div><strong>{ticket.type}</strong><br /><small>Rp {Number(ticket.price).toLocaleString('id-ID')} · stok {ticket.stock}</small></div>
                <input type="number" min="0" max={ticket.stock} className="form-control ticket-quantity" aria-label={`Jumlah tiket ${ticket.type}`} value={quantities[ticket._id] || ''} onChange={(e) => setQuantities({ ...quantities, [ticket._id]: e.target.value })} />
              </div>
            ))}
          </section>
          <section className="card border-0 shadow-sm p-4">
            <h5>Metode Pembayaran</h5>
            {!payments.length && <p className="text-secondary">Metode pembayaran belum tersedia.</p>}
            {payments.map((item) => <label className="d-block border rounded p-3 mb-2" key={item._id}><input type="radio" name="payment" className="me-2" value={item._id} checked={payment === item._id} onChange={(e) => setPayment(e.target.value)} />{item.type}</label>)}
          </section>
        </div>
        <aside className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 sticky-top">
            <h5>Ringkasan</h5>
            {selectedTickets.map((ticket) => <div className="d-flex justify-content-between" key={ticket.ticketCategories.type}><span>{ticket.ticketCategories.type} × {ticket.sumTicket}</span><span>Rp {(ticket.ticketCategories.price * ticket.sumTicket).toLocaleString('id-ID')}</span></div>)}
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-4"><span>Total</span><span>Rp {total.toLocaleString('id-ID')}</span></div>
            <button className="btn btn-success w-100" disabled={submitting}>{submitting ? 'Memproses...' : 'Buat Pesanan'}</button>
          </div>
        </aside>
      </form>
    </main>
  );
}
