import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorinfoComponent } from './errorinfo.component';

describe('ErrorinfoComponent', () => {
  let component: ErrorinfoComponent;
  let fixture: ComponentFixture<ErrorinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
