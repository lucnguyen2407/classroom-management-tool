import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createAccessCode } from "@/services/api";

interface IFormInput {
  phoneNumber: string;
  code: string;
}

function SignIn() {
  const [step, setStep] = useState<"phone" | "verify">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>();

  const handleSendCode = async (data: IFormInput) => {
    setError("");
    setLoading(true);
    try {
      await createAccessCode(data.phoneNumber);
      localStorage.setItem("phone", data.phoneNumber);
      setValue("phoneNumber", data.phoneNumber); // Keep phoneNumber when switching steps
      navigate("/verify");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Không gửi được mã xác thực!");
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
          <form onSubmit={handleSubmit(handleSendCode)} className="space-y-4">
            <Input
              type="tel"
              placeholder="Your Phone Number"
              {...register("phoneNumber", { required: true })}
              className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                Vui lòng nhập số điện thoại!
              </p>
            )}
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

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
            <p className="text-gray-500 text-sm">
              Please enter your phone to sign in
            </p>
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
