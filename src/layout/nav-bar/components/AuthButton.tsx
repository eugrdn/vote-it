import React, {useState} from 'react';
import {Button} from 'semantic-ui-react';
import {LoginModal, SignupModal} from './Modals';
import * as Atoms from '../atoms';
import {MenuItem} from '~/constants';
import {useAuth} from '~/hooks/common';

export const AuthButton: React.FC<MenuItem> = ({
  inverted = false,
  type,
  content,
  auth: authRequired,
  ...item
}: MenuItem) => {
  const [open, setOpen] = useState(false);
  const [, auth] = useAuth();

  switch (type) {
    case 'login':
      return (
        <>
          <Atoms.AuthButton {...item} fitted>
            <Button
              content={content}
              size="tiny"
              onClick={() => setOpen(true)}
              inverted={inverted}
              compact
            />
          </Atoms.AuthButton>
          <LoginModal open={open} title={content} onClose={() => setOpen(false)} />
        </>
      );
    case 'signup':
      return (
        <>
          <Atoms.AuthButton {...item} fitted>
            <Button
              content={content}
              size="tiny"
              onClick={() => setOpen(true)}
              inverted={inverted}
              compact
            />
          </Atoms.AuthButton>
          <SignupModal open={open} title={content} onClose={() => setOpen(false)} />
        </>
      );
    case 'signout':
      return (
        <Atoms.AuthButton {...item} fitted>
          <Button
            content={content}
            size="tiny"
            onClick={() => auth.signout()}
            inverted={inverted}
            compact
          />
        </Atoms.AuthButton>
      );
    default:
      return null;
  }
};
