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
  dbPath: Query<DocumentData>;
  useQueryOptions: UseQueryOptions<Data>;
  pathString: string;
};

// type Props2<Data> = {
//   dbPath: CollectionReference<DocumentData>;
//   useQueryOptions: UseQueryOptions<Data>;
// };

//type Props<Data> = Props1<Data> | Props2<Data>;

const useRealTimeQueryQuery = <Data>({
  dbPath,
  useQueryOptions = {},
  pathString = ""
}: Props<Data>) => {
  const queryClient = useQueryClient();
  const firebasePathKey = pathString;

  useEffect(() => {
    const unSub = onSnapshot(dbPath, (snapshots) => {
      if (!snapshots.empty) {
        queryClient.setQueryData(
          firebasePathKey,
          snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    });

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

export default useRealTimeQueryQuery;
