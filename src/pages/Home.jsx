import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils, Heart, ListChecks, Archive, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui';

export default function Home() {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: ListChecks,
      title: 'Weekly meal planning',
      description: 'Organize your meals for the entire week with our intuitive planner'
    },
    {
      icon: Archive,
      title: 'Pantry inventory tracking',
      description: 'Keep track of your ingredients and reduce food waste'
    },
    {
      icon: Heart,
      title: 'Recipe favorites',
      description: 'Save and organize your favorite recipes for quick access'
    },
    {
      icon: Utensils,
      title: 'Grocery list generation',
      description: 'Automatically create shopping lists from your meal plans'
    }
  ];

  const benefits = [
    'Save time with organized meal planning',
    'Reduce food waste with pantry tracking',
    'Discover new recipes based on ingredients',
    'Sync data across all your devices',
    'Get meal recommendations automatically',
    'Track calories and nutritional info'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Utensils className="w-4 h-4" />
                  <span>Smart Meal Planner</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                  Plan meals, save favorites, manage your pantry, and shop smarter.
                </h1>
                <p className="text-lg text-secondary-600 max-w-xl leading-relaxed">
                  Smart Meal Planner helps you build weekly meal plans, track pantry inventory,
                  generate grocery lists, and find recipes that match your ingredients.
                  Use Firebase sign-in to persist your data and access your dashboard anywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {currentUser ? (
                  <Button asChild size="lg" className="shadow-lg hover:shadow-xl">
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="shadow-lg hover:shadow-xl">
                      <Link to="/signup">
                        Create free account
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/login">
                        Sign in
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-secondary-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">Your smart cooking assistant</h3>
                    <p className="text-secondary-600">Built for home cooks and plan-ahead shoppers</p>
                  </div>

                  <div className="grid gap-4">
                    {benefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-secondary-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10">
          <div className="w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10">
          <div className="w-96 h-96 bg-accent-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Everything you need for meal planning
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              From planning your weekly meals to generating grocery lists, we make cooking organized and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{feature.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 lg:py-32 bg-secondary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to start planning smarter meals?
          </h2>
          <p className="text-lg text-secondary-300 mb-8 max-w-2xl mx-auto">
            Join thousands of home cooks who use Smart Meal Planner to organize their kitchen and reduce food waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Button asChild size="lg" variant="secondary">
                <Link to="/dashboard">
                  Continue to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
                  <Link to="/signup">
                    Get Started Free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary-900">
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
