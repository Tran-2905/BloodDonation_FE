import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Droplet, Users, Clock, AlertCircle } from 'lucide-angular';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-blood-type',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './blood-type.component.html',
  styleUrls: ['./blood-type.component.scss']
})
export class BloodTypeComponent implements OnInit {

  bloodTypes: any[] = [];
  compatibilityChart: any[] = [];
  bloodFacts: any[] = [];
  vietnamBloodStats: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBloodTypes().subscribe(data => {
      this.bloodTypes = data;
    });
    this.compatibilityChart = this.dataService.getCompatibilityChart();
  }

  loadData() {
    this.dataService.getBloodTypes().subscribe(data => {
      this.bloodTypes = data;
    });
    this.compatibilityChart = this.dataService.getCompatibilityChart();
    this.bloodFacts = this.dataService.getBloodFacts();
    this.vietnamBloodStats = this.dataService.getVietnamBloodStats();
  }



}
