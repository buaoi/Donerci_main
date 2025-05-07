
import { Navbar, Footer } from '@/components';
import { Card } from '@/components/ui/card';
import { Utensils, Clock, ThumbsUp, TrendingUp, Soup, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">About Donerci</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Revolutionizing food delivery with artificial intelligence
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                Donerci was founded in 2024 with a simple mission: make food delivery smarter.
                We believe that technology can enhance the way people discover and enjoy food.
              </p>
              <p className="mb-4">
                Our team of food enthusiasts and AI experts came together to create a platform 
                that understands your taste preferences and dietary needs, making personalized 
                recommendations that help you discover new flavors while ensuring you get exactly 
                what you want.
              </p>
              <p>
                Today, Donerci partners with hundreds of restaurants across the country, 
                delivering not just meals, but experiences tailored to each customer's unique palate.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">What Makes Us Different</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">AI-Powered Recommendations</h3>
                <p className="text-muted-foreground">Our smart algorithm learns your preferences and suggests dishes you'll love.</p>
              </Card>
              
              <Card className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Soup className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">Quality Restaurants</h3>
                <p className="text-muted-foreground">We partner only with the best restaurants that meet our strict quality standards.</p>
              </Card>
              
              <Card className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">Optimized routes and dedicated delivery partners ensure your food arrives hot and fresh.</p>
              </Card>
              
              <Card className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">Diverse Cuisine Options</h3>
                <p className="text-muted-foreground">Explore a wide variety of cuisines from around the world, all in one platform.</p>
              </Card>
              
              <Card className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <ThumbsUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">Customer Satisfaction</h3>
                <p className="text-muted-foreground">We prioritize your experience with responsive support and easy refunds.</p>
              </Card>
              
              <Card className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-lg mb-2">Continuous Improvement</h3>
                <p className="text-muted-foreground">Our AI gets smarter with every order, making each experience better than the last.</p>
              </Card>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">Join the Donerci Revolution</h2>
            <p className="text-muted-foreground mb-8">
              Experience the future of food delivery today. Download our app or order online
              to taste the difference that intelligent recommendations can make.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
