import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../../../../services/team';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  social: { platform: string; url: string; iconClass: string }[];
}


@Component({
  selector: 'app-team-section',
  imports: [CommonModule],
  templateUrl: './team-section.html',
  styleUrl: './team-section.css',
})

export class TeamSectionComponent {
  teamMembers: TeamMember[] = [];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeam().subscribe(data => {
      this.teamMembers = data;
    });
  }
}
