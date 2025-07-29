/**
 * @abstract
 * BaseClass serves as a foundational class for other classes in the project.
 */
class BaseClass {
	constructor() {
		this.type = "BaseClass";
		this.ID = crypto.randomUUID();
	}

	/**
	 * Deconstructs the BaseClass instance.
	 */
	deconstruct() { }

	/**
	 * Clones the current instance of BaseClass.
	 * @returns {BaseClass} A new instance of the same type as this instance.
	 */
	clone() {
		const clone = new this.constructor();
		clone.type = this.type;
		clone.ID = crypto.randomUUID();

		for (const key of Object.keys(this)) {
			if (key === "ID") continue; // skip ID to keep unique
			clone[key] = structuredClone(this[key]);
		}

		return clone;
	}

	/**
	 * 
	 * @param {BaseClass} other 
	 * @returns 
	 */
	cmp(other) {
		if (other instanceof BaseClass) {
			return this.ID === other.ID;
		}
		return false;
	}
}