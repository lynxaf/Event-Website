import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { postData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';

function TalentsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', role: '', file: '', avatar: '' });
  const [alert, setAlert] = useState({ status: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return postData('/cms/images', formData, true);
  };

  const handleChange = async (event) => {
    if (event.target.name !== 'avatar') {
      setForm({ ...form, [event.target.name]: event.target.value });
      return;
    }

    const file = event.target.files?.[0];
    if (!file || !['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      setAlert({ status: true, type: 'danger', message: 'Gunakan gambar JPG atau PNG.' });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setAlert({ status: true, type: 'danger', message: 'Ukuran gambar maksimal 3 MB.' });
      return;
    }

    const response = await uploadImage(file);
    if (!response?.data?.data) {
      setAlert({
        status: true,
        type: 'danger',
        message: response?.response?.data?.msg || 'Gagal mengunggah gambar.',
      });
      return;
    }
    setForm({
      ...form,
      file: response.data.data._id,
      avatar: response.data.data.name,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await postData('/cms/talents', {
      name: form.name.trim(),
      role: form.role.trim(),
      image: form.file,
    });
    setIsLoading(false);

    if (response?.data?.data) {
      dispatch(setNotif(true, 'success', `berhasil tambah speaker ${response.data.data.name}`));
      navigate('/talents');
      return;
    }
    setAlert({
      status: true,
      type: 'danger',
      message: response?.response?.data?.msg || 'Gagal menyimpan speaker.',
    });
  };

  return (
    <Container>
      <Breadcrumb textSecound='Talents' urlSecound='/talents' textThird='Create' />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default TalentsCreate;
