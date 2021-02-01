import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpLoginPage } from './sign-up-login.page';

describe('SignUpLoginPage', () => {
  let component: SignUpLoginPage;
  let fixture: ComponentFixture<SignUpLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
