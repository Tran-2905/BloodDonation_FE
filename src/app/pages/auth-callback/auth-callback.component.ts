import { Component, OnInit } from '@angular/core';
import { Route } from 'lucide-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../responses/api.response';

@Component({
  selector: 'app-auth-callback',
  imports: [RouterModule, CommonModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {
}
