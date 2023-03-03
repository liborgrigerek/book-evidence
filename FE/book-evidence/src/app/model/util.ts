/**
 * Common Utilities.
 * 
 * @author Libor Grigerek
 */
export class Util {
    // separator used between properties in one entity for filtering.
    static FILTER_SEP=',';

    /**
     * Compares two objects.
     * @param a     first object.
     * @param b     second object.
     * @param isAsc true if ascending sort.
     * @returns -1,0,1 for less, equal, greater
     */
    static compare(a: string | number, b: string | number, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
