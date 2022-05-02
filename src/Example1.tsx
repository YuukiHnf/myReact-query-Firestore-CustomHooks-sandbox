import { collection, doc, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "./App";
import useRealTimeQuery from "./Queries/useRealTimeQuery";
import useRealTimeQueryQuery from "./Queries/useRealTimeQueryQuery";

type UserType = {
  first: string;
  last: string;
  timestamp: Timestamp;
};

export const Example1 = () => {
  const { data, isLoading } = useRealTimeQuery<UserType>({
    dbPath: doc(collection(db, "users"), "cD9HVAPMe1wcv6BFyWQc"),
    useQueryOptions: {}
  });

  if (isLoading) return <>isLoading...</>;
  console.log(data);
  return (
    <>
      <p>
        {data?.first} {data?.last}
      </p>
    </>
  );
};

export const Example2 = () => {
  const { data, isLoading } = useRealTimeQuery<UserType[]>({
    dbPath: collection(db, "users"),
    useQueryOptions: {}
  });

  if (isLoading) return <>isLoading...</>;
  console.log(data);
  const users = data as UserType[];
  return (
    <>
      {users.map((_d) => (
        <p>
          {_d.first} {_d.last}
        </p>
      ))}
    </>
  );
};

export const Example3 = () => {
  const { data, isLoading } = useRealTimeQueryQuery<UserType[]>({
    dbPath: query(collection(db, "users"), orderBy("timestamp", "asc")),
    useQueryOptions: {},
    pathString: "users/orderByTimestamp"
  });

  if (isLoading) {
    return <></>;
  }
  console.log("query", data);
  const users = data as UserType[];

  return (
    <>
      {users.map((user) => (
        <p>{user.first + " " + user.last + " " + user.timestamp}</p>
      ))}
    </>
  );
};
