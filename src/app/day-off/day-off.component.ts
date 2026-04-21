import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DayOffService } from '../Service/DayOffService';
import { DayOff } from '../Model/DayOff';

@Component({
  selector: 'app-day-off',
  templateUrl: './day-off.component.html',
  styleUrls: ['./day-off.component.css']
})
export class DayOffComponent implements OnInit {

  calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin, interactionPlugin]
  };

  dayOffs: any[] = [];
  doctorId!: number;
  newDateString!: string;
  selectedDate!: Date;
  selectedEvent: any;
  showAddPopup = false;
  showEditPopup = false;

  isLoading = false;

  constructor(private service: DayOffService) {}

  ngOnInit(): void {
    this.doctorId = Number(localStorage.getItem('id'));
    this.loadDayOffs();
  }

  loadDayOffs() {
    this.service.retrieveAllDaysByDoctor(this.doctorId).subscribe(res => {

      this.dayOffs = res.map(d => ({
        id: d.id,
        title: 'Jour congé',
        date: new Date(d.dateOff),
        backgroundColor: '#0a2241', 
        borderColor: '#0a2241',
        color: 'black'
      }));

      this.initCalendar();
    });
  }

  initCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',

      events: this.dayOffs,

      eventDisplay: 'block', 

      dateClick: (arg: DateClickArg) => {

      const clickedDate = arg.date;

      if (this.isDayOff(clickedDate)) {
        alert("⚠️ Ce jour est déjà pris !");
        return;
      }

      this.selectedDate = clickedDate;
      this.showAddPopup = true;
      },

      eventClick: (arg: EventClickArg) => {
        this.selectedEvent = arg.event;
        this.selectedDate = arg.event.start!;
        this.showEditPopup = true;
      }
    };
  }

  addDayOff() {
    if (!this.selectedDate) return;

    const newDay: Partial<DayOff> = {
      dateOff: this.formatDate(this.selectedDate),
      id: this.doctorId
    };

    this.isLoading = true;

    this.service.AddDayOff(newDay as DayOff).subscribe({
      next: () => {
        this.showAddPopup = false;
        this.loadDayOffs();
        this.isLoading = false;
        location.reload(); 
      },
      error: () => this.isLoading = false
    });
  }

  updateDayOff() {
    if (!this.selectedEvent || !this.newDateString){
        alert("⚠️ Veuillez sélectionner une date valide !");
        return;
    } 

    const updated: any = {
      id: this.selectedEvent.id,
      dateOff: this.formatDate(this.getNewDate())
    };

    this.isLoading = true;

    this.service.UpdateDayOff(updated).subscribe({
      next: () => {
        this.showEditPopup = false;
        this.loadDayOffs();
        this.isLoading = false;
        location.reload(); 
      },
      error: () => this.isLoading = false
    });
  }

  deleteDayOff() {
    if (!this.selectedEvent) return;
    this.isLoading = true;

    this.service.DeleteDayOff(this.selectedEvent.id).subscribe({
      next: () => {
        this.showEditPopup = false;
        location.reload(); 
      },
      error: () => location.reload()
    });
  }

  formatDate(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
}

isDayOff(date: Date): boolean {
  return this.dayOffs.some(d =>
    new Date(d.date).toDateString() === date.toDateString()
  );
}
getNewDate(): Date {
  return new Date(this.newDateString + 'T12:00:00');
}
}