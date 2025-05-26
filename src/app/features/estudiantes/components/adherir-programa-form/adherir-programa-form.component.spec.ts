import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdherirProgramaFormComponent } from './adherir-programa-form.component';

describe('AdherirProgramaFormComponent', () => {
  let component: AdherirProgramaFormComponent;
  let fixture: ComponentFixture<AdherirProgramaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdherirProgramaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdherirProgramaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
