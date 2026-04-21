import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../Service/AppointmentService';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private service: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.PayAppointment(id).subscribe({
      next: () => {
        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/appointment']);
        }, 2000);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
