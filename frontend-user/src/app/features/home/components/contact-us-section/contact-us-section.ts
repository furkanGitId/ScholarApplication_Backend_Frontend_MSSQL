import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsService } from '../../../../services/contact-us';

interface ContactHeading {
  smallTitle: string;
  title: string;
  description: string;
}

interface SpecialOffer {
  title: string;
  offerPercentage: string;
  validityDate: string;
}

@Component({
  selector: 'app-contact-us-section',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us-section.html',
  styleUrl: './contact-us-section.css',
})

export class ContactUsSectionComponent implements OnInit {

  contactForm: FormGroup;
  heading: ContactHeading = {
    smallTitle: '',
    title: '',
    description: ''
  };

  specialOffer: SpecialOffer = {
    title: '',
    offerPercentage: '',
    validityDate: ''
  };

  constructor(private fb: FormBuilder, private contactUsService: ContactUsService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.contactUsService.getContactUsContent().subscribe((data: any) => {

  //     this.heading = {
  //       smallTitle: data.smallTitle,
  //       title: data.title,
  //       description: data.description
  //     };

  //     this.specialOffer = {
  //       title: data.offerTitle,
  //       offerPercentage: data.offerPercentage,
  //       validityDate: new Date(data.validityDate).toLocaleDateString()
  //     };

  //   });
  // }

  ngOnInit(): void {
    this.contactUsService.getContactUsContent().subscribe((data: any) => {

      this.heading = {
        smallTitle: data.smallTitle,
        title: data.title,
        description: data.description
      };

      // Format date as dd-mm-yyyy
      const date = new Date(data.validityDate);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

      this.specialOffer = {
        title: data.offerTitle,
        offerPercentage: data.offerPercentage,
        validityDate: formattedDate
      };

    });
  }


  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const dataToSubmit = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    this.contactUsService.submitContactForm(dataToSubmit).subscribe({
      next: () => {
        alert('Thank you!');
        this.contactForm.reset();
      },
      error: () => {
        alert('Something went wrong. Please try again.');
      }
    });
  }

}

