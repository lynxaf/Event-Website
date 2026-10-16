import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { config } from '../../configs';
import { getPublicEvent } from '../../utils/participantApi';

const imageUrl = (image) =>
  image?.name
    ? `${config.apiImage}/${image.name.replace(/^\/+/, '')}`
    : '/assets/images/details-image.png';

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(date))
    : 'Tanggal belum ditentukan';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let mounted = true;
    getPublicEvent(id)
      .then((response) => {
        if (mounted) {
          setEvent(response.data.data);
          setStatus('success');
        }
      })
      .catch(() => mounted && setStatus('error'));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (status === 'loading') return <main className="container py-5"><p>Memuat detail event...</p></main>;
  if (status === 'error' || !event) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger" role="alert">Event tidak ditemukan atau belum dapat dimuat.</div>
        <Link to="/" className="btn btn-primary">Kembali ke event</Link>
      </main>
    );
  }

  const availableTickets = (event.tickets || []).filter(
    (ticket) => ticket.statusTicketCategories !== false && ticket.stock > 0
  );
  const minPrice = availableTickets.length
    ? Math.min(...availableTickets.map((ticket) => Number(ticket.price) || 0))
    : null;

  return (
    <div className="details-page">
      <section className="bg-navy">
        <nav className="container navbar navbar-expand-lg navbar-dark py-3">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src="/assets/images/logo.svg" alt="Semina" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#detailsNav" aria-label="Buka navigasi"><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="detailsNav">
              <div className="navbar-nav mx-auto gap-3">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/#grow-today">Browse</Link>
                <Link className="nav-link" to="/#story">Stories</Link>
                <Link className="nav-link" to="/#about">About</Link>
              </div>
              <Link className="btn btn-outline-light" to="/login">Sign In</Link>
            </div>
          </div>
        </nav>
      </section>

      <section className="preview-image bg-navy text-center pb-5">
        <img src={imageUrl(event.image)} className="img-fluid rounded-4" alt={event.title} />
      </section>

      <section className="container py-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <span className="text-gradient-pink">{event.category?.name || 'Event'}</span>
            <h1 className="fw-bold mb-4">{event.title}</h1>
            <div className="mb-5">
              <h5 className="fw-semibold mb-3">Event Details</h5>
              <p className="text-secondary">{event.tagline}</p>
              <p className="text-secondary">{event.about || 'Detail event belum tersedia.'}</p>
            </div>
            {!!event.keyPoint?.length && (
              <div className="mb-5">
                <h5 className="fw-semibold mb-3">Yang akan dipelajari</h5>
                {event.keyPoint.map((point) => (
                  <div className="d-flex gap-3 mb-3" key={point}>
                    <span className="text-success" aria-hidden="true">✓</span><span>{point}</span>
                  </div>
                ))}
              </div>
            )}
            <div>
              <h5 className="fw-semibold mb-3">Event Location</h5>
              <div className="rounded-4 bg-light p-4">
                <p className="mb-2"><strong>{event.venueName}</strong></p>
                <a className="btn btn-outline-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venueName)}`} target="_blank" rel="noreferrer">
                  View in Google Maps
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top">
              <h5 className="fw-semibold">Your Speaker</h5>
              <div className="d-flex align-items-center gap-3 my-4">
                <img src={imageUrl(event.talent?.image)} width="60" height="60" className="rounded-circle object-fit-cover" alt={event.talent?.name || 'Speaker'} />
                <div><h6 className="mb-0">{event.talent?.name || 'Speaker'}</h6><small className="text-secondary">{event.talent?.role || 'Pembicara'}</small></div>
              </div>
              <hr />
              <h5 className="fw-semibold">Get Ticket</h5>
              <div className="display-6 fw-bold my-3">{minPrice === null ? 'SOLD OUT' : minPrice === 0 ? 'FREE' : `Rp ${minPrice.toLocaleString('id-ID')}`} {minPrice !== null && <span className="fs-6 text-secondary">/ticket</span>}</div>
              <div className="mb-3">📍 {event.venueName}</div>
              <div className="mb-3">🗓️ {formatDate(event.date)}</div>
              <button type="button" className="btn btn-success w-100 py-3" disabled={!availableTickets.length} onClick={() => navigate(`/checkout/${event._id}`)}>
                {availableTickets.length ? 'Join Now' : 'Sold Out'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
