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
        `https://study-ten-blond.vercel.app/tutoremail/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  return (
    <div>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-11/12 mx-auto">
        {tutoremail.map((item, index) => (
          <MetaCard key={index} tutoremail={item} />
        ))}
      </div>
    </div>
  );
};

export default BookedMeta;
