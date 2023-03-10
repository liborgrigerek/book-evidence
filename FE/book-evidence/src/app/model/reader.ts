import { Entity } from "./entity";
import { Util } from "./util";

/**
 * Reader Entity.
 * 
 * @author Libor Grigerek
 */
export class Reader implements Entity {
    id: number | undefined;
    firstname: string;
    lastname: string;
    street: string;
    city: string;
    zipCode: string;
    fullname: string;

    /**
     * Full Constructor.
     * @param id        reader's id.
     * @param firstname reader's firstname.
     * @param lastname  reader's lastname.
     * @param street    street.
     * @param city      city.
     * @param zipCode   zip code.
     */
    constructor(id: number | undefined, firstname: string, lastname: string, street: string, city: string, zipCode: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
        this.fullname = this.firstname + ' ' + this.lastname;
    }
    
    /**
     * Compares this and other object.
     * @param other   other object.
     * @param colName name of column used for sorting.
     * @param isAsc true if ascending.
     * @returns -1,0,1 for less, equal, greater.
     */
    compareWith(other: Reader, colName: string, isAsc: boolean): number {
        switch (colName) {
            case 'id': return Util.compare(this.id, other.id, isAsc);
            case 'firstname': return Util.compare(this.firstname, other.firstname, isAsc);
            case 'lastname': return Util.compare(this.lastname, other.lastname, isAsc);
            case 'street': return Util.compare(this.street, other.street, isAsc);
            case 'city': return Util.compare(this.city, other.city, isAsc);
            case 'zipCode': return Util.compare(this.zipCode, other.zipCode, isAsc);
            default: return 0;        
        }
    }

    /**
     * Returns true if this entity is filtered.
     * @param keyword keyword used for filtering.
     */
    filterBy(keyword: string): boolean {
        return [this.firstname, this.lastname, this.street, this.city, this.zipCode].join(Util.FILTER_SEP).toLowerCase().includes(keyword.toLowerCase());
    }
}
  