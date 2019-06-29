import React, {useRef, useState} from 'react';
import {Popup, Ref} from 'semantic-ui-react';
import * as Atoms from './atoms';

type CopyProps = {
  value: string;
  copyText?: string;
  copySuccessText?: string;
  onCopy?(text: string): void;
};

const COPY_COMMAND = 'copy';

export const CopyToBuffer: React.SFC<CopyProps> = ({value, copyText, copySuccessText, onCopy}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  function copyToClipboard(event: any) {
    if (inputRef.current) {
      inputRef.current.select();
    }

    setCopied(document.execCommand(COPY_COMMAND));

    event.target.focus();

    if (onCopy) {
      onCopy(value);
    }
  }

  return (
    <Popup
      position="top center"
      content={copied ? copySuccessText : copyText}
      trigger={
        <div>
          <Ref innerRef={inputRef}>
            <Atoms.CopyInput value={value} onClick={copyToClipboard} />
          </Ref>
        </div>
      }
      inverted
    />
  );
};

CopyToBuffer.defaultProps = {
  copyText: 'Click to copy',
  copySuccessText: 'Copied!',
};
