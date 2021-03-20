import React, { useState, useEffect } from 'react';
import Modal from '../../component/fragment/Modal';
import InputText from '../../component/fragment/Input/InputText';
import { useLocation } from 'react-router-dom';
import queryString from 'querystring';
import moment from 'moment';

export default function ModalEdit({ data, handleSubmit }) {
  const location = useLocation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { add } = queryString.parse(location.search.replace('?', ''));

  useEffect(() => {
    if (data && !add) {
      setName(data.nama_petugas);
      setUsername(data.Username);
      setPhone(data.telp);
    }
  }, [data]);

  const date = () => {
    return moment().format();
  };

  const onSubmit = () => {
    if (add)
      handleSubmit({
        name,
        username,
        phone,
        createAt: date(),
        password,
      });
    else handleSubmit({ name, username, phone });
    setName('');
    setUsername('');
    setPhone('');
    setPassword('');
  };

  return (
    <Modal
      header="Edit Petugas"
      id="editAdmin"
      confirmText="Simpan"
      onClick={() => onSubmit()}
    >
      <form>
        <InputText
          name="name"
          label="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-md-12"
        />

        <InputText
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="col-md-12"
        />

        <InputText
          name="phone"
          label="Nomor Telepon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="col-md-12"
        />
        {add && (
          <InputText
            name="password"
            label="Password"
            className="col-md-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
      </form>
    </Modal>
  );
}
