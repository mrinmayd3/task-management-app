import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import {
  RegisterFormSchemaType,
  registerFormSchema,
} from "../schemas/registerFormSchema";

import { registerHandler } from "../api";
import { useAuth } from "../contexts/AuthContext";
import SubmitBtn from "../components/SubmitBtn";

export default function Register() {
  const navigate = useNavigate();
  const { updateToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmitHandler: SubmitHandler<RegisterFormSchemaType> = async (
    values
  ) => {
    try {
      const { data } = await registerHandler(values);

      if (data.success) {
        toast.success("Account created successfully", {
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
    <section className="flex justify-center">
      <form
        className="w-[400px] border rounded-md shadow-sm space-y-5 p-10"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div>
          <h1 className="text-4xl font-extrabold">Register</h1>
          <p className="text-gray-500">
            Add your valid credential and create a user account
          </p>
        </div>

        <div>
          <input
            className="w-full border border-black p-2 rounded-md"
            type="text"
            placeholder="Enter a user name"
            {...register("username")}
          />
          {errors.username && (
            <small className="text-red-500">{errors.username.message}</small>
          )}
        </div>

        <div>
          <input
            className="w-full border border-black p-2 rounded-md"
            type="email"
            placeholder="Enter a email"
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
            placeholder="Enter a password"
            {...register("password")}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        <SubmitBtn
          text="Register a user"
          isPending={isSubmitting}
          logo={<UserPlusIcon className="size-6" />}
        />
        <p className="text-gray-600">
          Have an account?{" "}
          <Link to={"/login"} className="underline">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
