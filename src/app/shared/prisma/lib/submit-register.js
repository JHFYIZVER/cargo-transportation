"use server";
import { signUp } from "./actions";

const onSubmit = async (data) => {
  const res = await signUp(data);
  if (res.success) {
    return {
      ...res,
      shouldRedirect: res.success,
    };
  }
};

export { onSubmit };
