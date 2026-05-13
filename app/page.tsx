"use client";
import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
const [goal, setGoal] = useState("");
const [timing, setTiming] = useState("");
const [level, setLevel] = useState("");
    const testGemini = async () => {
      const saveProfile = async () => {

  try {

    await addDoc(collection(db, "users"), {
      name,
      goal,
      timing,
      level,
      createdAt: new Date(),
    });

    alert("Profile Saved 🚀");

  } catch (error) {

    console.error(error);

    alert("Something went wrong");

  }
};

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY!
  );

  const model = genAI.getGenerativeModel({
   model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(
    "Give one short motivational fitness quote."
  );

  alert(result.response.text());
};
    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);
    
    const handleGoogleLogin = async () => {
    try {
  const result = await signInWithPopup(auth, provider);

  setUser(result.user);

window.location.href = "/";

} catch (error) {
  console.error(error);
}
  };
  const saveProfile = async () => {

  try {

    await addDoc(collection(db, "users"), {
      name,
      goal,
      timing,
      level,
      createdAt: new Date(),
    });

    alert("Profile Saved 🚀");

  } catch (error) {

    console.error(error);

    alert("Something went wrong");

  }
};
  return (
    <main className="min-h-screen bg-black text-white">

  {/* Navbar */}
<nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">

  {/* Logo */}
  <h1 className="text-2xl font-bold tracking-wide">
    Spottr
  </h1>

  {/* Right Side */}
  <div className="flex items-center gap-4">

    {user && (
      <>
        <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />

          <span className="text-sm font-medium">
            {user.displayName}
          </span>
        </div>

        <button
          onClick={() => setUser(null)}
          className="bg-red-500 px-4 py-2 rounded-full text-sm hover:scale-105 transition"
        >
          Logout
        </button>
      </>
    )}

    {!user && (
      <button
        onClick={handleGoogleLogin}
        className="bg-white text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition"
      >
        Join Now
      </button>
    )}

  </div>
</nav>
<div className="px-8 py-6">
  <button
    onClick={testGemini}
    className="bg-lime-400 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
  >
    Test Gemini AI
  </button>
</div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-lime-500/20 blur-3xl rounded-full top-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

        <div className="mb-6 relative z-10">

  <span className="bg-lime-500/20 text-lime-400 px-5 py-2 rounded-full text-sm border border-lime-500/30 backdrop-blur-md">
    🚀 Fitness Accountability Platform
  </span>

</div>

<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-6xl md:text-8xl font-black leading-tight max-w-6xl relative z-10"
>

  Find Your
  <span className="text-lime-400"> Perfect </span>
  Gym Partner

</motion.h1>

        <p className="text-gray-400 mt-8 text-lg max-w-2xl leading-relaxed relative z-10">
          Spottr helps you compatible gym partners nearby,
          stay accountable together, and build consistency through community.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex gap-4 mt-10 relative z-10"
        >
          <button className="bg-lime-400 text-black px-7 py-3 rounded-full font-semibold hover:scale-105 transition">
            Find Gym Partners
          </button>

          <button className="border border-gray-700 px-7 py-3 rounded-full hover:bg-gray-900 transition">
            Explore Community
          </button>
        </motion.div>
        <div className="mt-20 flex justify-center relative z-10">

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="w-[320px] bg-gray-900 border border-gray-800 rounded-[40px] p-5 shadow-2xl"
  >

    <div className="bg-black rounded-[30px] p-5 space-y-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-400">
            Nearby Partner
          </p>

          <h3 className="text-xl font-bold">
            Ahmed • 2km
          </h3>
        </div>

        <div className="w-14 h-14 rounded-full bg-lime-400"></div>

      </div>

      <div className="bg-gray-800 rounded-2xl p-4">

        <p className="text-gray-300">
          💪 Strength Training
        </p>

        <p className="text-gray-500 mt-2 text-sm">
          Usually trains at 7PM
        </p>

      </div>

      <button className="w-full bg-lime-400 text-black py-4 rounded-2xl font-bold hover:scale-105 transition">

        Match Now

      </button>

    </div>

  </motion.div>

</div>

      </section>

            {/* Features Section */}
      <motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="px-8 py-24"
>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Spottr?
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Built to make fitness consistency easier, social, and motivating.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-lime-400 transition">

            <div className="text-4xl mb-4">
              🏋️
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Smart Matching
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Find compatible gym partners nearby based on goals,
              workout timings, and fitness style.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-lime-400 transition">

            <div className="text-4xl mb-4">
              🔥
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Accountability Streaks
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Maintain workout consistency with streaks,
              check-ins, and partner accountability.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-lime-400 transition">

            <div className="text-4xl mb-4">
              🌍
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Fitness Communities
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Join local fitness groups, discover communities,
              and grow together.
            </p>

          </div>

        </div>

      </motion.section>
            {/* App Preview Section */}
      <section className="px-8 py-24">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-bold">
            Your Fitness Circle.
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Everything you need to stay consistent and connected.
          </p>

        </div>

        <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-800 rounded-[40px] p-8 shadow-2xl">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Left Side */}
            <div className="space-y-6">

              <div className="bg-black rounded-3xl p-6 border border-gray-800">

                <h3 className="text-xl font-semibold">
                  🔥 Current Streak
                </h3>

                <p className="text-5xl font-bold text-lime-400 mt-4">
                  12 Days
                </p>

              </div>

              <div className="bg-black rounded-3xl p-6 border border-gray-800">

                <h3 className="text-xl font-semibold">
                  🏋️ Gym Partner
                </h3>

                <p className="text-gray-400 mt-3">
                  Ahmed • 92% Compatible
                </p>

              </div>

            </div>

            {/* Right Side */}
            <div className="bg-black rounded-3xl p-6 border border-gray-800">

              <h3 className="text-2xl font-semibold mb-6">
                Community Feed
              </h3>

              <div className="space-y-4">

                <div className="bg-gray-900 rounded-2xl p-4">

                  <p className="font-medium">
                    Chest day completed 💪
                  </p>

                  <span className="text-sm text-gray-500">
                    2 mins ago
                  </span>

                </div>

                <div className="bg-gray-900 rounded-2xl p-4">

                  <p className="font-medium">
                    Looking for 6AM workout partner.
                  </p>

                  <span className="text-sm text-gray-500">
                    10 mins ago
                  </span>

                </div>

                <div className="bg-gray-900 rounded-2xl p-4">

                  <p className="font-medium">
                    Hit my 30-day streak today 🚀
                  </p>

                  <span className="text-sm text-gray-500">
                    1 hour ago
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* Search Section */}

      <section className="px-8 py-12">

        <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by fitness goal, gym timings, or username..."
            className="flex-1 bg-black border border-gray-800 rounded-2xl px-5 py-4 outline-none focus:border-lime-400 transition"
          />

          <button className="bg-lime-400 text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Find Partners
          </button>

        </div>

      </section>
            {/* Gym Partner Section */}
      <section className="px-8 py-24">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold">
          Circle
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Connect with compatible fitness partners around you.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-lime-400 transition">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-full bg-lime-400"></div>

              <div>
                <h3 className="text-xl font-semibold">
                  Ahmed
                </h3>

                <p className="text-gray-400 text-sm">
                  92% Compatible
                </p>
              </div>

            </div>

            <div className="space-y-3 text-gray-300">

              <p>🏋️ Bulking Journey</p>
              <p>⏰ 6AM - 8AM</p>
              <p>📍 2.1km Away</p>

            </div>

          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-lime-400 transition">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-full bg-blue-400"></div>

              <div>
                <h3 className="text-xl font-semibold">
                  Sarah
                </h3>

                <p className="text-gray-400 text-sm">
                  88% Compatible
                </p>
              </div>

            </div>

            <div className="space-y-3 text-gray-300">

              <p>🔥 Fat Loss Goal</p>
              <p>⏰ Evening Workouts</p>
              <p>📍 1.4km Away</p>

            </div>

          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-lime-400 transition">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-full bg-pink-400"></div>

              <div>
                <h3 className="text-xl font-semibold">
                  Zayn
                </h3>

                <p className="text-gray-400 text-sm">
                  95% Compatible
                </p>
              </div>

            </div>

            <div className="space-y-3 text-gray-300">

              <p>💪 Strength Training</p>
              <p>⏰ Late Night Gym</p>
              <p>📍 3.7km Away</p>

            </div>

          </div>

        </div>

      </section>
            {/* Community Posts */}

      <section className="px-8 py-24 border-t border-gray-900">

        <div className="mb-16 text-center">

          <h2 className="text-4xl md:text-5xl font-bold">
            Community Energy
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Stay motivated with real fitness journeys.
          </p>

        </div>

        <div className="space-y-6 max-w-3xl mx-auto">

          {/* Post 1 */}

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-full bg-lime-400"></div>

              <div>
                <h3 className="font-semibold">
                  Ahmed
                </h3>

                <p className="text-gray-500 text-sm">
                  1 hour ago
                </p>
              </div>

            </div>

            <p className="text-gray-300 leading-relaxed">
              Finally hit 80kg bench press today 😭🔥
              Consistency really changes everything.
            </p>

          </div>

          {/* Post 2 */}

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-full bg-pink-400"></div>

              <div>
                <h3 className="font-semibold">
                  Sarah
                </h3>

                <p className="text-gray-500 text-sm">
                  3 hours ago
                </p>
              </div>

            </div>

            <p className="text-gray-300 leading-relaxed">
              Lost 4kg in 2 months with my gym partner 💪
              Having accountability seriously helps.
            </p>

          </div>

        </div>

      </section>

      {/* Onboarding Section */}

<section className="px-8 py-24 border-t border-gray-900">

  <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl p-10">

    <h2 className="text-4xl font-bold mb-4">
      Complete Your Fitness Profile
    </h2>

    <p className="text-gray-400 mb-10">
      Help Spottr find your perfect gym partner.
    </p>

    <div className="space-y-6">

      <input
        type="text"
        placeholder="Your Name"
        value={name}
onChange={(e) => setName(e.target.value)}
        className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 outline-none focus:border-lime-400 transition"
      />

      <select
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
  className="w-full bg-black border border-gray-800 rounded-..."
>
        <option>Fitness Goal</option>
        <option>Weight Loss</option>
        <option>Muscle Gain</option>
        <option>Strength Training</option>
        <option>General Fitness</option>
      </select>

      <select
  value={timing}
  onChange={(e) => setTiming(e.target.value)}
  className="..."
>
        <option>Workout Timing</option>
        <option>Morning</option>
        <option>Afternoon</option>
        <option>Evening</option>
        <option>Late Night</option>
      </select>

     <select
  value={level}
  onChange={(e) => setLevel(e.target.value)}
  className="..."
>
        <option>Experience Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button
  onClick={saveProfile}
  className="..."
>
  Save Profile
</button>

    </div>

  </div>

</section>

    </main>
  );
}