import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Droplet, Users, Clock, AlertCircle } from 'lucide-angular';
import { DataService } from '../../services/data';
import { FormsModule } from '@angular/forms';
import { BloodService } from '../../services/blood-service';

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

@Component({
  selector: 'app-blood-type',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule,
    FormsModule],
  templateUrl: './blood-type.component.html',
  styleUrls: ['./blood-type.component.scss']
})
export class BloodTypeComponent {
  activeTab: string = 'compatibility';
  compatibilitySubTab: 'whole' | 'components' = 'whole';

  bloodType: BloodType[] = [];
  constructor(private _bloodService: BloodService) { }


  bloodTypes = [
    { type: 'O-' }, { type: 'O+' }, { type: 'A-' }, { type: 'A+' },
    { type: 'B-' }, { type: 'B+' }, { type: 'AB-' }, { type: 'AB+' }
  ];

  compatibilityChart = [
    { type: 'O-', compatibility: [true, true, true, true, true, true, true, true] },
    { type: 'O+', compatibility: [false, true, false, true, false, true, false, true] },
    { type: 'A-', compatibility: [false, false, true, true, false, false, true, true] },
    { type: 'A+', compatibility: [false, false, false, true, false, false, false, true] },
    { type: 'B-', compatibility: [false, false, false, false, true, true, true, true] },
    { type: 'B+', compatibility: [false, false, false, false, false, true, false, true] },
    { type: 'AB-', compatibility: [false, false, false, false, false, false, true, true] },
    { type: 'AB+', compatibility: [false, false, false, false, false, false, false, true] }
  ];

  // Whole blood compatibility logic
  wholeBloodCompatibility: { [key in BloodType]: { canDonateTo: BloodType[]; canReceiveFrom: BloodType[] } } = {
    'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
    'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
    'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
    'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
    'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
    'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
    'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
  };

  // Blood component compatibility logic
  bloodComponents = ['Red Blood Cells', 'Plasma', 'Platelets'];
  selectedBloodType: BloodType = 'A+';
  selectedComponent: string = 'Red Blood Cells';

  bloodCompatibility: { [key in BloodType]: { canDonateTo: BloodType[]; canReceiveFrom: BloodType[] } } = this.wholeBloodCompatibility;

  plasmaCompatibility: { [key in BloodType]: { canDonateTo: BloodType[]; canReceiveFrom: BloodType[] } } = {
    'A+': { canDonateTo: ['A+', 'A-', 'O+', 'O-'], canReceiveFrom: ['A+', 'AB+'] },
    'A-': { canDonateTo: ['A-', 'O-'], canReceiveFrom: ['A+', 'A-', 'AB+', 'AB-'] },
    'B+': { canDonateTo: ['B+', 'B-', 'O+', 'O-'], canReceiveFrom: ['B+', 'AB+'] },
    'B-': { canDonateTo: ['B-', 'O-'], canReceiveFrom: ['B+', 'B-', 'AB+', 'AB-'] },
    'AB+': { canDonateTo: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'], canReceiveFrom: ['AB+'] },
    'AB-': { canDonateTo: ['A-', 'B-', 'O-', 'AB-'], canReceiveFrom: ['AB+', 'AB-'] },
    'O+': { canDonateTo: ['O+', 'O-'], canReceiveFrom: ['O+', 'A+', 'B+', 'AB+'] },
    'O-': { canDonateTo: ['O-'], canReceiveFrom: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] },
  };

  plateletCompatibility: { [key in BloodType]: { canDonateTo: BloodType[]; canReceiveFrom: BloodType[] } } = {
    'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
    'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
    'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
    'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
    'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
    'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
    'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
  };

  get compatibility() {
    switch (this.selectedComponent) {
      case 'Plasma': return this.plasmaCompatibility[this.selectedBloodType];
      case 'Platelets': return this.plateletCompatibility[this.selectedBloodType];
      default: return this.bloodCompatibility[this.selectedBloodType];
    }
  }

  // For Whole Blood tab
  selectedWholeBloodType: BloodType = 'A+';
  get wholeBloodInfo() {
    return this.wholeBloodCompatibility[this.selectedWholeBloodType];
  }

  // Blood type info for tab "Blood Types"
  bloodTypeInfos = [
    {
      type: 'O-',
      description: 'Universal donor. Can donate to all blood types. Most valuable in emergencies.',
      percent: '6.6%',
      fact: 'O- is the safest blood for transfusions to any patient.'
    },
    {
      type: 'O+',
      description: 'Most common blood type. Can donate to all positive blood types.',
      percent: '37.5%',
      fact: 'O+ is in high demand for trauma care.'
    },
    {
      type: 'A-',
      description: 'Can donate to A-, A+, AB-, AB+.',
      percent: '6.3%',
      fact: 'A- is rare and important for A and AB patients.'
    },
    {
      type: 'A+',
      description: 'Can donate to A+ and AB+.',
      percent: '28.3%',
      fact: 'A+ is the second most common blood type.'
    },
    {
      type: 'B-',
      description: 'Can donate to B-, B+, AB-, AB+.',
      percent: '1.5%',
      fact: 'B- is one of the rarest blood types.'
    },
    {
      type: 'B+',
      description: 'Can donate to B+ and AB+.',
      percent: '20.6%',
      fact: 'B+ is common in Asia.'
    },
    {
      type: 'AB-',
      description: 'Can donate to AB-, AB+.',
      percent: '0.6%',
      fact: 'AB- is the rarest blood type.'
    },
    {
      type: 'AB+',
      description: 'Universal recipient. Can receive from all blood types.',
      percent: '1.2%',
      fact: 'AB+ can receive any blood type safely.'
    }
  ];

  // Donation process info
  donationSteps = [
    {
      icon: '📝',
      title: 'Register',
      desc: 'Sign up online or at a blood drive location.'
    },
    {
      icon: '💉',
      title: 'Health Check',
      desc: 'A quick health screening ensures you are eligible to donate.'
    },
    {
      icon: '🩸',
      title: 'Donate Blood',
      desc: 'The donation process takes about 10 minutes.'
    },
    {
      icon: '🍪',
      title: 'Refreshment',
      desc: 'Enjoy snacks and drinks after donating to help your recovery.'
    },
    {
      icon: '❤️',
      title: 'Save Lives',
      desc: 'Your donation helps save up to three lives!'
    }
  ];
}
