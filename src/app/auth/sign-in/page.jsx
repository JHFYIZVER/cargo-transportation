import SignIn from "@/app/modules/auth/sign-in/sign-in";
import React from "react";

const page = () => {
  return (
    <main className="p-5 max-w-[1440px] w-full mx-auto min-h-screen flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default page;
