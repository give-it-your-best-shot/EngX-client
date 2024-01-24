import { useEffect, useState } from "react";
import UserService from "src/services/user_service";
import { useAuthenticationStore } from "src/stores";
import { UserRecord } from "src/types/user_record.type";

interface UserUnitRecordProps {
  unitId: number;
}

export default function UserUnitRecord(props: UserUnitRecordProps) {
  const authStore = useAuthenticationStore();
  const user_service = UserService.getInstance();
  const [records, setRecords] = useState<UserRecord[]>([]);

  useEffect(() => {
    if (authStore.user) {
      user_service.getUnitsRecordByUserId(authStore.user.id).then((records) => {
        if (!records) return [];
        return records;
      });
    }
  }, []);

  return <div className="bg-white rounded-xl w-full h-96 shadow-xl"></div>;
}
