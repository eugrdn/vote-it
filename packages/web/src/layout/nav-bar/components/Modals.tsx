import React, {useEffect, useState} from 'react';
import {Form, Message, Modal} from 'semantic-ui-react';
import {Error} from '~/core/firebase/FirebaseService';
import {useAuth} from '~/hooks/common';
import {FirebaseValidationError} from '~/core/error';

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
  const [error, setError] = useFirebaseError(email, name, password);
  const formValid = validate(email, password);

  return (
    <Modal size="tiny" open={open} onClose={onClose} centered closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form error={!!error}>
          <Form.Input
            label="Email"
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Form.Input label="Name" value={name} onChange={e => setName(e.target.value)} />
          <Form.Input
            label="Password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Form.Button
            type="submit"
            content="Sign up"
            onClick={async () => {
              try {
                await auth.signup(email, password, {
                  displayName: name,
                });
              } catch (error) {
                setError(error);
              }
            }}
            disabled={!formValid}
          />
          {error && <Message header="Sign up error" content={error.detail} error />}
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export const LoginModal: React.FC<ModalProps> = ({open, title, onClose}) => {
  const [, auth] = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useFirebaseError(email, password);
  const formValid = validate(email, password);

  return (
    <Modal size="tiny" open={open} onClose={onClose} centered closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form error={!!error}>
          <Form.Input
            label="Email"
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Form.Input
            label="Password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Form.Button
            type="submit"
            content="Log in"
            onClick={async () => {
              try {
                await auth.login(email, password);
              } catch (error) {
                setError(error);
              }
            }}
            disabled={!formValid}
          />
          {error && <Message header="Log in error" content={error.detail} error />}
        </Form>
      </Modal.Content>
    </Modal>
  );
};

function useFirebaseError(
  ...deps: React.DependencyList
): [Maybe<FirebaseValidationError>, (error: Maybe<Error>) => void] {
  const [firebaseError, setFirebaseError] = useState<Maybe<FirebaseValidationError>>();

  function setError(error: Maybe<Error>) {
    setFirebaseError(
      error
        ? new FirebaseValidationError('Authentication error', error.message, error.code)
        : error,
    );
  }

  useEffect(() => {
    if (firebaseError) {
      setError(undefined);
    }
  }, deps);

  return [firebaseError, setError];
}

function validate(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}
