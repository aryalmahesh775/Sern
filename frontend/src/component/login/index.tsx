import { useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { postRequest } from "../../services/http.service";
import { notify, setToken } from "../../helpers/functions";

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const PasswordViewIcon = seePassword ? FaEyeSlash : FaEye;
  let navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("No Email provided."),
    password: Yup.string().required("No password provided."),
  });
  const handleSeePassword = () => setSeePassword(!seePassword);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        // onSubmit={async (values, { setSubmitting, setFieldError }) => {
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setLoadingLogin(true);
            let response = await postRequest<any>("/user/login", values);
            console.log(response?.data?.message);
            if (response) {
              setToken(response.data.result.token);
              setLoadingLogin(false);
              console.log(response)
              notify(response?.data?.message);
              navigate("/");
            }
            setSubmitting(false);
          } catch (error: any) {
            setLoadingLogin(false);
          }
        }}
      >
        {(props:any) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit,
          } = props;

          return (
            <div className="min-h-full flex justify-center items-center md:h-[80vh] lg:h-[100vh] py-20 lg:px-8">
              <div className="max-w-md w-flull space-y-8">
                <div className=" w-[356px] h-[500px] md:w-[500] md:h-[550px] lg:w-[500px] lg:h-[500px] xl:w-[520px] xl:h-[650] p-2 border-[1px]  border-secondery rounded-md shadow-sm">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center md:h-full  items-center "
                  >
                    <div className="flex justify-center mb-5">
                        <span className="">Title</span>
                    </div>

                    <div className="w-[100%] flex justify-center">
                      <input
                        data-cy="username"
                        type="text"
                        name="email"
                        value={values.email}
                        placeholder={`Username / Email`}
                        className={`px-3 py-2 text-text w-[90%] lg:w-[80%] text-base my-2 2xl:my-3 border-[0.5px] border-gray-200 rounded-md focus:outline-gray-300 `}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <em data-cy="error" className="text-red-700 text-xs ">
                        {errors.email}
                      </em>
                    )}

                    <div className="w-[100%] relative flex justify-center">
                      <input
                        data-cy="password"
                        type={seePassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        className="px-3  py-2 w-[90%] text-text lg:w-[80%] text-base my-3 2xl:my-4 border-[0.5px] border-gray-200 rounded-md focus:outline-gray-300"
                        onChange={handleChange}
                      />
                      <PasswordViewIcon
                        onClick={() => handleSeePassword()}
                        className="absolute mt-[28px] text-gray-500 right-6 md:right-6 lg:right-14"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <em data-cy="error" className="text-red-700 text-xs ">
                        {errors.password}
                      </em>
                    )}

                    <div className="">
                      {loadingLogin ? (
                        <>loading</>
                      ) : (
                        <button
                          data-cy="submit"
                          type="submit"
                          disabled={isSubmitting}
                          className=" shadow-2xl hover:border-secondery border-2 hover:border-2 bg-secondery text-sm md:text-base text-gray-500 hover:text-green-700 px-5 md:px-10 py-2 rounded-2xl font-bold hover:bg-white  my-3 xl:my-4 2xl:my-7"
                        >
                          <div className="flex items-center">
                            <span>Login</span>
                            <FaArrowRight className="pl-1  w-8" />{" "}
                          </div>
                        </button>
                      )}
                    </div>

                    <p className="text-gray-400 mt-3">
                      New to light ?{" "}
                      <Link to="/register" className="text-blue-300">
                        register
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
