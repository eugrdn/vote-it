import React, {useState} from 'react';
import {Form, Modal} from 'semantic-ui-react';
import {useAuth} from '~/hooks/common';

type ModalProps = {
  open: boolean;
  title: React.ReactNode;
  onClose: () => void;
};

export const SignupModal: React.FC<ModalProps> = ({open, title, onClose}) => {
  const [, auth] = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal size="tiny" open={open} onClose={onClose} centered closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Form.Input label="Name" value={name} onChange={e => setName(e.target.value)} />
          <Form.Input
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required
          />
          <Form.Button
            content={title}
            onClick={async () => {
              await auth.signup(email, password, {
                displayName: name,
                polls: {created: [], part: []},
              });
            }}
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export const LoginModal: React.FC<ModalProps> = ({open, title, onClose}) => {
  const [, auth] = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal size="tiny" open={open} onClose={onClose} centered closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Form.Input
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required
          />
          <Form.Button
            content={title}
            onClick={async () => {
              auth.login(email, password);
            }}
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
};
