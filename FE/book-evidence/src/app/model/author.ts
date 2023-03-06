import { Entity } from "./entity";
import { Util } from "./util";

/**
 * Author Entity.
 * 
 * @author Libor Grigerek
 */
export class Author implements Entity {
    id: number | undefined;
    firstname: string;
    lastname: string;

    /**
     * Full Constructor.
     * @param id        author's id.
     * @param firstname author's firstname.
     * @param lastname  author's lastname.
     */
    constructor(id: number | undefined, firstname: string, lastname: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }
    
    /**
     * Compares this and other object.
     * @param other   other object.
     * @param colName name of column used for sorting.
     * @param isAsc true if ascending.
     * @returns -1,0,1 for less, equal, greater.
     */
    compareWith(other: Author, colName: string, isAsc: boolean): number {
        switch (colName) {
            case 'lastname': return Util.compare(this.lastname, other.lastname, isAsc);
            case 'firstname': return Util.compare(this.firstname, other.firstname, isAsc);
            case 'id': return Util.compare(this.id, other.id, isAsc);
            default: return 0;        
        }
    }

    /**
     * Returns true if this entity is filtered.
     * @param keyword keyword used for filtering.
     */
    filterBy(keyword: string): boolean {
        return (this.firstname + Util.FILTER_SEP + this.lastname).toLowerCase().includes(keyword.toLowerCase());
    }
}
  