import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { defer } from 'rxjs';
import { SaveUsersComponent } from './save-users.component';

describe('SaveUsersComponent', () => {
  let component: SaveUsersComponent;
  let fixture: ComponentFixture<SaveUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Form Save Users', () => {
  let component: SaveUsersComponent;
  let fixture: ComponentFixture<SaveUsersComponent>;

  let inputName: DebugElement;
  let inputEmail: DebugElement;
  let inputPassword: DebugElement;
  let inputConfirmPassword: DebugElement;
  let buttonSubmit: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveUsersComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    
    inputName = fixture.debugElement.query(By.css('input[name=name]'));
    inputEmail = fixture.debugElement.query(By.css('input[name=email]'));
    inputPassword = fixture.debugElement.query(By.css('input[name=password]'));
    inputConfirmPassword = fixture.debugElement.query(By.css('input[name=confirmPassword]'));
    buttonSubmit = fixture.debugElement.query(By.css('button[type=submit]'));
  });

  function fillValidFormSaveUsers() {
    inputName.nativeElement.value = 'Maria';
    inputName.nativeElement.dispatchEvent(new Event('input'));
    
    inputEmail.nativeElement.value = 'mariaSilva@email.com';
    inputEmail.nativeElement.dispatchEvent(new Event('input'));
    
    inputPassword.nativeElement.value = 'abcdef';
    inputPassword.nativeElement.dispatchEvent(new Event('input'));
    
    inputConfirmPassword.nativeElement.value = 'abcdef';
    inputConfirmPassword.nativeElement.dispatchEvent(new Event('input'));
  }

  function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }

  it('test all fields and submit button has created', () => {
    expect(component).toBeTruthy();

    expect(inputName).toBeTruthy();
    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(inputConfirmPassword).toBeTruthy();
    
    expect(buttonSubmit).toBeTruthy();
    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });

  it('fill all fields with valid values', () => {
    fillValidFormSaveUsers();

    expect(component.person.name).toBe('Maria');
    expect(component.person.email).toBe('mariaSilva@email.com');
    expect(component.person.password).toBe('abcdef');
    expect(component.person.confirmPassword).toBe('abcdef');

    expect(buttonSubmit.properties?.['disabled']).toBe(false);
  });

  it('fill email field with invalid value', () => {
    fillValidFormSaveUsers();

    inputEmail.nativeElement.value = 'mariaSilva#email.com';
    inputEmail.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });
  
  it('fill password and confirm password fields with different values changing password', () => {
    fillValidFormSaveUsers();

    inputPassword.nativeElement.value = 'abcdefghi';
    inputPassword.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });
 
  it('fill password and confirm password fields different values changing confirm password', () => {
    fillValidFormSaveUsers();

    inputConfirmPassword.nativeElement.value = 'abcdefghi';
    inputConfirmPassword.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });

  it('fill name field with null value', () => {
    fillValidFormSaveUsers();

    inputName.nativeElement.value = null;
    inputName.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });
  
  it('fill email field with null value', () => {
    fillValidFormSaveUsers();

    inputEmail.nativeElement.value = null;
    inputEmail.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });
  
  it('fill password field with null value', () => {
    fillValidFormSaveUsers();

    inputPassword.nativeElement.value = null;
    inputPassword.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });
  
  it('fill confirm password field with null value', () => {
    fillValidFormSaveUsers();

    inputConfirmPassword.nativeElement.value = null;
    inputConfirmPassword.nativeElement.dispatchEvent(new Event('input'));

    expect(buttonSubmit.properties?.['disabled']).toBe(true);
  });

  it('valid if the form will be send succeed', () => {
    let personServiceSpy = spyOn(component, 'onSubmit').and.callThrough();

    expect(personServiceSpy).not.toHaveBeenCalled();
    
    fillValidFormSaveUsers();
    component.onSubmit();

    expect(personServiceSpy).toHaveBeenCalled();
  })
});
