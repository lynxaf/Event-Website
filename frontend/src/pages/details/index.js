import React, { useState } from "react";

const similarEvents = [
  {
    title: "Learn Jira for Sprint Design Venture",
    category: "Product Design",
    date: "Bandung, 22 Jan 2022",
    price: "$229",
    image: "/assets/images/card-1.png",
  },
  {
    title: "Team Management for Long Term",
    category: "Product Design",
    date: "Jakarta, 11 Aug 2022",
    price: "FREE",
    image: "/assets/images/card-2.png",
  },
  {
    title: "Set Marketing Target For SaaS Bii",
    category: "Product Design",
    date: "Bandung, 22 Jan 2022",
    price: "$80",
    image: "/assets/images/card-3.png",
  },
  {
    title: "Google Adsense from Zero to Big Bucks",
    category: "Product Design",
    date: "Jakarta, 11 Aug 2022",
    price: "$90",
    image: "/assets/images/card-4.png",
  },
];

export default function Details() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="details-page">
      {/* NAVBAR */}
      <section className="bg-navy">
        <nav className="container navbar navbar-expand-lg navbar-dark py-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src="/assets/images/logo.svg" alt="Semina" />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav mx-auto gap-3">
                <a className="nav-link" href="/">Home</a>
                <a className="nav-link" href="/">Browse</a>
                <a className="nav-link" href="/">Stories</a>
                <a className="nav-link" href="/">About</a>
              </div>

              <a className="btn btn-outline-light" href="/login">
                Sign In
              </a>
            </div>
          </div>
        </nav>
      </section>

      {/* HERO IMAGE */}
      <section className="preview-image bg-navy text-center pb-5">
        <img
          src="/assets/images/details-image.png"
          className="img-fluid rounded-4"
          alt="Event"
        />
      </section>

      {/* MAIN CONTENT */}
      <section className="container py-5">
        <div className="row g-5">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-8">
            <h1 className="fw-bold mb-4">
              Start Your Design Career With Design Sprint
            </h1>

            <div className="mb-5">
              <h5 className="fw-semibold mb-3">Event Details</h5>

              <p className="text-secondary">
                Most realtors and investors are using Social Media
                ineffectively because they don't know what they're doing.
              </p>

              <p className="text-secondary">
                We are a group of professionals who have decided to help
                people making travel experiences whenever they want.
              </p>
            </div>

            {/* KEYPOINTS */}
            <div className="mb-5">
              <div className="d-flex gap-3 mb-3">
                <img src="/assets/icons/ic-check.svg" alt="" />
                <span>Marketing strategy for startup founders</span>
              </div>

              <div className="d-flex gap-3 mb-3">
                <img src="/assets/icons/ic-check.svg" alt="" />
                <span>Learn design sprint from professionals</span>
              </div>

              <div className="d-flex gap-3">
                <img src="/assets/icons/ic-check.svg" alt="" />
                <span>Build better product experiences</span>
              </div>
            </div>

            {/* MAP */}
            <div>
              <h5 className="fw-semibold mb-3">Event Location</h5>

              <div
                className="position-relative overflow-hidden rounded-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src="/assets/images/maps.png"
                  className="img-fluid"
                  alt="Maps"
                />

                <div
                  className={`map-overlay ${
                    isHovered ? "active" : ""
                  }`}
                >
                  <a href="/" className="btn btn-light">
                    View in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top">
              
              <h5 className="fw-semibold">Your Speaker</h5>

              <div className="d-flex align-items-center gap-3 my-4">
                <img
                  src="/assets/images/avatar.png"
                  width="60"
                  alt="Speaker"
                />

                <div>
                  <h6 className="mb-0">Shayna Putri</h6>
                  <small className="text-secondary">
                    Designer
                  </small>
                </div>
              </div>

              <hr />

              <h5 className="fw-semibold">Get Ticket</h5>

              <div className="display-6 fw-bold my-3">
                $2,980
                <span className="fs-6 text-secondary"> /person</span>
              </div>

              <div className="d-flex gap-3 mb-3">
                <img src="/assets/icons/ic-marker.svg" alt="" />
                <span>Gowork, Bandung</span>
              </div>

              <div className="d-flex gap-3 mb-3">
                <img src="/assets/icons/ic-time.svg" alt="" />
                <span>15.00 PM WIB</span>
              </div>

              <div className="d-flex gap-3 mb-4">
                <img src="/assets/icons/ic-calendar.svg" alt="" />
                <span>22 Agustus 2022</span>
              </div>

              <a href="/login" className="btn btn-success w-100 py-3">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SIMILAR EVENTS */}
      <section className="container py-5">
        <div className="mb-5">
          <span className="text-danger fw-semibold">Next One</span>
          <h2 className="fw-bold">Similar Events</h2>
        </div>

        <div className="row g-4">
          {similarEvents.map((event, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                <img
                  src={event.image}
                  className="card-img-top"
                  alt={event.title}
                />

                <div className="card-body">
                  <span className="badge bg-dark mb-3">
                    {event.price}
                  </span>

                  <h5 className="card-title">
                    {event.title}
                  </h5>

                  <p className="text-secondary mb-1">
                    {event.category}
                  </p>

                  <small className="text-muted">
                    {event.date}
                  </small>
                </div>

                <a href="/details" className="stretched-link"></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}