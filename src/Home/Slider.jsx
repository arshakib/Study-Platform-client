import banner from "../assets/banner.jpeg";
const Slider = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-4">
            Collaborative Study Platform
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
            Connecting students, tutors, and administrators to streamline study
            session scheduling, resource sharing, and user management.
            <span className="hidden sm:inline">
              Enhance collaboration, improve access to study materials, and
              manage educational activities seamlessly.
            </span>
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center flex-wrap gap-4">
            <a
              href="#features"
              className="bg-white text-blue-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-blue-100"
            >
              Explore Features
            </a>
            <a
              href="#get-started"
              className="bg-blue-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-blue-900"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 relative">
          <img
            src={banner}
            alt="Professional Study Collaboration Background"
            className="mx-auto rounded-lg shadow-xl w-full sm:w-4/5 lg:w-[1500px] h-[200px] sm:h-[300px] lg:h-[500px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
