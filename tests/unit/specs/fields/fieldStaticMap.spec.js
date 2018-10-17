import { mount, createLocalVue } from "@vue/test-utils";

import Vue from "vue";
import FieldStaticMap from "@/fields/optional/fieldStaticMap.vue";

const localVue = createLocalVue();
let wrapper;

function createField(data, methods) {
	const _wrapper = mount(FieldStaticMap, {
		localVue,
		attachToDocument: true,
		mocks: {
			$parent: {
				getValueFromOption: global.getValueFromOption
			}
		},
		propsData: {
			eventBus: new Vue(),
			...data
		}
	});
	if (methods) {
		_wrapper.setMethods(methods);
	}
	wrapper = _wrapper;

	return _wrapper;
}

describe("fieldStaticMap.vue", () => {
	describe("check template", () => {
		let schema = {
			type: "staticMap",
			label: "Geo",
			model: "geo",
			fieldOptions: {
				lat: "latitude",
				lng: "longitude",
				zoom: 6,
				sizeX: 640,
				sizeY: 640,
				scale: 1,
				format: "png",
				maptype: "satellite",
				language: "FR-fr",
				markers: "size:mid%7Ccolor:0xff0000"
			}
		};
		let model = {
			geo: {
				latitude: 13.4567,
				longitude: 20.3321
			}
		};
		let input;

		before(() => {
			createField({ schema, model });
			input = wrapper.find("img");
		});

		it("should contain an img element", () => {
			expect(wrapper.exists()).to.be.true;
			expect(input.is("img")).to.be.true;
			expect(input.element.src).to.be.equal(
				"http://maps.googleapis.com/maps/api/staticmap?center=13.4567,20.3321&zoom=6&size=640x640&scale=1&format=png&maptype=satellite&language=FR-fr&markers=size:mid%7Ccolor:0xff0000"
			);
		});
	});
});
