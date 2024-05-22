import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import instance from "@/axios/instance";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";

interface patient {
  _id: string;
  name: string;
  address: string;
  phone: number;
  notes: string;
}

interface examination {
  _id: string;
  patient: string;
  examinationFee: number;
  paid: number;
  remaining: number;
  action: string;
  date: string;
  nextVisit: string;
  notes: string;
}

const Patient = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<examination>();
  const [patient, setPatient] = useState<patient>();
  const [examinations, setExaminations] = useState<examination[]>();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExam, setCurrentExam] = useState<examination | null>(null);

  useEffect(() => {
    fetchData();
    fetchExaminaions();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get(`/patients/${id}`);
      setPatient(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchExaminaions = async () => {
    try {
      const response = await instance.get(`examinations/patient/${id}/`);
      setExaminations(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const onSubmit: SubmitHandler<examination> = async (data) => {
    console.log(data);

    try {
      if (isEditing && currentExam) {
        await handleUpdate(data);
      } else {
        await instance.post(`/examinations/`, { ...data, patient: id });
      }
      fetchExaminaions();
      reset();
      setShowForm(false);
      toast.success("تمت إضافة الفحص بنجاح!");
    } catch (err) {
      console.error("Error submitting examination data:", err);
    }
  };
  const handleEdit = (exam: examination) => {
    setCurrentExam(exam);
    setIsEditing(true);
    fillFormForEdit(exam);
  };

  const fillFormForEdit = (exam: examination) => {
    reset(exam); // Reset form fields with examination data
  };

  const handleUpdate = async (updatedExamData: Partial<examination>) => {
    try {
      await instance.patch(`examinations/${currentExam?._id}`, updatedExamData);
      fetchExaminaions();
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating examination data:", err);
    }
  };

  const handleDelete = async (examId: string) => {
    try {
      await instance.delete(`examinations/${examId}`);
      setExaminations((prevExaminations) => {
        return prevExaminations?.filter((exam) => exam._id !== examId);
      });
      toast.success("خلاص اتمسح يا دكترة");
    } catch (error) {
      console.error("Error deleting examination:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("ar-EG"); // Adjust the locale based on your preference
  };
  return (
    <>
      {/* Patient information */}
      <div className="bg-white dark:bg-gray-950 rounded shadow-lg p-6 lg:m-20 m-5 border border-[#000080] ">
        <h2 className="text-2xl font-bold mb-4 text-right">معلومات الاتصال</h2>
        <div className="grid grid-cols-1  gap-4">
          <div className="flex items-center justify-end">
            <span className="text-gray-900 dark:text-gray-50 font-medium mr-2">
              {patient?.name}
            </span>
            {/* UserIcon */}
          </div>
          <div className="flex items-center justify-end">
            <span className="text-gray-900 dark:text-gray-50 mr-2">
              {patient?.address}
            </span>
            {/* MapPinIcon */}
          </div>
          <div className="flex items-center justify-end">
            <span className="text-gray-900 dark:text-gray-50 mr-2">
              {patient?.phone}
            </span>
            {/* PhoneIcon */}
          </div>
        </div>
      </div>

      {/* Toggle button for new examination form */}
      <div className="flex justify-center mt-5">
        <Button
          onClick={handleFormToggle}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {showForm ? "إغلاق النموذج" : "إضافة فحص جديد"}
        </Button>
      </div>

      {/* New examination form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-950 rounded shadow-lg p-6 lg:m-20 m-5 border-2  flex items-center justify-center">
          <Card className="lg:w-[50rem] w-[20rem] rounded ">
            <CardHeader>
              <CardTitle className="text-end">إضافة فحص جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="examinationFee" className="flex justify-end">
                    رسوم الفحص
                  </Label>
                  <Input
                    id="examinationFee"
                    // name="examinationFee"
                    type="number"
                    placeholder="أدخل رسوم الفحص"
                    {...register("examinationFee")}
                    className="text-end rounded"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="paid" className="flex justify-end">
                      المبلغ المدفوع
                    </Label>
                    <Input
                      id="paid"
                      placeholder="أدخل المبلغ المدفوع"
                      type="number"
                      {...register("paid")}
                      className="text-end rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="action" className="flex justify-end">
                      الاجراء
                    </Label>
                    <Input
                      id="action"
                      placeholder="أدخل الاجراء"
                      {...register("action")}
                      className="text-end rounded"
                    />
                  </div>
                  <Label htmlFor="date" className="flex justify-end">
                    تاريخ الكشف{" "}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    placeholder="أدخل ميعاد الكشف"
                    {...register("date")}
                    className="rounded"
                  />
                  <Label htmlFor="nextVisit" className="flex justify-end">
                    ميعاد الزيارة القادمة
                  </Label>
                  <Input
                    id="nextVisit"
                    type="date"
                    placeholder="أدخل ميعاد الزيارة القادمة"
                    {...register("nextVisit")}
                    className="rounded"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="flex justify-end">
                      ملاحظات
                    </Label>
                    <textarea
                      id="notes"
                      placeholder="أدخل الملاحظات"
                      {...register("notes")}
                      className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 w-full text-end "
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    className="bg-[#000080] hover:bg-blue-900 text-white rounded lg:w-3/12"
                  >
                    إضافة فحص
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Display all examinations */}
      <div className="mt-5 text-xl">
        <h2 className="text-2xl font-bold mb-4 text-right mr-10">الفحوصات</h2>
        {examinations?.map((exam, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 lg:mx-20 m-5 border-2 border-[#000080] "
          >
            {/* Display examination details */}
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                رسوم الفحص: {exam.examinationFee}
              </span>
              {/* <PhoneIcon className="h-5 w-5 text-gray-500" /> */}
            </div>
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                المبلغ المدفوع: {exam.paid}
              </span>
              {/* <PhoneIcon className="h-5 w-5 text-gray-500" /> */}
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                المبلغ المتبقي: {exam.remaining}
              </span>
              {/* <PhoneIcon className="h-5 w-5 text-gray-500" /> */}
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                الإجراء: {exam.action}
              </span>
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                ملاحظات: {exam.notes === "" ? "لا يوجد" : exam.notes}{" "}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                تاريخ الكشف: {formatDate(exam.date)}{" "}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                موعد الزيارة القادمة:{" "}
                {exam.nextVisit ? formatDate(exam.nextVisit) : "لا يوجد"}
              </span>
            </div>
            {/* Edit/Update buttons */}
            <div className="flex items-center justify-start mt-4">
              <button
                className="text-[#000080] bg-transparent border border-[#000080] px-10 py-3 rounded-md hover:bg-[#000080] hover:text-white mr-2"
                onClick={() => handleEdit(exam)}
              >
                تعديل
              </button>
              <button
                className="text-red-500 bg-transparent border border-red-500 px-10 py-3 rounded-md hover:bg-red-500 hover:text-white"
                onClick={() => handleDelete(exam._id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Patient;

// Include your Icon components here

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
