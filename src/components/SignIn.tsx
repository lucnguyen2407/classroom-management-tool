import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";

function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4 flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
            <p className="text-gray-500 text-sm">
              Please enter your phone to sign in
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="tel"
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />

            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={!phoneNumber.trim()}>
              Next
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400">
            passwordless authentication methods
          </p>

          <div className="text-center text-sm">
            <span className="text-gray-500">Don't having account? </span>
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
