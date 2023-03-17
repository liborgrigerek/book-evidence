import { Book } from "src/app/model/book";
import { Reader } from "src/app/model/reader";

/**
 * Dialog data for EditRentedBook component.
 */
export interface EditRentedBookDialogData {
    rentedBook : Book;
    allBooks : Book[];
    allReaders : Reader[];
  }
  
  /**
   * Dialog data for DeleteRentedBook component.
   */
  export interface DeleteRentedBookDialogData {
    rentedBook : Book;
  }
  