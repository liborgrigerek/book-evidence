import { Book } from "src/app/model/book";
import { Reader } from "src/app/model/reader";
import { RentedBook } from "src/app/model/rented-book";

/**
 * Dialog data for EditRentedBook component.
 */
export interface EditRentedBookDialogData {
    rentedBook : RentedBook;
    allBooks : Book[];
    allReaders : Reader[];
  }
  
  /**
   * Dialog data for DeleteRentedBook component.
   */
  export interface DeleteRentedBookDialogData {
    rentedBook : RentedBook;
  }
  