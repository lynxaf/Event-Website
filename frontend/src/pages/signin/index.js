import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';
import { config } from '../../configs';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setErrorMessage('Email dan password wajib diisi.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${config.api_host_dev}/cms/signin`, {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      const { token, role, refreshToken } = response.data.data;
      dispatch(userLogin(token, role, refreshToken));
      const destination = location.state?.from || (role ? '/dashboard' : '/');
      navigate(destination, { replace: true });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          'Login gagal. Periksa email dan password Anda.'
      );
    } finally {
      setIsLoading(false);
    }
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
              <Link className="nav-link" to="/#grow-today">Browse</Link>
              <Link className="nav-link" to="/#story">Stories</Link>
              <Link className="nav-link" to="/#about">About</Link>
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
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
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