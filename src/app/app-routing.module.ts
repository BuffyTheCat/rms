import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeRoutes } from './modules/home/home.module';
import { ReserarchRoutes } from './modules/reserarch/reserarch.module';
import { ReportsRoutes } from './modules/reports/reports.module';
import { WorkflowRoutes } from './modules/workflow/workflow.module';
import { AnalyticsRoutes } from './modules/analytics/analytics.module';
import { LoginRoutes } from './modules/login/login.module';
import { AuthGuard } from './guards/auth.guard';
import { MultifactorGuard } from './guards/multifactor.guard';
import { ReconciliationRoutes } from './modules/reconciliation/reconciliation.module';
import { InsightsRoutes } from './modules/insights/insights.module';
import { DocManagementRoutes } from './modules/doc-management/doc-management.module';
import { AdministrationRoutes } from './modules/administration/administration.module';
import { MatchingRoutes } from './modules/matching/matching.module';
import { ImageViewerRoutes } from './modules/image-viewer/image-viewer.module';
import { CashArcRoutes } from './modules/cash-arc/cash-arc.module';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

const routes: Routes = [
  {
    path: 'home',
    children: HomeRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'cash-arc',
    children: CashArcRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'research',
    children: ReserarchRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'reconciliation',
    children: ReconciliationRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'matching',
    children: MatchingRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'reports',
    children: ReportsRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'insights',
    children: InsightsRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'workflow',
    children: WorkflowRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'doc-management',
    children: DocManagementRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'analytics',
    children: AnalyticsRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'administration',
    children: AdministrationRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'login',
    children: LoginRoutes,
  },
  {
    path: 'image-viewer',
    children: ImageViewerRoutes,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
