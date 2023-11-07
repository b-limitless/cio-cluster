export const onChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: any,
  type?: string
) => {
  const { name, value } = e.target;
  dispatch({
    type: !type ? "UPDATE_FORM" : type,
    payload: {
      name,
      value: e.target.type === "checkbox" ? e.target.checked : value,
    },
  });
};
