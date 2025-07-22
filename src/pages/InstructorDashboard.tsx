import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Search, Plus } from "lucide-react";
import { useState } from "react";
import CreateStudentModal from "@/components/CreateStudent";

function InstructorDashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1", email: "123@gmail.com", status: "Active" },
    { id: 2, name: "Student 2", email: "123@gmail.com", status: "Active" },
    { id: 3, name: "Student 3", email: "123@gmail.com", status: "Active" },
    { id: 4, name: "Student 4", email: "123@gmail.com", status: "Active" },
  ]);

  const handleStudentCreated = (studentData: any) => {
    // Add the new student to the list
    const newStudent = {
      id: students.length + 1,
      name: studentData.studentName,
      email: studentData.emailAddress,
      status: "Active",
    };
    setStudents((prev: any) => [...prev, newStudent]);

    // You can also make an API call here to save to backend
    console.log("New student created:", studentData);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="w-32 h-8 bg-gray-300 rounded"></div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-600 bg-blue-50 hover:bg-blue-100">
              Manage Students
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600">
              Manage Lessons
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600">
              Message
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
              Manage Students
            </h1>

            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {students.length} Students
              </h2>
              <div className="flex items-center gap-4">
                <CreateStudentModal onStudentCreated={handleStudentCreated} />
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Filter" className="pl-10 w-48" />
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default InstructorDashboard;
