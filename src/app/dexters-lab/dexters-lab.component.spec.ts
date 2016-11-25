/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DextersLabComponent } from './dexters-lab.component';

describe('DextersLabComponent', () => {
  let component: DextersLabComponent;
  let fixture: ComponentFixture<DextersLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DextersLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DextersLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
