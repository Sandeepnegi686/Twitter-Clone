import React from "react";
import Header from "../_components/Header";
import NotificationsFeed from "../_components/NotificationsFeed";

export default function Page() {
  return (
    <>
      <Header label="Notifications" />
      <NotificationsFeed />
    </>
  );
}
