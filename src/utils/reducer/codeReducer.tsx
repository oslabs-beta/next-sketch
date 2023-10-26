// Define the type for the state
interface State {
  componentName: string;
}

// Define the type for actions
type Action = {
  type: 'UPDATE_COMPONENT';
  payload: string;
};

export const initialState = {
  componentName: '',
};

const codeReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  console.log(payload);

  let newPayload: string = payload;

  switch (type) {
    case 'UPDATE_COMPONENT':
      // console.log('UPDATE_COMPONENT', payload);
      // if (payload === undefined) return;
      // //Check if it has end .tsx
      // if (newPayload.slice(-4) === '.tsx') {
      //   newPayload = newPayload.slice(0, -4);
      // }
      // // Capitalize the component name
      // newPayload = newPayload.charAt(0).toUpperCase() + newPayload.slice(1);
      // console.log('modified payload', newPayload);
      return {
        ...state,
        componentName: payload,
      };
    default:
      throw new Error(`No case for type ${type}`);
  }
};

export default codeReducer;
