import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicEvents } from '../../utils/participantApi';
import { config } from '../../configs';

const fallbackImages = [
  '/assets/images/card-1.png',
  '/assets/images/card-2.png',
  '/assets/images/card-3.png',
  '/assets/images/card-4.png',
];

const imageUrl = (image, index = 0) => {
  if (!image?.name) return fallbackImages[index % fallbackImages.length];
  return `${config.apiImage}/${image.name.replace(/^\/+/, '')}`;
};

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(date))
    : 'Tanggal belum ditentukan';

const lowestPrice = (tickets = []) => {
  const available = tickets.filter((ticket) => ticket.statusTicketCategories !== false);
  if (!available.length) return 'SOLD OUT';
  const price = Math.min(...available.map((ticket) => Number(ticket.price) || 0));
  return price === 0 ? 'FREE' : `Rp ${price.toLocaleString('id-ID')}`;
};

export default function Home() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    getPublicEvents()
      .then((response) => {
        if (mounted) {
          setEvents(Array.isArray(response.data.data) ? response.data.data : []);
          setStatus('success');
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Event belum dapat dimuat. Pastikan server sedang berjalan.');
          setStatus('error');
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        `${event.title} ${event.venueName} ${event.category?.name || ''}`
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ),
    [events, keyword]
  );

  return (
    <div>
      <header className="header bg-navy">
        <nav className="container navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/assets/images/logo.svg" alt="Semina" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-label="Buka navigasi">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mx-auto my-3 my-lg-0">
                <Link className="nav-link active" to="/">Home</Link>
                <a className="nav-link" href="#grow-today">Browse</a>
                <a className="nav-link" href="#story">Stories</a>
                <a className="nav-link" href="#about">About</a>
              </div>
              <div className="d-grid">
                <Link to="/login" className="btn-navy">Sign In</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="hero">
          <div className="hero-headline">
            Expand Your <span className="text-gradient-blue">Knowledge</span>{' '}
            <br className="d-none d-lg-block" />
            by <span className="text-gradient-pink">Joining</span> Our Greatest Events
          </div>
          <p className="hero-paragraph">
            Kami menyediakan berbagai acara terbaik untuk membantu anda meningkatkan skills di bidang teknologi
          </p>
          <a href="#grow-today" className="btn-green">Browse Now</a>
        </div>
        <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
          <img src="/assets/images/1.png" alt="Peserta event" className="img-1" />
          <img src="/assets/images/2.png" alt="Pembicara event" className="img-2" />
          <img src="/assets/images/1.png" alt="Peserta event" className="img-1" />
        </div>
      </header>

      <section className="brand-partner text-center">
        <p>Events held by top &amp; biggest global companies</p>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
          <img src="/assets/images/apple-111.svg" alt="Apple" />
          <img src="/assets/images/Adobe.svg" alt="Adobe" />
          <img src="/assets/images/slack-21.svg" alt="Slack" />
          <img src="/assets/images/spotify-11.svg" alt="Spotify" />
          <img src="/assets/images/google-2015.svg" alt="Google" />
        </div>
      </section>

      <section className="grow-today" id="grow-today">
        <div className="container">
          <div className="sub-title mb-1"><span className="text-gradient-pink">Grow Today</span></div>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="title">Featured Events</div>
            <label className="visually-hidden" htmlFor="event-search">Cari event</label>
            <input id="event-search" className="form-control event-search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Cari event, lokasi, kategori..." />
          </div>
          {status === 'loading' && <p className="mt-5">Memuat event...</p>}
          {status === 'error' && <div className="alert alert-danger mt-4" role="alert">{error}</div>}
          {status === 'success' && !filteredEvents.length && <div className="alert alert-info mt-4">Belum ada event yang sesuai pencarian.</div>}
          <div className="mt-5 row gap">
            {filteredEvents.map((event, index) => (
              <div className="col-lg-3 col-md-6 col-12 mb-4" key={event._id}>
                <div className="card-grow h-100">
                  <span className="badge-pricing">{lowestPrice(event.tickets)}</span>
                  <img src={imageUrl(event.image, index)} alt={event.title} />
                  <div className="card-content">
                    <div className="card-title">{event.title}</div>
                    <div className="card-subtitle">{event.category?.name || 'Event'}</div>
                    <div className="description">{event.venueName} · {formatDate(event.date)}</div>
                    <Link to={`/details/${event._id}`} className="stretched-link" aria-label={`Lihat detail ${event.title}`}>Lihat detail</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stories" id="story">
        <div className="d-flex flex-row justify-content-center align-items-center container">
          <img src="/assets/images/story.png" alt="Cerita komunitas Semina" className="d-none d-lg-block" width="515" />
          <div className="d-flex flex-column">
            <div className="sub-title"><span className="text-gradient-pink">Story</span></div>
            <div className="title">One Great Event. <br className="d-none d-lg-block" />For The Better World.</div>
            <p className="paragraph">Temukan cerita dari komunitas dan pembicara yang bertumbuh melalui event Semina.</p>
            <a href="#about" className="btn-navy">Learn More</a>
          </div>
        </div>
      </section>

      <section className="statistics container" id="about">
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5">
          <div className="d-flex flex-column align-items-center gap-1"><div className="title">{events.length || '—'}</div><p>Published Events</p></div>
          <div className="vr" />
          <div className="d-flex flex-column align-items-center gap-1"><div className="title">3M</div><p>People Joined</p></div>
          <div className="vr d-none d-md-block" />
          <div className="d-flex flex-column align-items-center gap-1"><div className="title">5K+</div><p>Success Startup</p></div>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="container">
          <Link to="/"><img src="/assets/images/logo.svg" alt="Semina" /></Link>
          <p>Semina adalah tempat di mana anda dapat mencari event sesuai dengan minat dan lokasi terdekat.</p>
          <p className="small">All Rights Reserved. Semina</p>
        </div>
      </footer>
    </div>
  );
}
