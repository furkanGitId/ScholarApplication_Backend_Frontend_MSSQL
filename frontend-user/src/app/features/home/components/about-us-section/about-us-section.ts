import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutUsService } from '../../../../services/about-us';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  open?: boolean;
}

@Component({
  selector: 'app-about-us-section',
  imports: [CommonModule],
  templateUrl: './about-us-section.html',
  styleUrl: './about-us-section.css',
})
export class AboutUsSectionComponent {
  accordionList: AccordionItem[] = [];
  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.aboutUsService.getAboutUs().subscribe(data => {
      this.accordionList = data.map(item => ({
        id: item.accordionKey,
        title: item.title,
        content: item.content,
        open: false   // default UI state
      }));

      // open first item if needed
      if (this.accordionList.length > 0) {
        this.accordionList[0].open = true;
      }
    });
  }
}
