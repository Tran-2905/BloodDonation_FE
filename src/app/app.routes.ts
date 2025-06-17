import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BloodTypeComponent } from './pages/blood-type/blood-type.component';
import { Home } from 'lucide-angular';
import { HomeComponent } from './pages/home/home.component';
import { RegisterDonationComponent } from './pages/registerdonation/registerdonation.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '', component: RegisterComponent },
            { path: 'blood-type', component: BloodTypeComponent },
            { path: 'home', component: HomeComponent, data: { title: 'Trang chủ', icon: Home } },
            { path: 'register-donation', component: RegisterDonationComponent },
            { path: 'auth/google/callback', component: AuthCallbackComponent }
        ]
    }
];
