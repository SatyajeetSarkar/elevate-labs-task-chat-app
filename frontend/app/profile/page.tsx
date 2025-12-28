"use client";

import { useEffect } from "react";
import { useAuth } from "@/stores/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";

const Page = () => {
  const user = useAuth((state) => state.user);
  const fetchUser = useAuth((state) => state.fetchUser);

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser("694a8a33ef5f9dd44c88373e");
    };

    loadUser();
  }, [fetchUser]);

  const logout = useAuth((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
    {user ? (
      <Card className="w-1/2 max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-3">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl font-semibold">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-xl">{user.username}</CardTitle>

          <Badge variant="outline" className="text-green-600 border-green-600">
            <p className="m-4 font-bold">Online</p>
          </Badge>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Username</span>
            <span className="font-medium">@{user.username}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
        </CardContent>
        <Button className="m-4 w-auto">Edit Profile</Button>
        <Button className="m-4 w-auto" variant="destructive" onClick={handleLogout}>Logout</Button>
      </Card>
    ) : (
      <p className="text-muted-foreground">Loading profile...</p>
    )}
  </div>
  );
};

export default Page;
