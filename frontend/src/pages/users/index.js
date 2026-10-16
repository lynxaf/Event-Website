import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { getData, postData } from '../../utils/fetch';
import Breadcrumb from '../../components/Breadcrumb';

const initialForm = {
  mode: 'user',
  organizer: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'organizer',
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = async () => {
    const response = await getData('/cms/users');
    if (response?.data?.data) setUsers(response.data.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);
    const endpoint = form.mode === 'organizer' ? '/cms/organizers' : '/cms/users';
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: form.role,
    };
    if (form.mode === 'organizer') payload.organizer = form.organizer.trim();

    const response = await postData(endpoint, payload);
    setIsLoading(false);
    if (!response?.data?.data) {
      setMessage(response?.response?.data?.msg || 'Gagal menyimpan data.');
      return;
    }

    setForm(initialForm);
    setMessage('Data berhasil disimpan.');
    loadUsers();
  };

  return (
    <Container className='mt-3'>
      <Breadcrumb textSecound='Users' />
      {message && <Alert variant={message.startsWith('Data') ? 'success' : 'danger'}>{message}</Alert>}
      <Row className='g-4'>
        <Col lg={5}>
          <Card>
            <Card.Body>
              <Card.Title>Tambah user CMS</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Select
                  className='mb-3'
                  value={form.mode}
                  onChange={(event) => setForm({ ...form, mode: event.target.value })}
                >
                  <option value='user'>User organizer</option>
                  <option value='organizer'>Organizer baru</option>
                </Form.Select>
                {form.mode === 'organizer' && (
                  <Form.Control
                    className='mb-3'
                    placeholder='Nama organizer'
                    value={form.organizer}
                    onChange={(event) => setForm({ ...form, organizer: event.target.value })}
                    required
                  />
                )}
                <Form.Control
                  className='mb-3'
                  placeholder='Nama user'
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
                <Form.Control
                  className='mb-3'
                  type='email'
                  placeholder='Email'
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                />
                {form.mode === 'user' && (
                  <Form.Select
                    className='mb-3'
                    value={form.role}
                    onChange={(event) => setForm({ ...form, role: event.target.value })}
                  >
                    <option value='organizer'>Organizer</option>
                    <option value='admin'>Admin</option>
                  </Form.Select>
                )}
                <Form.Control
                  className='mb-3'
                  type='password'
                  minLength={6}
                  placeholder='Password'
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  required
                />
                <Form.Control
                  className='mb-3'
                  type='password'
                  minLength={6}
                  placeholder='Konfirmasi password'
                  value={form.confirmPassword}
                  onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                  required
                />
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={7}>
          <Card>
            <Card.Body>
              <Card.Title>Daftar user</Card.Title>
              <Table responsive>
                <thead><tr><th>Nama</th><th>Email</th><th>Role</th></tr></thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
