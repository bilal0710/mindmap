import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ProfileService} from "./profile.service";
import {ConfirmationDialogComponent} from "../lib/confirmation-dialog/confirmation-dialog.component";
import {FormControl, NgForm} from "@angular/forms";
import {ChatroomService} from "../chatroom/chatroom.service";
import {UpdateUserMutation} from "../graphql/generated";

@Component({
  selector: 'mindmap-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user !: UpdateUserMutation['updateUser'];

  id!: string;
  email!: string;
  firstname!: string;
  lastname!: string;
  oldPassword!: string;
  newPassword!: string;
  newPasswordRepeat!: string;
  langSelect = new FormControl(this.t.currentLang);
  @ViewChild('f') f !: NgForm

  error!: string;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private chatroomService: ChatroomService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public t: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.chatroomService.whoAmI()
        .subscribe((user) => {
          this.id = user.id;
          this.firstname = user.firstname as string;
          this.lastname = user.lastname as string;
          this.email = user.email as string;
        }));
  }

  handleUpdate() {
    if (this.newPassword !== this.newPasswordRepeat) {
      this.snackBar.open(
        this.t.instant('PROFILES.PASSWORDS_NOT_MATCH'),
        undefined,
        {
          panelClass: 'snackbar-error',
        });
      return;
    }
    this.subscriptions.push(this.profileService.updateUser(
      this.id,
      this.firstname,
      this.lastname,
      this.email,
      this.oldPassword,
      this.newPassword,
      this.newPasswordRepeat,
    ).subscribe(
      {
        next: (data) => {
          if (data) {
            this.f.resetForm();
          }
          this.snackBar.open(
            this.t.instant('PROFILES.PROFILE_UPDATE_SUCCESS'),
            undefined,
            {
              panelClass: 'snackbar-success',
            });
          this.oldPassword = '';
          this.newPassword = '';
          this.newPasswordRepeat = '';
        },
        error: (error) => {
          this.snackBar.open(error.message, undefined, {
            panelClass: 'snackbar-error',
          });
        }
      }));
  }

  handleLanguageChange() {
    if (this.langSelect.value) {
      this.t.use(this.langSelect.value);
      localStorage.setItem('mindmap_lang', this.langSelect.value);
    }
  }

  handleDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'PROFILES.DELETE_USER',
        description: 'PROFILES.DELETE_USER_WARNING',
      },
    });

    dialogRef.afterClosed().subscribe(
      {
        next: (result) => {
          if (result === true) {
            this.subscriptions.push(
              this.profileService.deleteUser(this.id).subscribe((data) => {
                if (data?.deleted) {
                  this.profileService.logout();
                  this.snackBar.open(
                    this.t.instant('PROFILES.PROFILE_DELETE_SUCCESS'),
                    undefined,
                    {
                      panelClass: 'snackbar-success',
                    }
                  );
                  this.router.navigate(['/']);
                }
              })
            );
          }
        },
        error: (error) => {
          this.snackBar.open(error.message, undefined, {
            panelClass: 'snackbar-error',
          });
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
