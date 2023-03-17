import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeTableInfoComponent } from './poke-table-info.component';

describe('PokeTableInfoComponent', () => {
  let component: PokeTableInfoComponent;
  let fixture: ComponentFixture<PokeTableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeTableInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
