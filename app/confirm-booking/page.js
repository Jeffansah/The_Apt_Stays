import CartStayProduct from "@/app/components/CartStayProduct";
import Navbar from "@/app/components/Navbar";
import CartStayView from "../components/CartStayView";
import Checkout from "../components/Checkout";
import SubscribeView from "../components/SubscribeView";
import Footer from "../components/Footer";

const page = async () => {
  let data = null;
  try {
    const res = await fetch("https://misty-plum-hare.cyclic.app/api/cart", {
      cache: "no-store",
    });
    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="overflow-x-hidden relative">
      <div className="h-[600px] max-md:h-[400px] bg-[url(/images/auth3.jpg)] bg-no-repeat bg-center bg-cover relative flex flex-col ">
        <div className="absolute w-full h-full bg-black/40 z-2" />
        <Navbar />
        <div className="flex flex-grow items-center justify-center px-7">
          <p className="heading-text max-md:text-center max-md:text-5xl text-white text-7xl z-5 relative">
            Confirm Booking
          </p>
        </div>
      </div>
      <div className="flex gap-14 pt-20 pb-56 boxed">
        {data && <CartStayView data={data} />}
        {data && <Checkout data={data} />}
      </div>
      <SubscribeView />
      <Footer />
    </div>
  );
};

export default page;
