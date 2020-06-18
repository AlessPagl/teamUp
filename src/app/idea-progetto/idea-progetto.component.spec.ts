import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaProgettoComponent } from './idea-progetto.component';

describe('IdeaProgettoComponent', () => {
  let component: IdeaProgettoComponent;
  let fixture: ComponentFixture<IdeaProgettoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaProgettoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaProgettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
