import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { User, UsersService } from '../../services/users';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  isEditMode = false;
  showModal = false;

  selectedUser: User = this.getEmptyUser();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchusers();
  }

  // =========================
  // FETCH USERS
  // =========================
  fetchusers(): void {
    this.usersService.getUsers().subscribe({
      next: (data: User[]) => {
        // Normalize backend data (IMPORTANT)
        this.users = data.map(u => ({
          id: u.id,
          fullName: u.fullName ?? '',
          email: u.email ?? '',
          password: u.password ?? '',
        }));
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  // =========================
  // HELPERS
  // =========================
  getEmptyUser(): User {
    return {
      id: 0,
      fullName: '',
      email: '',
      password: '',
    };
  }

  get UsersCount(): number {
    return this.users.length;
  }

  // =========================
  // MODAL CONTROLS
  // =========================
  openAddModal(): void {
    this.isEditMode = false;
    this.selectedUser = this.getEmptyUser();
    this.showModal = true;
  }

  openEditModal(user: User): void {
    this.isEditMode = true;
    this.selectedUser = { ...user };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  // =========================
  // SAVE USER
  // =========================
  saveUser(): void {
    if (this.isEditMode) {
      // UPDATE USER
      this.usersService.updateUser(this.selectedUser.id, this.selectedUser)
        .subscribe({
          next: () => {
            // Always re-fetch from backend
            this.fetchusers();
            this.closeModal();
          },
          error: (err) => console.error('Error updating user', err)
        });

    } else {
      // ADD USER
      this.usersService.addUser(this.selectedUser)
        .subscribe({
          next: () => {
            // IMPORTANT: re-fetch instead of pushing response
            this.fetchusers();
            this.closeModal();
          },
          error: (err) => console.error('Error adding user', err)
        });
    }
  }

  // =========================
  // EXPORT
  // =========================
  exportExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users.xlsx');
  }
}

