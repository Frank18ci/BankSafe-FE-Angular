import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { CardTarjetaComponent } from "./card-tarjeta.component";

describe("CardTarjetaComponent", () => {
	let component: CardTarjetaComponent;
	let fixture: ComponentFixture<CardTarjetaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CardTarjetaComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardTarjetaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
