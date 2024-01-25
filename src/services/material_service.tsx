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

  public async createUnit(unitData: {
    name: string;
    bookId: number;
  }): Promise<Unit | null> {
    return http
      .post("/materials/units", unitData)
      .then((res) => (res.data.error ? null : res.data.payload));
  }

  public async createWord(wordData: {
    writing: string;
    meaning: string;
    unitId: number;
  }): Promise<Word | null> {
    return http
      .post("/materials/words", wordData)
      .then((res) => (res.data.error ? null : res.data.payload));
  }

  public async getAllUnitsOfBook(bookId: number): Promise<Unit[] | null> {
    const response = await http.get(`/materials/books/${bookId}/units`);
    const data = response.data;
    if (data.error) return null;
    return data["payload"];
  }

  public async getAllWordsOfUnit(unitId: number): Promise<Word[] | null> {
    const response = await http.get(`/materials/units/${unitId}/words`);
    const data = response.data;
    if (data.error) return null;
    return data["payload"];
  }

  public async getAllBooksOfOwner(ownerId: number): Promise<Book[] | null> {
    const response = await http.get(`/materials/owner/${ownerId}/books`);
    const data = response.data;
    if (data.error) return null;
    return data["payload"];
  }
  public async getAllBooksOfAdmin(): Promise<Book[] | null> {
    const response = await http.get(`/materials/books/public`);
    const data = response.data;
    if (data.error) return null;
    return data["payload"];
  }
  public async findAllBooksByNameTyping(name: string): Promise<Book[] | null> {
    const response = await http.get(`/materials/books/search`, {
      params: {
        name,
      },
    });
    const data = response.data;
    if (data.error) return null;
    return data["payload"];
  }

  public async getBookById(bookId: number): Promise<Book | null> {
    return http
      .get(`/materials/books/${bookId}`)
      .then((response) => (response.data.error ? null : response.data.payload));
  }

  public async getUnitById(unitId: number): Promise<Unit | null> {
    return http
      .get(`/materials/units/${unitId}`)
      .then((response) => (response.data.error ? null : response.data.payload));
  }
}

export default new MaterialService();
