import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import instance from "@/axios/instance";

interface Patient {
  _id: string;
  name: string;
  phone: string;
  address: string;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
}

const AddPatientPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [patients, setPatients] = useState<Patient[]>([]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await instance.post("/patients", data);
      toast.success("تم اضافة مريض جديد");
      console.log("New patient added:", response.data);
      reset();
      fetchData();
    } catch (error) {
      toast.error("أتأكد من البيانات");
      console.error("Error adding patient:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await instance.get("/patients");
      console.log("API Response:", response.data);
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-full mb-10">
      <div className="lg:m-0 mt-[20rem]">
        <Card className="lg:w-[50rem] w-[20rem]">
          <CardHeader>
            <CardTitle className="text-end">إضافة مريض جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="name" className="flex justify-end">
                  الاسم
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "هذا الحقل مطلوب" })}
                  placeholder="أدخل الاسم"
                  className="text-end"
                />
                {errors.name && (
                  <p className="text-red-500 text-end">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex justify-end">
                  رقم التليفون
                </Label>
                <Input
                  id="phone"
                  {...register("phone", {
                    required: "هذا الحقل مطلوب",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "رقم التليفون غير صالح",
                    },
                  })}
                  placeholder="أدخل رقم التليفون"
                  type="tel"
                  className="text-end"
                />
                {errors.phone && (
                  <p className="text-red-500 text-end">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex justify-end">
                  العنوان
                </Label>
                <Input
                  id="address"
                  {...register("address", { required: "هذا الحقل مطلوب" })}
                  placeholder="أدخل العنوان"
                  className="text-end"
                />
                {errors.address && (
                  <p className="text-red-500 text-end">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-[#000080] hover:bg-[#000090] text-white lg:w-3/12 rounded"
                >
                  إضافة مريض
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <h2 className="text-4xl font-bold mb-4 text-right mt-10">المرضي</h2>
        {patients.map((patient) => (
          <Link
            to={`/patient/${patient._id}`}
            key={patient._id}
            className="text-gray-900 dark:text-gray-50"
          >
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 mt-5 cursor-pointer mb-5">
              <h2 className="text-2xl font-bold mb-4 text-right">
                معلومات الاتصال
              </h2>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                <div className="flex items-center justify-end">
                  <span className="text-gray-900 dark:text-gray-50 font-medium mr-2">
                    {patient.name}
                  </span>
                  <UserIcon className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-gray-900 dark:text-gray-50 mr-2">
                    {patient.address}
                  </span>
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-gray-900 dark:text-gray-50 mr-2">
                    {patient.phone}
                  </span>
                  <PhoneIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AddPatientPage;

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
