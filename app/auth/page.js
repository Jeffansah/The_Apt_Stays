import { Login } from "../components/Login";
import { Register } from "../components/Register";

const page = ({ searchParams }) => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex">
        <div className="w-2/3 bg-cover bg-no-repeat bg-center h-full bg-[url(/images/auth.jpg)]" />
        <div className="grid place-items-center flex-grow">
          {searchParams.s === "register" ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default page;
