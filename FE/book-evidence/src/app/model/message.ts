/**
 * Message shown in a simple dialog.
 * 
 * @author Libor Grigerek
 */

export enum MessageType {
    INFO, WARNING, ERROR
}

export enum MessageButton {
    OK, CANCEL, YES, NO
}

export enum MessageButtonGroup {
    OK, CANCEL_OK, YES_NO
}

export interface Message {
    type: MessageType;
    text: string;
    buttonGroup: MessageButtonGroup
    afterClose(clickedButton: MessageButton): void;
}
