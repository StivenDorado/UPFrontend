import React from "react";
import UserProfile from "./UserProfile";
import AppointmentDetails from "./AppointmentDetails";
import ActionButtons from "./ActionButtons";

export default function Component() {
  return (
    <article className="bg-background text-foreground rounded-lg shadow-md overflow-hidden w-full max-w-2xl flex">
      <UserProfile />
      <AppointmentDetails />
      <ActionButtons />
    </article>
  );
}
