import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const AnimatedStats = () => {
  const stats = [
    { id: 1, label: 'Total Users', value: 12000 },
    { id: 2, label: 'Orders Delivered', value: 7500 },
    { id: 3, label: 'Products Available', value: 320 },
    { id: 4, label: 'Positive Reviews', value: 11000 },
  ];

  const [triggerCounts, setTriggerCounts] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: false });

  
  useEffect(() => {
    if (inView) {
      setTriggerCounts((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <section className="bg-amber-50 py-20 px-4 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-8">
          Trusted by Thousands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={`${stat.id}-${triggerCounts}`} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-4xl font-extrabold text-amber-700 mb-2">
                <CountUp end={stat.value} duration={2.5} separator="," />+
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;