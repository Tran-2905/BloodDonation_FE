import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { BloodService } from '../../services/blood-service';
import { BloodCapacityResponse, BloodComponentResponse, BloodTypeResponse } from '../../responses/blood.response';
import { BloodComponents } from '../../models/blood.component';

@Component({
  selector: 'app-blood-type',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, FormsModule],
  templateUrl: './blood-type.component.html',
  styleUrls: ['./blood-type.component.scss']
})
export class BloodTypeComponent implements OnInit {
  activeTab: string = 'compatibility';
  compatibilitySubTab: 'whole' | 'components' = 'whole';

  // Dữ liệu từ API
  bloodTypes: BloodTypeResponse[] = [];
  bloodComponents: BloodComponents[] = [];
  bloodCapacity!: BloodCapacityResponse;

  wholeBloodInfo: { type: string; canDonateTo: string[], canReceiveFrom: string[] } = { type: "", canDonateTo: [], canReceiveFrom: [] }
  // Whole Blood
  selectedWholeBloodType: string = '';
  // Component Compatibility
  selectedBloodType: string = '';
  selectedComponent: number | null = null;
  compatibility: { canDonateTo: string[]; canReceiveFrom: string[] } = { canDonateTo: [], canReceiveFrom: [] };

  constructor(private _bloodService: BloodService) { }

  ngOnInit(): void {
    this.fetchAllBloodTypes();
    this.fetchAllBloodComponent();
  }

  fetchAllBloodTypes() {
    this._bloodService.fetchAllBloodTypes().subscribe({
      next: (response: BloodTypeResponse[]) => {
        this.bloodTypes = response;
        if (this.bloodTypes.length) {
          // Whole Blood mặc định
          this.selectedWholeBloodType = this.bloodTypes[0].bloodType;
          this.onWholeBloodTypeChange();
          // Component compatibility mặc định
          this.selectedBloodType = this.bloodTypes[0].bloodType;
        }
      },
      error: (error) => {
        console.error('Error fetching blood types:', error);
      }
    });
  }

  fetchAllBloodComponent() {
    this._bloodService.fetchAllBloodComponent().subscribe({
      next: (data: BloodComponents[]) => {
        this.bloodComponents = data;
        if (this.bloodComponents.length && this.selectedComponent === null) {
          this.selectedComponent = this.bloodComponents[0].id;
          this.onComponentSelectorChange();
        }
      },
      error: (err) => {
        console.error('Error fetching blood components:', err);
      }
    });
  }

  // Khi đổi nhóm máu cho Whole Blood
  onWholeBloodTypeChange() {
    const selected = this.bloodTypes.find(t => t.bloodType === this.selectedWholeBloodType);
    if (selected) {
      this._bloodService.fetchAllBloodCapacity(selected.bloodTypeId, 1).subscribe({
        next: (data: any) => {
          if (data && data.canDonateTo && data.canReceiveFrom) {
            this.wholeBloodInfo = {
              type: data.type,
              canDonateTo: data.canDonateTo,
              canReceiveFrom: data.canReceiveFrom
            };
          } else {
            this.wholeBloodInfo = { type: '', canDonateTo: [], canReceiveFrom: [] };
          }
        },
        error: (err) => {
          console.error(err);
          this.wholeBloodInfo = { type: '', canDonateTo: [], canReceiveFrom: [] };
        }
      });
    }
  }

  // Khi đổi nhóm máu hoặc component cho phần thành phần máu
  onComponentSelectorChange() {
    const selectedType = this.bloodTypes.find(t => t.bloodType === this.selectedBloodType);
    if (selectedType && this.selectedComponent !== null) {
      this._bloodService.fetchAllBloodCapacity(selectedType.bloodTypeId, this.selectedComponent).subscribe({
        next: (data: any) => {
          if (data && data.canDonateTo && data.canReceiveFrom) {
            this.compatibility = {
              canDonateTo: data.canDonateTo,
              canReceiveFrom: data.canReceiveFrom
            };
          } else {
            this.compatibility = { canDonateTo: [], canReceiveFrom: [] };
          }
        },
        error: (err) => {
          console.error(err);
          this.compatibility = { canDonateTo: [], canReceiveFrom: [] };
        }
      });
    }
  }


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