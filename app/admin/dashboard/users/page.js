import React from "react";
import UsersView from "../components/UsersView";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8">
      <UsersView />
    </main>
  );
};

export default page;
