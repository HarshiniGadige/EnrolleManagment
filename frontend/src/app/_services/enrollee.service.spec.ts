import { async, TestBed } from '@angular/core/testing';

import { EnrolleeService } from '@app/_services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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


describe('EnroleesComponent', () => {

    let enrolleeService: EnrolleeService;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EnrolleeService]
        }).compileComponents();
    }));

    beforeEach(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        enrolleeService = TestBed.get(EnrolleeService);
    });

    it('should create', () => {
        expect(enrolleeService).toBeTruthy();
    });
    it('should get enrollees', () => {
        enrolleeService.getEnrollees()
            .subscribe(enroleelist => {
                expect(enroleelist.length).toEqual(2);
            });

        const req = httpTestingController.expectOne('http://localhost:8080/enrollees');

        expect(req.request.method).toEqual('GET');

        req.flush(enrollees);
    });
    it('should getById', () => {
        enrolleeService.getById('bd804bcd-8123-4dee-b21b-a71fcffd7533')
            .subscribe(enrolee => {
                expect(enrolee).toEqual(enrollees[0]);
            });

        const req = httpTestingController.expectOne('http://localhost:8080/enrollees/bd804bcd-8123-4dee-b21b-a71fcffd7533');

        expect(req.request.method).toEqual('GET');

        req.flush(enrollees[0]);
    });

    it('should update', () => {
        enrolleeService.update(enrollees[0])
            .subscribe(enrolee => {
                expect(enrolee).toEqual(enrollees[0]);
            });

        const req = httpTestingController.expectOne('http://localhost:8080/enrollees/bd804bcd-8123-4dee-b21b-a71fcffd7533');

        expect(req.request.method).toEqual('PUT');

        req.flush(enrollees[0]);
    });
});
