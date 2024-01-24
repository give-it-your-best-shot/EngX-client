import { useEffect, useState } from "react";
import UserService from "src/services/user_service";
import { useAuthenticationStore } from "src/stores";
import { UnitRecord, UserRecord } from "src/types/user_record.type";
import WinRatioChart from "../profile/win_ratio_chart";

interface UserUnitRecordProps {
  unitId: number;
}

export default function UserUnitRecord(props: UserUnitRecordProps) {
  const authStore = useAuthenticationStore();
  const user_service = UserService.getInstance();
  const [records, setRecords] = useState<UserRecord[]>();

  useEffect(() => {
    if (authStore.user) {
      user_service.getUnitsRecordByUserId(authStore.user.id).then((records) => {
        if (!records) return [];
        records = records.filter(
          (r) => (r as UnitRecord).unitId == props.unitId,
        );
        setRecords(records);
      });
    }
  }, []);

  const getWinCount = (records: UserRecord[]) => {
    return records.filter((r) => r.passed).length;
  };

  return (
    <div className="bg-white rounded-xl w-full h-96 shadow-xl">
      {!records ? (
        <div className="text-4xl flex items-center justify-center font-bold h-full">
          Loading
        </div>
      ) : records.length < 1 ? (
        <div className="text-4xl flex items-center justify-center font-bold h-full">
          You haven't play any game of this unit yet.
        </div>
      ) : (
        <div className="flex justify-between items-center h-full">
          <div className="flex flex-col w-1/2 h-80 p-10 gap-5 overflow-y-auto">
            {records.map((e, id) => (
              <div
                className="border-5 border-slate-200 rounded-xl p-2 flex justify-between items-center"
                key={id}
              >
                <span
                  className={`text-lg font-semibold ${e.passed ? "text-green-500" : "text-red-500"}`}
                >
                  {e.passed ? "WIN" : "LOSE"} | Score: {e.score}/{e.numQuestion}
                </span>
                <span className="font-semibold text-slate-400">
                  {e.createdAt}
                </span>
              </div>
            ))}
          </div>
          <WinRatioChart
            numWin={getWinCount(records)}
            numLose={records.length - getWinCount(records)}
          />
        </div>
      )}
    </div>
  );
}
