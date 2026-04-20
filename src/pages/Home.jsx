import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils, Heart, ListChecks, Archive } from 'lucide-react';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-10 lg:p-16">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary-50 text-primary-700 px-4 py-2 text-sm font-medium mb-6">
            <Utensils className="w-4 h-4" /> Smart Meal Planner
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Plan meals, save favorites, manage your pantry, and shop smarter.
          </h1>
          <p className="mt-6 text-gray-600 max-w-xl leading-8">
            Smart Meal Planner helps you build weekly meal plans, track pantry inventory, generate grocery lists, and find recipes that match your ingredients.
            Use Firebase sign-in to persist your data and access your dashboard anywhere.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-primary-700 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-primary-700 transition"
                >
                  Create free account
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Weekly meal planning', icon: ListChecks },
              { label: 'Pantry inventory tracking', icon: Archive },
              { label: 'Recipe favorites', icon: Heart },
              { label: 'Grocery list generation', icon: Utensils }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                <div className="inline-flex items-center justify-center rounded-2xl bg-white p-3 shadow-sm mb-3">
                  <item.icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="font-semibold text-gray-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-600 text-white p-10 lg:p-16 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Your smart cooking assistant</p>
            <h2 className="mt-6 text-3xl font-bold">Built for home cooks and plan-ahead shoppers.</h2>
            <p className="mt-4 text-primary-100 leading-7">
              Keep your week organized, reduce waste, and feel confident about what’s in your kitchen.
            </p>
          </div>

          <div className="mt-10 space-y-5 text-sm text-primary-200">
            <p className="flex items-center gap-3"><strong className="text-white">✓</strong> Save weekly plans to Firestore</p>
            <p className="flex items-center gap-3"><strong className="text-white">✓</strong> Sync pantry and grocery data per user</p>
            <p className="flex items-center gap-3"><strong className="text-white">✓</strong> Easy mobile-friendly experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
