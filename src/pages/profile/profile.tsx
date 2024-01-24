import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import UserService from "src/services/user_service";
import { useAuthenticationStore } from "src/stores";
import Chart from "react-apexcharts";
import WinRatioChart from "./win_ratio_chart";
import { UserRecord } from "src/types/user_record.type";

export default function Profile() {
  const user = useAuthenticationStore((state) => state.user);

  const userService = UserService.getInstance();

  const [bookRecords, setBookRecords] = useState<UserRecord[]>();
  const [unitRecords, setUnitRecords] = useState<UserRecord[]>();

  useEffect(() => {
    const start = async () => {
      if (user != null) {
        if (user?.id != null) {
          userService
            .getBooksRecordByUserId(user?.id)
            .then((records) => setBookRecords(records as UserRecord[]));
          userService
            .getUnitsRecordByUserId(user?.id)
            .then((records) => setUnitRecords(records as UserRecord[]));
        }
      }
    };
    start();
  }, [user]);

  const getWinNum = (records: UserRecord[] | undefined) => {
    if (!records) return 0;
    return records.filter((e) => e.score > Math.floor(e.numQuestion / 2))
      .length;
  };

  return (
    <div className="flex items-center pt-40 justify-between w-full gap-16 px-20">
      <div className="flex-1 w-1/3 mx-auto bg-white rounded-2xl px-8 py-6 shadow-lg h-[440px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm font-semibold">
            ID: {user?.id}
          </span>
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
            src={user?.photoURL}
            alt="Avatar Alt Text"
            name="Jonathan Smith"
            showFallback={true}
            className="w-[150px] h-[150px] border-5 border-purple-600"
          />
        </div>

        <div className="mt-2">
          <h2 className="text-slate-800 font-bold text-2xl tracking-wide text-center">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <p className="text-purple-400 font-semibold mt-2.5">Active</p>
        <div className="mt-2">
          <h2 className="text-black font-semibold tracking-wide">
            Email: {user?.email}
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
      <div className="flex flex-col w-2/3 h-[440px] mx-auto bg-white rounded-2xl px-8 py-6 shadow-lg">
        <div className="flex flex-col h-full justify-between">
          <div className="font-semibold text-slate-800 text-xl flex flex-col">
            <div>You have challenged EngX Bot:</div>
            <div className="font-normal">
              -{" "}
              <span className="text-purple-800 font-bold">
                {" "}
                {unitRecords?.length ?? 0}{" "}
              </span>{" "}
              times in Unit game
            </div>
            <div className="font-normal">
              -{" "}
              <span className="text-purple-800 font-bold">
                {" "}
                {bookRecords?.length ?? 0}{" "}
              </span>{" "}
              times in Book game
            </div>
          </div>
          <div className="p-2 flex justify-between">
            {unitRecords && unitRecords.length ? (
              <div>
                <WinRatioChart
                  numWin={getWinNum(unitRecords)}
                  numLose={unitRecords?.length ?? 0 - getWinNum(unitRecords)}
                />
                <div className="font-bold text-center text-xl text-slate-600">
                  Unit Game
                </div>
              </div>
            ) : (
              <></>
            )}
            {bookRecords && bookRecords.length ? (
              <div>
                <WinRatioChart
                  numWin={getWinNum(bookRecords)}
                  numLose={bookRecords?.length ?? 0 - getWinNum(bookRecords)}
                />
                <div className="font-bold text-center text-xl text-slate-600">
                  Book Game
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
