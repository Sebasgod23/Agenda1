/**
 * Pruebas unitarias para la página de inicio (HomePage).
 *
 * Este archivo de prueba verifica que el componente `HomePage` se cree correctamente.
 * Se utiliza el framework de pruebas de Angular (`TestBed`) para inicializar y probar el componente.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    // Configuración del entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [HomePage], // Declaración del componente a probar
      imports: [IonicModule.forRoot()] // Importa el módulo de Ionic para compatibilidad
    }).compileComponents(); // Compila los componentes para las pruebas

    fixture = TestBed.createComponent(HomePage); // Crea la instancia del componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios en el componente
  });

  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });
});

// Autor: Sebastian Andoney
