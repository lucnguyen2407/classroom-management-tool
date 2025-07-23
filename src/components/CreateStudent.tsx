import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface StudentData {
  studentName: string;
  phoneNumber: string;
  emailAddress: string;
  address?: string;
  dateOfBirth: string;
}

interface CreateStudentModalProps {
  onStudentCreated?: (studentData: StudentData) => void;
}

export default function CreateStudentModal({
  onStudentCreated,
}: CreateStudentModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentData>();

  const onSubmit = async (data: StudentData) => {
    try {
      await axios.post("http://localhost:4000/instructor/addStudent", data);
      if (onStudentCreated) onStudentCreated(data);
      reset();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(
        err?.response?.data?.error || "Có lỗi xảy ra, không thể tạo sinh viên!"
      );
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Create Student
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                {...register("studentName", { required: "Required" })}
                placeholder=""
              />
              {errors.studentName && (
                <span className="text-xs text-red-500">
                  {errors.studentName.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber", { required: "Required" })}
                placeholder=""
              />
              {errors.phoneNumber && (
                <span className="text-xs text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                {...register("emailAddress", { required: "Required" })}
                placeholder=""
              />
              {errors.emailAddress && (
                <span className="text-xs text-red-500">
                  {errors.emailAddress.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth", { required: "Required" })}
                placeholder=""
              />
              {errors.dateOfBirth && (
                <span className="text-xs text-red-500">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} placeholder="" />
          </div>
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8"
              disabled={isSubmitting}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
