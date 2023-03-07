import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { Message, MessageButton, MessageButtonGroup, MessageType } from 'src/app/model/message';
import { MessageService } from 'src/app/service/message.service';

/**
 * Message Component.
 * 
 * @author Libor Grigerek
 */
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnDestroy {
  // subscription from MessageService
  private _subscription$: Subscription;

  /**
   * Constructor.
   * @param dialog         MatDialog.
   * @param messageService message service.
   */
  constructor(
    public dialog: MatDialog,
    private messageService: MessageService
  ) {
    // subscribe to Message service to catch all emits
    this._subscription$ = this.messageService.getObservable().subscribe({
      next: (message) => {
        // show message in a dialog
        const dialogRef = this.dialog.open(MessageDialog, {
          data: { message: message}
        });

        // register afterClose callback
        dialogRef.afterClosed().subscribe(clickedButton => message.afterClose(clickedButton));
      }
    });
  }

  ngOnDestroy(): void {
    // unsubscribe
    this._subscription$.unsubscribe();
  }

}

/**
 * Dialog data
 */
interface MessageDialogData {
  message: Message;
}

/**
 * MessageDialog Component.
 * 
 * @author Libor Grigerek
 */
@Component({
    selector: 'message-dialog',
    templateUrl: 'message-dialog.html'
  })
export class MessageDialog {
  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) { }

  getTitle(): string {
    switch(this.data.message.type) {
      case MessageType.INFO: {
        return "Information";
      }
      case MessageType.WARNING: {
        return "Warning";
      }
      case MessageType.ERROR: {
        return "Error"
      }
      default: {
        return "Common Type";
      }
    }
  }

  okMessageGroup(): boolean {
    return this.data.message.buttonGroup === MessageButtonGroup.OK;
  }

  cancelOkMessageGroup(): boolean {
    return this.data.message.buttonGroup === MessageButtonGroup.CANCEL_OK;
  }

  yesNoMessageGroup(): boolean {
    return this.data.message.buttonGroup === MessageButtonGroup.YES_NO;
  }

  ok(): MessageButton {
    return MessageButton.OK;
  }

  cancel(): MessageButton {
    return MessageButton.CANCEL;
  }

  yes(): MessageButton {
    return MessageButton.YES;
  }

  no(): MessageButton {
    return MessageButton.NO;
  }
}  