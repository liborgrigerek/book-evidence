import { Author } from "src/app/model/author";
import { Book } from "src/app/model/book";

/**
 * Dialog data for EditBook component.
 */
export interface EditBookDialogData {
    book : Book;
    allAuthors: Author[];
  }
  
  /**
   * Dialog data for DeleteBook component.
   */
  export interface DeleteBookDialogData {
    book: Book;
  }
  