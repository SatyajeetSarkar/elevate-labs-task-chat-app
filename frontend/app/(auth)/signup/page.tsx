"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useAuth } from "@/stores/auth";

type infoType = {
  username: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
};

const page = () => {
  const [info, setInfo] = React.useState<infoType>({
    username: "",
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const register = useAuth((state) => state.register);

  const handleSubmit = async () => {
    await register(info);
    console.log("Signed up successfully");
    window.location.href = "/login";
  };

  return (
    <div>
        <label>Username:</label>
      <Input
        className="border-b-black"
        value={info.username}
        onChange={(e) => setInfo({ ...info, username: e.target.value })}
      />
      <label>Name:</label>
      <Input
        className="border-b-black"
        value={info.name}
        onChange={(e) => setInfo({ ...info, name: e.target.value })}
      />
      <label>Email:</label>
      <Input
        className="border-b-black"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
      />
      <label>Bio:</label>
      <Input
        className="border-b-black"
        value={info.bio}
        onChange={(e) => setInfo({ ...info, bio: e.target.value })}
      />
      <label>Password:</label>
      <Input
        className="border-b-black"
        value={info.password}
        onChange={(e) => setInfo({ ...info, password: e.target.value })}
      />
      <Button onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
};

export default page;
