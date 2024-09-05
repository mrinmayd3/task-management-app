import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import {
  LogInFormSchemaType,
  logInFormSchema,
} from "../schemas/loginFormSchema";
import { logIn } from "../api";
import { useAuth } from "../contexts/AuthContext";

import SubmitBtn from "../components/SubmitBtn";

export default function Login() {
  const navigate = useNavigate();
  const { updateToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LogInFormSchemaType>({
    resolver: zodResolver(logInFormSchema),
  });

  // login form submit handler
  const onSubmitHandler: SubmitHandler<LogInFormSchemaType> = async (
    values
  ) => {
    try {
      const { data } = await logIn(values);

      if (data.success) {
        toast.success("Successfully logged in", {
          duration: 3000,
        });
        updateToken(data?.accessToken);
        reset();
        navigate("/", { replace: true });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <section className="h-[60vh] flex justify-center items-center">
      <form
        className="w-[400px] border rounded-md shadow-sm space-y-5 p-10"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-4xl font-extrabold">Log in</h1>

        <div>
          <input
            className="w-full border border-black p-2 rounded-md"
            type="text"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>
        <div>
          <input
            className="w-full border border-black p-2 rounded-md"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        <SubmitBtn
          text="Log in"
          isPending={isSubmitting}
          logo={<PaperAirplaneIcon className="size-6" />}
        />
        <p className="text-gray-600">
          Do not have an account?{" "}
          <Link to={"/register"} className="underline">
            Create one
          </Link>
        </p>
      </form>
    </section>
  );
}
