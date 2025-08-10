import { useState, useEffect, useRef } from "react";
import { FaUserGraduate, FaBuilding, FaChalkboardTeacher, FaBriefcase, FaProjectDiagram } from "react-icons/fa";

const statsData = [
  { id: 1, label: "Students", value: 3026, icon: <FaUserGraduate /> },
  { id: 2, label: "Companies", value: 432, icon: <FaBuilding /> },
  { id: 3, label: "Teachers", value: 354, icon: <FaChalkboardTeacher /> },
  { id: 4, label: "Jobs", value: 1280, icon: <FaBriefcase /> },
  { id: 5, label: "Projects", value: 215, icon: <FaProjectDiagram /> }, // New added
];

const StatsSection = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        } else {
          setStartCount(false);
          setCounts(statsData.map(() => 0));
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (startCount) {
      const maxDuration = 4000; // 4 seconds total
      statsData.forEach((stat, idx) => {
        let start = 0;
        const end = stat.value;
        const incrementTime = Math.floor(maxDuration / end);

        const timer = setInterval(() => {
          start += 1;
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[idx] = start;
            return newCounts;
          });
          if (start === end) clearInterval(timer);
        }, incrementTime);
      });
    }
  }, [startCount]);

  return (
    <div ref={sectionRef} className="bg-base-100 text-base-content py-16 px-5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
        <p className="mb-10 text-lg opacity-80">
          We are proud of our growing community and partners.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={stat.id}
              className="bg-[#704A07] text-white rounded-xl p-8 shadow-lg flex flex-col items-center"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <h3 className="text-4xl font-bold">{counts[idx]}+</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
