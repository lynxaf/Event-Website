import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Login submitted!');
    }, 1500);
  };

  return (
    <div className="login header bg-navy min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="container navbar navbar-expand-lg navbar-dark py-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/assets/images/logo.svg" alt="semina" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto my-3 my-lg-0">
              <Link to="/" className="nav-link">Home</Link>
              <a className="nav-link" href="#">Browse</a>
              <a className="nav-link" href="#">Stories</a>
              <a className="nav-link" href="#">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center hero gap-5 w-100">
          <div>
            <div className="hero-headline text-start">
              Sign In
            </div>
          </div>
          <form className="form-login d-flex flex-column mt-4 mt-md-0" onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-start mb-3">
              <label htmlFor="email_address" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email_address"
                name="email"
                placeholder="semina@bwa.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column align-items-start mb-3">
              <label htmlFor="password" className="form-label">
                Password (6 characters)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Type your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-4">
              <button type="submit" className="btn-green" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
              <Link to="/signup" className="btn-navy">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </Container>

      {/* Brand Partner */}
      <section className="brand-partner pt-0 text-center">
        <p>Events held by top & biggest global companies</p>
        <div>
          <img src="/assets/images/apple-111.svg" alt="apple" />
          <img src="/assets/images/Adobe.svg" alt="adobe" />
          <img src="/assets/images/slack-21.svg" alt="slack" />
          <img src="/assets/images/spotify-11.svg" alt="spotify" />
          <img src="/assets/images/google-2015.svg" alt="google" />
        </div>
      </section>
    </div>
  );
}