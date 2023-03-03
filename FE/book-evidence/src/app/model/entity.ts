/**
 * Methods defined for each entity.
 * 
 * @author Libor Grigerek
 */
export interface Entity {
    // methods
    compareWith(other: Entity, colName: string, isAsc: boolean): number;
    filterBy(keyword: string): boolean;
}
