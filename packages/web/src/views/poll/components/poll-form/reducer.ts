import {Action} from '~/typings/common';
import {Option, Options} from '~/typings/models';
import {uniqueId} from '~/utils';

export enum OptionActionType {
  Add = 'add_option',
  Update = 'update_option',
  Remove = 'remove_option',
}

export const createOption = (id: string): Option => ({id, title: '', votes: 0});

export const createAction = (type: OptionActionType, payload: any) => ({type, payload});

const defaultOptionId = uniqueId();

export const initialState: Options = {
  [defaultOptionId]: createOption(defaultOptionId),
};

export const optionsReducer = (state: Options, action: Action<OptionActionType, any>) => {
  switch (action.type) {
    case OptionActionType.Add:
      return {
        ...state,
        [action.payload.id]: {...action.payload},
      };
    case OptionActionType.Update:
      const {id, title} = action.payload;
      return {
        ...state,
        [id]: {...state[id], title},
      };
    case OptionActionType.Remove:
      const {[action.payload]: _, ...rest} = state;
      return rest;
    default:
      return state;
  }
};
