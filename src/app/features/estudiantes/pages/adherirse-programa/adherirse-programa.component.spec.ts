import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherirseProgramaComponent } from './adherirse-programa.component';

describe('AdherirseProgramaComponent', () => {
  let component: AdherirseProgramaComponent;
  let fixture: ComponentFixture<AdherirseProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdherirseProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdherirseProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
