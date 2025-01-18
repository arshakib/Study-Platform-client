/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Context/Context";
import { useContext } from "react";
import MetaCard from "./MetaCard";

const BookedMeta = () => {
  const { user } = useContext(AuthContext);
  const { data: tutoremail = [] } = useQuery({
    queryKey: ["tutoremail", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/tutoremail/${user?.email}`
      );
      return data;
    },
  });

  return (
    <div>
      <div className="my-10 grid grid-cols-3 gap-7 w-11/12 mx-auto">
        {tutoremail.map((item, index) => (
          <MetaCard key={index} tutoremail={item} />
        ))}
      </div>
    </div>
  );
};

export default BookedMeta;
