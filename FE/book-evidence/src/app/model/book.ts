import { Author } from "./author";
import { Entity } from "./entity";
import { Reader } from "./reader";
import { Util } from "./util";

/**
 * Book Entity.
 * 
 * @author Libor Grigerek
 */
export class Book implements Entity {
    id: number | undefined;
    author: Author | undefined;
    title: string;
    releaseYear: number | undefined;
    description: string;
    reader: Reader | undefined;
    rentedWhen: Date | undefined;
    rentedUntil: Date | undefined;

    /**
     * Full Constructor.
     * @param id          book's id.
     * @param title       book's title.
     * @param releaseYear year of release of book.
     * @param description book's description.
     */
    constructor(id: number | undefined, title: string | undefined, releaseYear: number | undefined, description: string | undefined) {
        this.id = id;
        this.title = (title) ? title : '';
        this.releaseYear = releaseYear;
        this.description = (description) ? description : '';
        // short description of a book.
        this.author = undefined;
        this.reader = undefined;
        this.rentedWhen = undefined;
        this.rentedUntil = undefined;
    }
    
    /**
     * Compares this and other object.
     * @param other   other object.
     * @param colName name of column used for sorting.
     * @param isAsc true if ascending.
     * @returns -1,0,1 for less, equal, greater.
     */
    compareWith(other: Book, colName: string, isAsc: boolean): number {
        switch (colName) {
            case 'author': return (this.author && other.author) ? Util.compare(this.author.lastname, other.author.lastname, isAsc) :((this.author) ? -1 : ((other.author) ? 1 : 0));
            case 'title': return Util.compare(this.title, other.title, isAsc);
            case 'description': return Util.compare(this.description, other.description, isAsc);
            case 'releaseYear': return Util.compare(this.releaseYear, other.releaseYear, isAsc);
            case 'id': return Util.compare(this.id, other.id, isAsc);
            default: return 0;        
        }
    }

    /**
     * Book label.
     * @return book label.
     */
    get label() {
        return this.title + ' (' + this.author?.fullname + ')';
    }

    /**
     * Returns true if this entity is filtered.
     * @param keyword keyword used for filtering.
     */
    filterBy(keyword: string): boolean {
        return [
            this.title,
            this.description
        ].join(Util.FILTER_SEP).toLowerCase().includes(keyword.toLowerCase());
    }
}
  