import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats: any[] = [];
  benefits: any[] = [];
  process: any[] = [];
  recentDonations: any[] = [];
  testimonials: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stats = this.dataService.getStats();
    this.benefits = this.dataService.getBenefits();
    this.process = this.dataService.getDonationProcess();
    this.recentDonations = this.dataService.getRecentDonations();
    this.testimonials = this.dataService.getTestimonials();
  }
}