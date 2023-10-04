import { useState, useEffect, useContext, useMemo } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { BikerParcelType, Parcel } from "@shared/types/parcel";
import { auth, db } from "@shared/firebase";
import { AppContext } from "./AppContext";

export default function useFetchList(type?: BikerParcelType) {
	const { currentUser } = auth;
	const { userData } = useContext(AppContext);
	const [list, setList] = useState<Parcel[]>([]);

	const generateQuery = useMemo(() => {
		if (userData?.type === "sender")
			return query(
				collection(db, "parcels"),
				where("senderId", "==", currentUser?.uid)
			);
		if (userData?.type === "biker" && type === "completed")
			return query(
				collection(db, "parcels"),
				where("bikerId", "==", currentUser?.uid),
				where("status", "==", "deleivered")
			);

		return query(
			collection(db, "parcels"),
			where("status", "!=", "deleivered")
		);
	}, [type]);

	useEffect(() => {
		onSnapshot(generateQuery, (docSnapshot) => {
			const docs = docSnapshot.docs.map(
				(doc) => ({ ...doc.data(), id: doc.id } as Parcel)
			);
			setList(docs);
		});
	}, [generateQuery]);

	return { list };
}
