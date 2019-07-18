import React, {useReducer, useState} from 'react';
import {Form, Icon, Popup} from 'semantic-ui-react';
import * as Atoms from './atoms';
import {Poll} from '~/typings/models';
import {
  createAction,
  createOption,
  initialState,
  optionsReducer,
  OptionActionType,
} from './reducer';
import {uniqueId} from '~/utils';
import {useUser} from '~/hooks/common';

type PollFormProps = {
  poll?: Partial<Poll>;
  onSubmit?(poll: Poll): void;
  readonly?: boolean | 'no-options';
};

const defaultPoll: Partial<Poll> = {
  topic: '',
  description: '',
  private: false,
  author: '',
  views: 0,
};

export const PollForm: React.FC<PollFormProps> = ({poll = defaultPoll, readonly, onSubmit}) => {
  const id = poll.id || uniqueId();
  const [topic, setTopic] = useState(poll.topic);
  const [isPrivate, setPrivate] = useState(poll.private);
  const [description, setDescription] = useState(poll.description);
  const [options, dispatch] = useReducer(optionsReducer, poll.options || initialState);
  const optionsList = Object.values(options);
  const [user] = useUser();

  const optionsLength = optionsList.length;
  const filledOptions = optionsList.filter(v => v.title);
  const optionsReady = filledOptions.length >= 1;
  const pollReady = optionsReady && topic;

  function handleTopicChange(event: any) {
    const value = event.target.value;
    setTopic(value);
  }

  function handleDescriptionChange(event: any) {
    const value = event.target.value;
    setDescription(value);
  }

  function togglePrivateChange() {
    setPrivate(!isPrivate);
  }

  const handleOptionChange = (id: string) => (event: any) => {
    const title = event.target.value;
    dispatch(createAction(OptionActionType.Update, {id, title}));
  };

  function handleOptionAdd() {
    dispatch(createAction(OptionActionType.Add, createOption(uniqueId())));
  }

  const handleOptionRemove = (id: string) => () =>
    dispatch(createAction(OptionActionType.Remove, id));

  function createPoll() {
    if (pollReady && onSubmit) {
      onSubmit(({
        id,
        topic,
        options,
        author: defaultPoll.views || (user && user.id),
        description,
        private: isPrivate,
        views: defaultPoll.views,
      } as unknown) as Poll);
    }
  }

  return (
    <Form size="large">
      <Form.Input
        label="Topic"
        value={topic}
        onChange={handleTopicChange}
        readOnly={readonly}
        required={!readonly}
      />

      <Form.TextArea
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        readOnly={readonly}
      />

      {readonly !== 'no-options' && (
        <>
          <Form.Field label="Vote variants:" required={!readonly} />
          {optionsList.map(({id, title}, index) => (
            <Form.Group key={id} unstackable inline>
              <Form.Input
                placeholder={`Option ${index + 1}`}
                value={title}
                onChange={handleOptionChange(id)}
                required={!optionsReady || !title}
                readOnly={readonly}
                width={readonly ? 16 : 14}
              />
              {!readonly && (
                <Atoms.RemoveButton onClick={handleOptionRemove(id)} disabled={optionsLength < 2} />
              )}
            </Form.Group>
          ))}
        </>
      )}

      {!readonly && <Form.Field content={<Atoms.AddButton onClick={handleOptionAdd} />} />}

      <Atoms.PrivateGroupField>
        <Form.Checkbox
          label={isPrivate ? 'Private' : 'Public'}
          checked={isPrivate}
          onChange={togglePrivateChange}
          readOnly={!!readonly}
          toggle
        />
        <Popup
          position="top center"
          content={
            readonly
              ? 'The poll is available at Polls page and other people can vote it'
              : 'By making a poll public you allow other people to vote it and see at Polls page'
          }
          trigger={<Icon name="question circle" />}
          inverted
        />
      </Atoms.PrivateGroupField>

      {!readonly && (
        <Form.Button type="submit" content="Create Poll" onClick={createPoll} primary />
      )}
    </Form>
  );
};
