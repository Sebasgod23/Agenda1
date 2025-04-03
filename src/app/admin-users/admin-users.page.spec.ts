
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsersPage } from './admin-users.page';

describe('AdminUsersPage', () => {
  let component: AdminUsersPage;
  let fixture: ComponentFixture<AdminUsersPage>;

  beforeEach(() => {
    // Configuración del entorno de pruebas
    fixture = TestBed.createComponent(AdminUsersPage);
    component = fixture.componentInstance;
    
    // Detecta cambios iniciales en el componente
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });
});

// Autor: Sebastian Andoney
