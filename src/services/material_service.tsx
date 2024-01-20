import http from "src/utils/http";
import { Unit } from "src/types/unit.type";

class MaterialService {
  public async getAllUnitsOfBook(bookId: number): Promise<Unit[] | null> {
    const response = await http.get(`/books/${bookId}/units`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async getUnitById(id: number): Promise<Unit | null> {
    const response = await http.get(`/units/${id}`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }
}

export default new MaterialService();
