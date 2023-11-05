"use strict";

//
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//========================================================================================================================================================

// Реализуем фильтр в секции Service

window.addEventListener('DOMContentLoaded', () => {

	const serviceButtons = document.querySelectorAll('.service__btn');

	serviceButtons.forEach((serviceButton) => {
		serviceButton.addEventListener('click', (event) => {
			event.preventDefault();

			// active-inactive
			if (isLimitActiveBtns() && !(serviceButton.classList.contains('active-btn'))) {
				serviceButton.classList.add('active-btn');
			} else if (serviceButton.classList.contains('active-btn')) {
				serviceButton.classList.remove('active-btn');
			}

			// filter
			filter(getFilterState());
		});
	});

	const isLimitActiveBtns = () => {
		const activeBtns = document.querySelectorAll('.service__btn.active-btn');
		const activeBtnsAmount = activeBtns.length;

		return activeBtnsAmount < 2;
	}

	const getFilterState = () => {
		const filter = [];
		const activeBtns = document.querySelectorAll('.service__btn.active-btn');

		activeBtns.forEach((activeBtn) => {
			filter.push(activeBtn.getAttribute('data-filter'));
		});

		return filter;
	}

	const filter = (filterState) => {
		resetFilter();

		const serviceItems = document.querySelector('.service__items');

		if (filterState.length) {
			serviceItems.classList.add('filtered');
		} else {
			serviceItems.classList.remove('filtered');
		}

		filterState.forEach((item) => {
			const filtered = document.querySelectorAll(`.service__item.${item}`);
			filtered.forEach((filteredItem) => {
				filteredItem.classList.add('closeCategory');
			});
		});
	}

	const resetFilter = () => {
		const serviceItems = document.querySelectorAll('.service__item');

		serviceItems.forEach((serviceItem) => {
			serviceItem.classList.remove('closeCategory');
		});
	}

	//========================================================================================================================================================

	const cities = {
		canandaigua: {
			city: 'Canandaigua, NY',
			phone: '+1 585 393 0001',
			address: '151 Charlotte Street',
			telAttribute: '+15853930001',
		},
		newYork: {
			city: 'New York City',
			phone: '+1 212 456 0002',
			address: '9 East 91st Street',
			telAttribute: '+12124560002',
		},
		yonkers: {
			city: 'Yonkers, NY',
			phone: '+1 914 678 0003',
			address: '511 Warburton Ave',
			telAttribute: '+19146780003',
		},
		sherrill: {
			city: 'Sherrill, NY',
			phone: '+1 315 908 0004',
			address: '511 Warburton Ave',
			telAttribute: '+13159080004',
		}
	};

	document.addEventListener("selectCallback", function (e) {
		// Селект
		const currentSelect = e.detail.select;

		if (currentSelect) {
			document.getElementById("card").style.visibility = "visible";
			document.getElementById("card").classList.add('card-margin');
			document.querySelector('.contact__image-ibg').classList.add('imageNone');
			document.querySelector('.contact__title').classList.add('title-margin')

			// начало
			const selectedCity = currentSelect.value;

			const cityField = document.querySelector('.item-value__location-value');
			const phoneField = document.querySelector('.item-value__phone-value');
			const addressField = document.querySelector('.item-value__adress-value');

			cityField.innerHTML = `${cities[selectedCity].city}`;
			phoneField.innerHTML = `${cities[selectedCity].phone}`;
			addressField.innerHTML = `${cities[selectedCity].address}`;

			const callUsButton = document.querySelector('.card__link');

			callUsButton.setAttribute('href', `tel:${cities[selectedCity].telAttribute}`);
			// конец
		} else {
			document.getElementById("card").style.visibility = "hidden";
		}

	});


	document.addEventListener('click', (event) => {
		if (!(event.target.closest('.contact__select') || event.target.closest('.contact__card.card'))) {
			document.getElementById("card").style.visibility = "hidden";
			document.querySelector('.contact__image-ibg').classList.remove('imageNone');
			document.querySelector('.contact__title').classList.remove('title-margin');
			document.getElementById("card").classList.remove('card-margin');
		}
	});
});




