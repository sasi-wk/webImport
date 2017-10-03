import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadinfoComponent } from './uploadinfo.component';

describe('UploadinfoComponent', () => {
  let component: UploadinfoComponent;
  let fixture: ComponentFixture<UploadinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
