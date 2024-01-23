import { Avatar } from "@nextui-org/react";
import { useEffect } from "react";
import UserService from "src/services/user_service";
import { useAuthenticationStore } from "src/stores";
import { UserRecord } from "src/types/user_record.type";

export default function Profile() {
  const user = useAuthenticationStore((state) => state.user);

  const userService = UserService.getInstance();

  let bookRecord;
  let unitRecord;

  useEffect(() => {
    const start = async () => {
      if (user != null) {
        if (user?.id != null) {
          bookRecord = await userService.getUnitsRecordByUserId(user.id);
          unitRecord = await userService.getUnitsRecordByUserId(user.id);
          console.log({ bookRecord }, { unitRecord });
        }
      }
    };
    start();
  }, [user]);

  return (
    <div className="flex items-center pt-40 justify-between w-full gap-16 px-20">
      <div className="flex-1 w-1/3 mx-auto bg-white rounded-2xl px-8 py-6 shadow-lg h-[440px]">
        <div className="flex items-center justify-between">
          <span className="text-black text-sm font-bold">ID: {user?.id}</span>
          <span className="text-purple-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-2 w-fit h-fit mx-auto">
          <Avatar
            src="https://static2.vieon.vn/vieplay-image/thumbnail_v4/2022/09/28/bof5oooq_1920x1080-avatar.png"
            alt="Avatar Alt Text"
            name="Jonathan Smith"
            showFallback={true}
            className="w-[120px] h-[120px]"
          />
        </div>

        <div className="mt-2">
          <h2 className="text-black font-extrabold text-2xl tracking-wide uppercase">
            {user?.firstName} <br /> {user?.lastName}
          </h2>
        </div>
        <p className="text-purple-400 font-semibold mt-2.5">Active</p>
        <div className="mt-2">
          <h2 className="text-black font-bold tracking-wide uppercase">
            email: {user?.email}
          </h2>
        </div>
        <div className="h-1 w-full bg-gray-200 mt-4 rounded-full">
          <div className="h-1 rounded-full w-2/5 bg-purple-500"></div>
        </div>
        <div className="mt-3 text-white text-sm">
          <span className="text-black font-semibold">Progress:</span>
          <span>40%</span>
        </div>
      </div>
      <div className="flex w-2/3 h-[440px] mx-auto bg-white rounded-2xl px-8 py-6 shadow-lg"></div>
    </div>
  );
}
