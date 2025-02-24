/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/* eslint-disable react/jsx-key */
const MetaCard = ({ tutoremail }) => {
  const { bookedsessionId } = tutoremail;

  console.log(tutoremail);

  const { data: MetaItem = [] } = useQuery({
    queryKey: ["meta", bookedsessionId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/bookedmeterials/${bookedsessionId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  console.log(MetaItem);
  const { materialimage, sessionId, link } = MetaItem[0] || {};
  return (
    <div>
      {MetaItem[0] === undefined ? (
        <div className="text-center text-gray-500 p-6">
          <p>No material available for this session.</p>
        </div>
      ) : (
        <div>
          <div className="card bg-base-100 w-80 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={materialimage} alt="Material" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p>Session Id: {sessionId}</p>
              <p className="text-sm">Material Img Link: {materialimage}</p>
              <p className="text-sm">Material Link: {link}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetaCard;
