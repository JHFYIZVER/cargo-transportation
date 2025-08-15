import SignUp from "@/app/modules/auth/sign-up/sign-up";
import React from "react";

const page = () => {
  return (
    <main className="p-5 max-w-[1440px] w-full mx-auto h-screen flex items-center justify-center">
      <SignUp />
    </main>
  );
};

export default page;
