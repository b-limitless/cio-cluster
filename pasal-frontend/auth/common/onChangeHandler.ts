export const onChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: any
) => {
  const { name, value } = e.target;
  dispatch({
    type: "UPDATE_FORM",
    payload: {
      name,
      value: e.target.type === "checkbox" ? e.target.checked : value,
    },
  });
};
