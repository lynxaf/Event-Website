import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { config } from '../../configs';

export default function Activate() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || '',
    otp: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!form.email.trim() || !form.otp.trim()) {
      setErrorMessage('Email dan kode OTP wajib diisi.');
      return;
    }

    if (!/^\d{4}$/.test(form.otp.trim())) {
      setErrorMessage('Kode OTP harus terdiri dari 4 angka.');
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(`${config.apiUrl}/api/v1/active`, {
        email: form.email.trim().toLowerCase(),
        otp: form.otp.trim(),
      });

      setSuccessMessage('Akun berhasil diaktivasi. Silakan login.');
      setTimeout(() => navigate('/login', { replace: true }), 1000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          'Aktivasi gagal. Periksa kembali email dan kode OTP.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login header bg-navy min-vh-100 d-flex flex-column">
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <form className="form-login d-flex flex-column" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <h3 className="hero-headline text-start mb-4">Activate Account</h3>

          <div className="d-flex flex-column align-items-start mb-3">
            <label htmlFor="email_address" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_address"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex flex-column align-items-start mb-4">
            <label htmlFor="otp" className="form-label">
              OTP (4 digits)
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="form-control"
              value={form.otp}
              onChange={handleChange}
              maxLength={4}
              required
            />
          </div>

          <div className="d-grid gap-3">
            <button type="submit" className="btn-green" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Activate'}
            </button>
            <Link to="/login" className="btn-navy text-center">
              Back to Sign In
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
}
