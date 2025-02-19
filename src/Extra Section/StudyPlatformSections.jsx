import { useState } from "react";

const StudyPlatformSections = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqItems = [
    {
      question: "How do I join a study group?",
      answer: "Create an account and browse available study groups...",
    },
    {
      question: "Can I create my own study group?",
      answer: 'Yes! Click the "Create Group" button...',
    },
    {
      question: "Is this platform free?",
      answer: "Basic features are free, with premium options...",
    },
  ];

  return (
    <div id="features" className="font-sans bg-gray-50">
      {/* 1. Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto text-center animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6">
            Collaborative Learning Space
          </h1>
          <p className="text-xl mb-8">Join thousands of learners worldwide</p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:scale-105 transition-transform">
              Get Started
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: "50K+", label: "Active Users" },
            { number: "1M+", label: "Study Hours" },
            { number: "200+", label: "Study Groups" },
            { number: "95%", label: "Success Rate" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gray-50 rounded-lg animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Collaboration", icon: "💬" },
              { title: "Progress Tracking", icon: "📈" },
              { title: "Resource Sharing", icon: "📚" },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={item.question}
                className="border rounded-lg overflow-hidden animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <span className="text-xl">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="p-4 bg-white animate-slideDown">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section (New Section) */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Johnson",
                role: "Student",
                testimonial:
                  "This platform helped me ace my exams! The study groups are amazing.",
                avatar: "👩‍🎓",
              },
              {
                name: "Bob Smith",
                role: "Teacher",
                testimonial:
                  "A great way to connect with students and share resources.",
                avatar: "👨‍🏫",
              },
              {
                name: "Charlie Brown",
                role: "Lifelong Learner",
                testimonial:
                  "I love the analytics feature. It keeps me motivated!",
                avatar: "🧑‍💻",
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 italic mb-4">
                  {testimonial.testimonial}
                </p>
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Analytics Preview Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slideInLeft">
            <h2 className="text-3xl font-bold mb-6">Detailed Analytics</h2>
            <p className="text-gray-600 mb-6">
              Track your study progress with our comprehensive analytics
              dashboard.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 mr-3 rounded-full"></div>
                Study time distribution
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 mr-3 rounded-full"></div>
                Progress milestones
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 mr-3 rounded-full"></div>
                Group activity tracking
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl animate-slideInRight">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Analytics Preview</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyPlatformSections;
