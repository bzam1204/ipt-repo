import {UUID} from "@/domain/value-objects/UUID/UUID";

const invalidUUIDs = ["invalidUUID", "", ",", "1", "123"];

describe('UUID', () => {

	it('should generate a UUID', () => {
		const uuid = UUID.create();
		expect(uuid).toBeDefined();
	});

	it('should generate a UUID from a given value', () => {
		const value = crypto.randomUUID();
		const uuid = new UUID(value);
		expect(uuid).toBeDefined();
	});

	it.each(invalidUUIDs)('should not generate a UUID with invalid given uuid %s', (value) => {
		expect(() => new UUID(value)).toThrow('Invalid UUID');
	});

});
