import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db, auth } from "@shared/firebase";
import { ParcelFormValues, ParcelPickValues } from "@shared/types/parcel";

interface ParcelInterface {
	/**
	 * Create new parcel
	 * @param {ParcelFormValues} values
	 */
	create(values: ParcelFormValues): Promise<void>;

	/**
	 * Delete the parcel
	 * @param {string} id
	 */
	delete(id: string): Promise<void>;

	/**
	 * Update the parcel when the biker picks it. Update parcel's status, current biker and pickup time
	 * @param {ParcelPickValues} params
	 */
	pick(params: ParcelPickValues): Promise<void>;

	/**
	 * Update the parcel when the biker drops it. Update parcel's status and drop time
	 * @param {string} time
	 * @param {string} parcelId
	 */
	drop(time: string, parcelId: string): Promise<void>;
}

class Parcel implements ParcelInterface {
	public async create(values: ParcelFormValues) {
		const { currentUser } = auth;
		await addDoc(collection(db, "parcels"), {
			...values,
			senderId: currentUser?.uid,
			status: "submitted",
		});
	}

	public async delete(id: string) {
		await deleteDoc(doc(db, "parcels", id));
	}

	public async pick({ bikerId, bikerName, parcelId, time }: ParcelPickValues) {
		await updateDoc(doc(db, "parcels", parcelId), {
			bikerId,
			bikerName,
			pickupTimestamp: time,
			status: "picked",
		});
	}

	public async drop(time: string, parcelId: string) {
		await updateDoc(doc(db, "parcels", parcelId), {
			status: "deleivered",
			dropoffTimestamp: time,
		});
	}
}

const parcel = new Parcel();

export default parcel;
