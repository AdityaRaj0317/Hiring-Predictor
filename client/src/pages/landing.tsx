import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, ShieldCheck, Users, Zap, CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/futuristic_data_hiring_network_visualization_with_glowing_nodes.png";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-display text-lg">H</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">HireCast</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#companies" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Companies</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="hidden md:inline-flex">Log In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                Analyze My Chances
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <motion.img 
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
            style={{ scale, opacity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <Zap className="h-4 w-4" /> AI-Powered Career Intelligence
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6">
                Predict your hiring <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">probability instantly.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Stop applying blindly. Get real-time data on hiring surges, peer comparisons, and AI-driven insights to boost your interview chances by 3x.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all group">
                    Start Analysis <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  View Demo Profile
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why top candidates use HireCast</h2>
            <p className="text-muted-foreground text-lg">We analyze millions of data points to give you the competitive edge in your job search.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart2,
                title: "Probability Scoring",
                description: "Get a real-time 0-100% score on your likelihood of being shortlisted for any role based on historical data."
              },
              {
                icon: Users,
                title: "Peer Clustering",
                description: "See exactly where you stand compared to other applicants with our anonymous peer mapping technology."
              },
              {
                icon: ShieldCheck,
                title: "Hiring Signals",
                description: "Know when companies are freezing hiring or surging before you waste time on an application."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Trusted by candidates from top universities</h2>
              <div className="space-y-6">
                {[
                  "Stanford University",
                  "MIT",
                  "University of Waterloo",
                  "UC Berkeley"
                ].map((uni, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                    <span className="font-medium text-lg">{uni}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 blur-3xl rounded-full opacity-50" />
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center font-bold text-lg">JD</div>
                  <div>
                    <p className="font-bold text-lg">James D.</p>
                    <p className="text-muted-foreground">Software Engineer at TechFlow</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed italic">
                  "HireCast predicted my offer probability within 5% accuracy. It helped me focus on the companies where I actually had a shot instead of spraying and praying."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-display text-xs">H</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">HireCast</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 HireCast Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}