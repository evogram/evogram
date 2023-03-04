import type { ILocation } from "../../interfaces";
import { Context } from "../../modules/context";

export class LocationContext extends Context<ILocation> {
	public source = this._source;

	/** Returns the longitude of the current location. */
	public get longitude() { return this._source.longitude }

	/** Returns the latitude of the current location. */
	public get latitude() { return this._source.latitude }

	/** Returns the horizontal accuracy of the location data. */
	public get horizontalAccuracy() { return this._source.horizontal_accuracy }

	/**
	 * Returns the time period during which the location data is considered "live".
	 * @returns The live period in seconds.
	 */
	public get livePeriod() { return this._source.live_period }

	/**
	 * Returns the heading of the device when the location data was recorded.
	 * @returns The heading in degrees, where 0 degrees represents true north.
	 */
	public get heading() { return this._source.heading }

	/**
	 * Returns the proximity alert radius for the location.
	 * @returns The proximity alert radius in meters.
	 */
	public get proximityAlertRadius() { return this._source.proximity_alert_radius }


	/**
	 * Calculates the distance between this location and another location specified as a parameter.
	 * The Haversine formula is used, which takes into account the curvature of the Earth's surface.
	 * @param other The other location to calculate the distance to
	 * @returns The distance between the two locations in meters
	 */
	public distanceTo(other: ILocation): number {
		const [lat1, lon1] = [this.latitude, this.longitude];
		const [lat2, lon2] = [other.latitude, other.longitude];
		const [dLat, dLon] = [((lat2 - lat1) * Math.PI) / 180, ((lon2 - lon1) * Math.PI) / 180]
	
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1* Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
		return 6371000 * c;
	}

	/**
	 * Calculates the bearing (in degrees) between this location and another location.
	 * @param other The other location to calculate the bearing to
	 * @returns The bearing in degrees, where 0 degrees is due north
	 */
	public bearingTo(other: ILocation): number {
		const dLon = (other.longitude - this._source.longitude) * Math.PI / 180;
		const [lat1, lat2] = [this._source.latitude * Math.PI / 180, other.latitude * Math.PI / 180];
		const [x, y] = [Math.sin(dLon) * Math.cos(lat2),  Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)];

		const bearing = Math.atan2(y, x) * 180 / Math.PI;
		return (bearing + 360) % 360;
	}

	/**
	 * Checks if this location is within a specified radius around another location.
	 * @param center The center location to measure the distance from
	 * @param radius The radius in meters
	 * @returns True if this location is within the radius around the center location, false otherwise
	 */
	public isWithinRadius(center: ILocation, radius: number): boolean {
		return this.distanceTo(center) <= radius;
	}

	/**
	 * Generates a link to Google Maps that shows the current location.
	 * @returns The Google Maps link for the current location
	 */
	public toGoogleMapsLink(): string {
		return `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
	}

	/**
	 * Checks if this location is a live location that can be updated.
	 * A location is considered live if it has a `live_period` property greater than 0.
	 * @returns True if this is a live location, false otherwise
	 */
	public isLive(): boolean {
		return !!this._source.live_period && this._source.live_period > 0;
	}

	/**
	 * Checks if this location has an accuracy radius that is smaller than or equal to a specified maximum value.
	 * A location is considered accurate if it has a `horizontal_accuracy` property that is defined and is less than or equal to the specified maximum value.
	 * @param maxAccuracy The maximum accuracy radius in meters
	 * @returns True if this location is accurate, false otherwise
	 */
	public isAccurate(maxAccuracy: number): boolean {
		return !!this._source.horizontal_accuracy && this._source.horizontal_accuracy <= maxAccuracy;
	}
}