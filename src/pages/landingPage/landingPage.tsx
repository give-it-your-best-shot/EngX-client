import React from "react";
import landingImage from "../../assets/landingImage.jpg";
import pic_1 from "../../assets/pic-1.jpg";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <div className="h-screen pt-0 flex flex-col items-center justify-center overflow-hidden relative mt-16">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img src={landingImage} alt="" className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex flex-col justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            version="1.0"
            height="20%"
            width="20%"
            style={{
              pointerEvents: "none",
              display: "inline-block",
              fill: "rgba(250,195,0,1)",
              paddingLeft: "20px",
            }}
          >
            <path d="M29.86 22.698V3.506H2.14v19.192h13.328v2.062l-5.056 2.8.516.933L16 25.683l5.072 2.81.516-.933-5.056-2.8v-2.062H29.86zM3.206 4.572h25.59v17.06H3.205V4.572z"></path>
            <path d="M15.294 15.427l-3.162-4.41-2.116 4.103L6.69 8.407l-2.43 8.965 1.03.28 1.693-6.25 3.014 6.08 2.284-4.427 3.415 4.76 2.948-9.89-1.02-.306zM23.464 9.903c-1.764 0-3.2 1.435-3.2 3.2s1.436 3.198 3.2 3.198c1.763 0 3.198-1.434 3.198-3.198s-1.435-3.2-3.198-3.2zm0 5.332c-1.176 0-2.133-.956-2.133-2.133s.958-2.133 2.134-2.133 2.132.955 2.132 2.132-.956 2.133-2.132 2.133z"></path>
          </svg>
          <h1 className="pl-20 text-4xl pt-10 font-bold">
            English for students
          </h1>
          <p className="pl-20 py-10">
            You are challenged against the EngX Bot, who will task you to
            complete the multiple-choice quiz. The quiz vary from many different
            themes so that you will never get bored
          </p>

          <div className="d-flex justify-content-between">
            <Link to="/signup" className="pl-20">
              <Button color="primary" className="px-8 py-4 text-lg font-bold">
                Register Now!
              </Button>
            </Link>
            <Link to="/login" className="pl-20">
              <Button color="primary" className="px-8 py-4 text-lg font-bold">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-start py-10">
        <img
          src={pic_1}
          alt=""
          className="mr-20"
          width={"400px"}
          height={"400px"}
        />
        <div className="py-10">
          <h1 className="text-4xl font-400 relative">
            Test your skill with EngX game
            <span className="absolute bottom-0 left-0 w-full h-2 border-b border-dashed border-red-700"></span>
          </h1>
          <p className="pt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit animi consequatur molestias fugiat praesentium natus,
            laboriosam neque, vel distinctio ullam architecto delectus alias
            veritatis quod hic voluptas dignissimos tenetur odit accusamus?
            Asperiores iure iste culpa dolorum itaque, ipsam architecto et
            neque. Accusantium unde minus obcaecati impedit, iste doloremque
            harum architecto.
          </p>
        </div>
      </div>
    </div>
  );
}
