import { verifyAccessCode } from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface IFormInput {
  code: string;
}

function PhoneVerify() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const handleVerify = async (data: IFormInput) => {
    setError("");
    setLoading(true);
    const phoneNumber = localStorage.getItem("phone") ?? "";
    try {
      const res = await verifyAccessCode({ phoneNumber, code: data.code });
      // Lưu vào localStorage
      localStorage.setItem("role", res.data.role);
      // Redirect dashboard
      if (res.data.role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/student");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Mã xác thực sai hoặc hết hạn!");
    }
    setLoading(false);
  };
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

          <form onSubmit={handleSubmit(handleVerify)} className="space-y-4">
            <InputOTP maxLength={6} onChange={(code) => setValue("code", code)}>
              <InputOTPGroup className="flex justify-center">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={loading}>
              Next
            </Button>
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
          </form>

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

export default PhoneVerify;
