import {
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
  Query,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { useEffect, VFC } from "react";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { db } from "../App";

type Props<Data> = {
  //firebasePathKey: string;
  dbPath: DocumentReference<DocumentData> | CollectionReference<DocumentData>;
  useQueryOptions: UseQueryOptions<Data>;
};

// type Props2<Data> = {
//   dbPath: CollectionReference<DocumentData>;
//   useQueryOptions: UseQueryOptions<Data>;
// };

//type Props<Data> = Props1<Data> | Props2<Data>;

const useRealTimeQuery = <Data>({
  dbPath,
  useQueryOptions = {}
}: Props<Data>) => {
  const queryClient = useQueryClient();
  const firebasePathKey = dbPath.path;

  useEffect(() => {
    var unSub = () => {};
    // 処理をかく
    switch (dbPath.type) {
      case "document":
        unSub = onSnapshot(dbPath, (doc) => {
          if (doc.exists()) {
            queryClient.setQueryData(firebasePathKey, {
              id: doc.id,
              ...doc.data()
            });
          }
        });
        break;
      case "collection":
        unSub = onSnapshot(dbPath, (snapshots) => {
          if (!snapshots.empty) {
            queryClient.setQueryData(
              firebasePathKey,
              snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
          }
        });
        break;
    }

    return () => unSub();
  }, [queryClient, firebasePathKey]);

  return useQuery<Data, Error>(
    firebasePathKey,
    () => new Promise<Data>(() => {}),
    {
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 10
    }
  );
};

export default useRealTimeQuery;
