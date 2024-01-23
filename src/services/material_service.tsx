import http from "src/utils/http";
import { Unit } from "src/types/unit.type";
import { Word } from "src/types/word.type";
import { Book } from "src/types/book.type";
import { error } from "console";

class MaterialService {
  public async createBook(bookData: {
    name: string;
    ownerId?: number;
  }): Promise<Book | null> {
    try {
      const response = await http.post("/materials/books", bookData);
      const data = response.data;
      console.log(response);
      if (data.error) {
        return null;
      }

      return data["payload"];
    } catch (error) {
      console.error("Error creating book:", error);
      return null;
    }
  }

  public async getAllUnitsOfBook(bookId: number): Promise<Unit[] | null> {
    const response = await http.get(`/materials/books/${bookId}/units`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async getAllWordsOfUnit(unitId: number): Promise<Word[] | null> {
    const response = await http.get(`/materials/units/${unitId}/words`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async getAllBooksOfOwner(ownerId: number): Promise<Book[] | null> {
    const response = await http.get(`/materials/owner/${ownerId}/books`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }
}

export default new MaterialService();
