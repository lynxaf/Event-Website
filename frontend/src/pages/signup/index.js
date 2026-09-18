import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi form di sini
  
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
  
      setSuccessMessage(
        'Registrasi berhasil. Anda akan diarahkan ke halaman login.'
      );
  
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1200);
    } catch (error) {
      console.error('Signup error:', error);
  
      let message = 'Registrasi gagal. Silakan coba lagi.';
  
      if (error.response) {
        message =
          error.response.data?.msg ||
          error.response.data?.message ||
          `Server gagal memproses registrasi. Status: ${error.response.status}`;
      } else if (error.request) {
        message =
          'Backend tidak dapat dihubungi. Periksa apakah server backend sedang berjalan dan URL API sudah benar.';
      } else if (error.message) {
        message = error.message;
      }
  
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login header bg-navy min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="container navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/assets/images/logo.svg" alt="semina" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto my-3 my-lg-0">
              <Link to="/" className="nav-link">Home</Link>
              <a className="nav-link" href="#">Browse</a>
              <a className="nav-link" href="#">Stories</a>
              <a className="nav-link" href="#">About</a>
            </div>
            <div className="d-grid">
              <Link to="/login" className="btn-navy">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <Container className="flex-grow-1 d-flex align-items-center">
        <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero g-5 w-100">
          {/* Left Side - Headline */}
          <div className="col-md-6 text-start">
            <div className="hero-headline">
              Expand Your <br className="d-none d-md-block" />
              Knowledge & Skills
            </div>
            <p className="hero-paragraph text-start">
              Kami menyediakan berbagai acara terbaik untuk membantu <br className="d-none d-lg-block" />
              anda dalam meningkatkan skills di bidang teknologi
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="col-md-6">
            <form className="form-login d-flex flex-column mt-4 mt-md-0" onSubmit={handleSubmit}>
              <div className="d-flex flex-column align-items-start mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="firstName"
                  placeholder="First name here"
                  value={form.firstName}
                  onChange={handleChange}
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
                  value={form.lastName}
                  onChange={handleChange}
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
              <div className="d-flex flex-column align-items-start mb-4">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="ex: Product Designer"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn-green" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
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