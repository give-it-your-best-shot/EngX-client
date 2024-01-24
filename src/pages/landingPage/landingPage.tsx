import AcmeLogo from "src/Icon/AcmeLogo";
import landingImage from "../../assets/landingImage.jpg";
import pic_1 from "../../assets/pic-1.jpg";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <div className="h-screen pt-0 flex flex-col items-center justify-center overflow-hidden relative mt-14">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img src={landingImage} alt="" className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex flex-col justify-center text-white">
          <div className="pl-20 flex items-center text-6xl">
            <AcmeLogo width={128} height={128} />
            <p className="font-bold text-inherit">EngX</p>
          </div>
          <h1 className="pl-20 text-4xl pt-10 font-bold">
            English for students
          </h1>
          <p className="pl-20 py-10">
            EngX is a website where you can learn with material generated from
            modern AI-based technology. With ChatGPT and Stable Diffusion, the
            content is automatically generated with many different themes. You
            will never get bored.
          </p>

          <div className="d-flex justify-content-between">
            <Link to="/signup" className="ml-20">
              <Button color="primary" className="px-8 py-4 text-lg font-bold">
                Register Now!
              </Button>
            </Link>
            <Link to="/login" className="ml-20">
              <Button color="primary" className="px-8 py-4 text-lg font-bold">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-start py-10 px-16">
        <img
          src={pic_1}
          alt=""
          className="mr-20"
          width={"400px"}
          height={"400px"}
        />
        <div className="py-10">
          <h1 className="text-4xl font-400 relative">
            Test your skill with game
            <span className="absolute bottom-0 left-0 w-full h-2 border-b border-slate-600"></span>
          </h1>
          <p className="pt-10">
            You are challenged against the EngX Bot, who will task you to
            complete the multiple-choice quiz. The quiz vary from many different
            themes so that you will never get bored
          </p>
        </div>
      </div>
    </div>
  );
}
