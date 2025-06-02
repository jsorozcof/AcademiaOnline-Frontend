import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstidiantesComponent } from './editar-estidiantes.component';

describe('EditarEstidiantesComponent', () => {
  let component: EditarEstidiantesComponent;
  let fixture: ComponentFixture<EditarEstidiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstidiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstidiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
