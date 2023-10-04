export type Parcel = {
	id: string; // generated automatically.
	name: string;
	pickupPoint: string; // will be entered by the sender
	dropoffPoint: string; // will be entered by the sender
	status: Status; // generated automatically, then will be updated by the biker.
	bikerId: string; // biker's id who picks the parcel.
	bikerName: string; //  biker's name who picks the parcel.
	pickupTimestamp: string; // will be updated by the bikder
	dropoffTimestamp: string; // will be updated by the bikder
};

export type Status = "submitted" | "picked" | "deleivered";

export type ParcelFormValues = Pick<
	Parcel,
	"pickupPoint" | "dropoffPoint" | "name"
>;

export type ParcelPickValues = {
	bikerId: string;
	bikerName: string;
	parcelId: string;
	time: string;
};

export type BikerParcelType = "current" | "completed";
