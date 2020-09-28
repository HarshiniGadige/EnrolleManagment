import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnroleesComponent } from './enrollees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrolleeService } from '@app/_services';
import { of } from 'rxjs';

const enrollees = [
  {
    id: 'bd804bcd-8123-4dee-b21b-a71fcffd7533',
    active: false,
    name: 'Masahiro Sakurai',
    dateOfBirth: '1970-08-03',
  },
  {
    id: 'ee6d3cab-e875-4220-9a5c-17c7c14353a2',
    active: false,
    name: 'Roberta Williams',
    dateOfBirth: '1953-02-16',
  }
];

class MockEnrolleeService {
  getEnrollees() {
    return of(enrollees);
  }
  update(enrolee) {
    return of(enrolee);
  }
}


describe('EnroleesComponent', () => {
  let component: EnroleesComponent;
  let fixture: ComponentFixture<EnroleesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EnroleesComponent],
      providers: [
        { provide: EnrolleeService, useClass: MockEnrolleeService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnroleesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get enrollees', () => {
    const enroleeService = TestBed.get(EnrolleeService);
    const spy = spyOn(enroleeService, 'getEnrollees').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.enrollees).toEqual(enrollees);
  });
  it('should set enrollee data for edit', () => {
    component.onEdit(enrollees[0]);
    expect(component.enrolleeForm.value).toEqual(enrollees[0]);
  });
  it('should set status of enrollee', () => {
    const event = { target: { value: 'true' } };
    component.changeStatus(event);
    expect(component.enrolleeForm.value.active).toEqual(true);
  });
  it('should updateEnrollee', () => {
    const enroleeService = TestBed.get(EnrolleeService);
    const spy = spyOn(enroleeService, 'update').and.callThrough();
    component.onEdit(enrollees[0]);
    component.updateEnrollee();
    expect(spy).toHaveBeenCalled();
  });
});
