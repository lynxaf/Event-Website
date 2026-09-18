import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { config } from '../../configs';

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      return 'First name, last name, email, dan password wajib diisi.';
    }

    if (form.firstName.trim().length < 3) {
      return 'First name minimal terdiri dari 3 karakter.';
    }

    if (form.password.length < 6) {
      return 'Password minimal terdiri dari 6 karakter.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const validationMessage = validateForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${config.apiUrl}/api/v1/auth/signup`, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role.trim(),
      });

      setSuccessMessage(
        'Registrasi berhasil. Silakan cek email untuk kode aktivasi akun.'
      );

      setTimeout(() => {
        navigate('/activate', {
          replace: true,
          state: {
            email: form.email.trim().toLowerCase(),
          },
        });
      }, 1200);
    } catch (error) {
      console.error('Signup error:', error);

      if (error.response) {
        const responseData = error.response.data;

        setErrorMessage(
          responseData?.message ||
            responseData?.msg ||
            'Registrasi gagal. Periksa kembali data yang dimasukkan.'
        );
      } else if (error.request) {
        setErrorMessage(
          'Backend tidak dapat dihubungi. Pastikan server backend sedang berjalan.'
        );
      } else {
        setErrorMessage(
          'Terjadi kesalahan saat mengirim data registrasi.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login header bg-navy min-vh-100 d-flex flex-column">
      <nav className="container navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/assets/images/logo.svg" alt="Semina" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto my-3 my-lg-0">
              <Link to="/" className="nav-link">
                Home
              </Link>

              <Link to="/" className="nav-link">
                Browse
              </Link>

              <Link to="/" className="nav-link">
                Stories
              </Link>

              <Link to="/" className="nav-link">
                About
              </Link>
            </div>

            <div className="d-grid">
              <Link to="/login" className="btn-navy">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Container className="flex-grow-1 d-flex align-items-center">
        <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero g-5 w-100">
          <div className="col-md-6 text-start">
            <div className="hero-headline">
              Expand Your <br className="d-none d-md-block" />
              Knowledge & Skills
            </div>

            <p className="hero-paragraph text-start">
              Kami menyediakan berbagai acara terbaik untuk membantu{' '}
              <br className="d-none d-lg-block" />
              anda dalam meningkatkan skills di bidang teknologi.
            </p>
          </div>

          <div className="col-md-6">
            <form
              className="form-login d-flex flex-column mt-4 mt-md-0"
              onSubmit={handleSubmit}
              noValidate
            >
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

              <div className="d-flex flex-column align-items-start mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>

                <input
                  type="text"
                  id="first_name"
                  name="firstName"
                  placeholder="First name here"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                  minLength={3}
                  required
                />
              </div>

              <div className="d-flex flex-column align-items-start mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>

                <input
                  type="text"
                  id="last_name"
                  name="lastName"
                  placeholder="Last name here"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex flex-column align-items-start mb-3">
                <label htmlFor="email_address" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  id="email_address"
                  name="email"
                  placeholder="semina@bwa.com"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="d-flex flex-column align-items-start mb-3">
                <label htmlFor="password" className="form-label">
                  Password minimal 6 karakter
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type your password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <div className="d-flex flex-column align-items-start mb-4">
                <label htmlFor="role" className="form-label">
                  Occupation
                </label>

                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="ex: Product Designer"
                  className="form-control"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn-green"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      <section className="brand-partner pt-0 text-center">
        <p>Events held by top & biggest global companies</p>

        <div>
          <img src="/assets/images/apple-111.svg" alt="Apple" />
          <img src="/assets/images/Adobe.svg" alt="Adobe" />
          <img src="/assets/images/slack-21.svg" alt="Slack" />
          <img src="/assets/images/spotify-11.svg" alt="Spotify" />
          <img src="/assets/images/google-2015.svg" alt="Google" />
        </div>
      </section>
    </div>
  );
}