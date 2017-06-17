import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormComponent } from '../../../app/form/elements/date/date.component';
import { FormContextService } from '../../../app/form/form-context.service';

describe('DateFormComponent', () => {

  let fixture : ComponentFixture<DateFormComponent>;
  let component : DateFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFormComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormContextService
      ]
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DateFormComponent);
      component = fixture.componentInstance;
    })
  }));

  it('is defined', async(() => {
    expect(component).toBeDefined();
  }));

})
