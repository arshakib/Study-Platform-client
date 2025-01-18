/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import TutorCard from "./TutorCard";
import axios from "axios";

const Tutor = () => {
  const { data: tutors = [] } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/tutors`);
      return data;
    },
  });
  return (
    <div>
      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Tutors
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Awesome Tutors
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap justify-center">
            {tutors.map((tutor) => (
              <TutorCard
                name={tutor?.name}
                profession={tutor?.email}
                imageSrc={tutor.photoURL}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tutor;
