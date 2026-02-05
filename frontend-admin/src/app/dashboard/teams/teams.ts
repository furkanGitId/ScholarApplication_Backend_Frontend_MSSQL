import { Component, OnInit } from '@angular/core';
import { TeamMember, TeamMembersService } from '../../services/teams';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  imports: [CommonModule,FormsModule],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class TeamMembersComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  showModal = false;
  isEditMode = false;
  selectedMember: TeamMember = this.getEmptyMember();

  constructor(private teamService: TeamMembersService) { }

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers() {
    this.teamService.getTeamMembers().subscribe({
      next: data => (this.teamMembers = data),
      error: err => console.error('Error loading team members', err),
    });
  }

  getEmptyMember(): TeamMember {
    return {
      id: 0,
      name: '',
      role: '',
      image: '',
    };
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedMember = this.getEmptyMember();
    this.showModal = true;
  }

  openEditModal(member: TeamMember) {
    this.isEditMode = true;
    this.selectedMember = { ...member };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveMember() {
    if (this.isEditMode) {
      this.teamService
        .updateTeamMember(this.selectedMember.id, this.selectedMember)
        .subscribe({
          next: () => {
            const index = this.teamMembers.findIndex(
              m => m.id === this.selectedMember.id
            );
            if (index > -1) {
              this.teamMembers[index] = { ...this.selectedMember };
              this.teamMembers = [...this.teamMembers];
            }
            this.closeModal();
          },
          error: err => console.error('Error updating team member', err),
        });
    } else {
      this.teamService.addTeamMember(this.selectedMember).subscribe({
        next: () => {
          this.loadTeamMembers();
          this.closeModal();
        },
        error: err => console.error('Error adding team member', err),
      });
    }
  }

  deleteMember(id: number) {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    this.teamService.deleteTeamMember(id).subscribe({
      next: () => {
        this.teamMembers = this.teamMembers.filter(m => m.id !== id);
      },
      error: err => console.error('Error deleting team member', err),
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      alert('Only JPG or PNG images are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedMember.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
