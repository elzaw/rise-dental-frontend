import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RiseDentalLogo from "@/assets/Logo.svg";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import instance from "@/axios/instance";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated);

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await instance.post("/doctors/login", data);
      toast.success("تم تسجيل الدخول بنجاح");
      login(response.data);
      navigate("/");

      reset();
    } catch (error) {
      toast.error("تأكد من البيانات المدخلة");
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center h-48">
          {/* <MountainIcon className="h-10 w-10 text-gray-900 dark:text-gray-50" /> */}
          <img src={RiseDentalLogo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="rounded bg-white">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">مرحبا بك</CardTitle>
              <CardDescription>أدخل بياناتك للوصول إلى حسابك.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-end">
              <div className="space-y-2 ">
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  {...register("username", { required: true })}
                  placeholder="أدخل اسم المستخدم الخاص بك"
                  type="text"
                  className="text-end rounded"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="أدخل كلمة المرور الخاصة بك"
                  type="password"
                  className="text-end rounded"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-6/12 bg-[#000080] text-white hover:bg-[#000095] rounded">
                تسجيل الدخول
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
