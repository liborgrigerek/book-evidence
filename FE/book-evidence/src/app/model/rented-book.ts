import { Book } from "./book";
import { Entity } from "./entity";
import { Reader } from "./reader";
import { Util } from "./util";

/**
 * RentedBook Entity.
 * 
 * @author Libor Grigerek
 */
export class RentedBook implements Entity {
    book: Book | undefined;
    reader: Reader | undefined;
    rentedWhen: Date;
    rentedUntil: Date;

    /**
     * Full Constructor.
     * @param book        rented book.
     * @param reader      reader who rented a book.
     * @param rentedWhen  when reader rented a book.
     * @param rentedUntil date until reader can have a book borrowed.
     */
    constructor(book: Book | undefined, reader: Reader | undefined, rentedWhen: Date, rentedUntil: Date) {
        this.book = book;
        this.reader = reader;
        this.rentedWhen = rentedWhen;
        this.rentedUntil = rentedUntil;
    }
    
    /**
     * Compares this and other object.
     * @param other   other object.
     * @param colName name of column used for sorting.
     * @param isAsc true if ascending.
     * @returns -1,0,1 for less, equal, greater.
     */
    compareWith(other: RentedBook, colName: string, isAsc: boolean): number {
        switch (colName) {
            case 'bookAuthor': return Util.compare(this?.book?.author?.fullname, other?.book?.author?.fullname, isAsc);
            case 'bookTitle': return Util.compare(this?.book?.title, other?.book?.title, isAsc);
            case 'reader': return Util.compare(this?.reader?.fullname, other?.reader?.fullname, isAsc);
            default: return 0;        
        }
    }

    /**
     * Returns true if this entity is filtered.
     * @param keyword keyword used for filtering.
     */
    filterBy(keyword: string): boolean {
        return [
            this?.book?.author?.firstname,
            this?.book?.author?.lastname,
            this?.book?.title,
            this?.reader?.firstname,
            this?.reader?.lastname,
        ].join(Util.FILTER_SEP).toLowerCase().includes(keyword.toLowerCase());
    }
}
  