/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/* eslint-disable react/jsx-key */
const MetaCard = ({ tutoremail }) => {
  const { bookedsessionId } = tutoremail;

  const { data: MetaItem = [] } = useQuery({
    queryKey: ["meta", bookedsessionId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/bookedmeterials/${bookedsessionId}`
      );
      return data;
    },
  });

  const { materialimage, sessionId, link } = MetaItem[0] || {};
  return (
    <div>
      <div>
        <div>
          <div>
            <div className="card bg-base-100 w-80 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={materialimage} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <p>Session Id: {sessionId}</p>
                <p className="text-sm">Material Img Link: {materialimage}</p>
                <p className="text-sm"> Material Link: {link}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaCard;
