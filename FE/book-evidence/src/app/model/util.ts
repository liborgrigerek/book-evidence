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
    static compare(a: string | number | undefined, b: string | number | undefined, isAsc: boolean): number {
      if (a && b) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      } else if (a) { 
        return 1;
      } else if (b) {
        return -1;
      } else {
        return 0
      }
    }
}
