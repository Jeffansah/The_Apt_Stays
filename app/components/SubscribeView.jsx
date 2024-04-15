import Subscribe from "./Subscribe";

const SubscribeView = () => {
  return (
    <div className="bg-[url(/images/cta3.jpg)] bg-center bg-cover relative py-24 max-md:px-7">
      <div className="absolute inset-0 w-full h-full bg-black/40 z-2" />
      <div className="relative boxed">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
          <div className="flex flex-col gap-6">
            <p className="text-white text-sm">STAY TUNED WITH APT</p>
            <h1 className="text-white heading-text text-5xl max-md:text-3xl font-light max-w-4xl leading-tight">
              Sign up for our newsletter to receive our news, deals and special
              offers.
            </h1>
          </div>
          <Subscribe />
        </div>
      </div>
    </div>
  );
};

export default SubscribeView;
