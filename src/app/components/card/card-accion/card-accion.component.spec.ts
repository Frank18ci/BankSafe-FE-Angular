import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { CardAccionComponent } from "./card-accion.component";

describe("CardAccionComponent", () => {
	let component: CardAccionComponent;
	let fixture: ComponentFixture<CardAccionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CardAccionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardAccionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
