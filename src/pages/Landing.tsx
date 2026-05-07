import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Users, Command, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-32">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6 border border-blue-100">
              <Zap className="w-4 h-4" /> Introducing our latest update
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
              The professional platform for <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                modern teams
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Streamline your workflow, collaborate in real-time, and scale your business with the most powerful tools designed for professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Start for free <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-medium text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Book a demo
              </button>
            </div>
          </motion.div>
          
          {/* Dashboard Preview Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-gray-200/60 bg-white/50 backdrop-blur-sm p-2 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 z-10 bottom-0 h-1/2 mt-auto rounded-b-2xl" />
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 aspect-video flex items-center justify-center relative">
                {/* Simulated App UI */}
                <div className="absolute inset-0 bg-white grid grid-cols-12 gap-px bg-gray-200">
                   <div className="col-span-3 bg-white p-6 hidden md:block">
                     <div className="h-8 w-24 bg-gray-100 rounded mb-8"></div>
                     <div className="space-y-4">
                       <div className="h-4 w-full bg-blue-50 rounded"></div>
                       <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                       <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                     </div>
                   </div>
                   <div className="col-span-12 md:col-span-9 bg-white p-8">
                     <div className="h-10 w-48 bg-gray-100 rounded mb-8"></div>
                     <div className="grid grid-cols-3 gap-6 mb-8">
                       <div className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                       <div className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                       <div className="h-24 bg-gray-50 rounded-xl border border-gray-100"></div>
                     </div>
                     <div className="h-64 bg-gray-50 rounded-xl border border-gray-100"></div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Everything you need to scale</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We've built a comprehensive suite of tools designed to help your team move faster and build better products.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Command, title: "Quick Actions", desc: "Access any feature instantly using our powerful command palette. Keyboard-first design for maximum productivity." },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption, SOC2 compliance, and granular role-based access control out of the box." },
              { icon: Globe, title: "Global Edge Network", desc: "Deploy your assets globally with sub-50ms latency. We handle the infrastructure complexity." },
              { icon: Users, title: "Team Collaboration", desc: "Real-time multiplayer editing, inline comments, and seamless approval workflows for teams of any size." },
              { icon: Zap, title: "Lightning Fast", desc: "Built on a modern edge architecture, our platform delivers an incredibly fast experience with zero loading states." },
              { icon: ArrowUpRight, title: "Advanced Analytics", desc: "Deep insights into your usage, performance metrics, and user behavior with custom reporting dashboards." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Start for free, upgrade when you need more power. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard Plan */}
            <div className="border border-gray-200 rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hobby</h3>
              <p className="text-gray-500 mb-6">Perfect for side projects and learning.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {['Up to 3 projects', 'Basic analytics', '24-hour support response time', 'Community access'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-gray-400" /> {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/signup')}
                className="w-full py-3 rounded-xl border border-gray-200 font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Start for free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-blue-600 rounded-3xl p-8 relative flex flex-col shadow-xl scale-105 bg-white z-10">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <p className="text-gray-500 mb-6">For professional developers and small teams.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {['Unlimited projects', 'Advanced analytics', '1-hour support response time', 'Custom domains', 'Team collaboration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/signup')}
                className="w-full py-3 rounded-xl bg-blue-600 font-medium text-white hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-6">For large organizations with complex needs.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {['Everything in Pro', 'Dedicated account manager', '99.99% uptime SLA', 'Custom contracts', 'SSO & SAML'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-gray-400" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-gray-200 font-medium text-gray-900 hover:bg-gray-50 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Frequently asked questions</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Can I use the platform for free?", a: "Yes, our Hobby plan is completely free and includes enough resources for side projects and evaluation. You never have to input a credit card until you upgrade." },
              { q: "What forms of payment do you accept?", a: "We accept all major credit cards including Visa, Mastercard, and American Express. For Enterprise plans, we also support invoicing and wire transfers." },
              { q: "Can I cancel my subscription at any time?", a: "Absolutely. There are no long-term contracts for Hobby or Pro plans. If you cancel, you'll retain access to paid features until the end of your billing cycle." },
              { q: "How secure is my data?", a: "Security is our top priority. All data is encrypted at rest and in transit. We maintain strict access controls and conduct regular third-party security audits." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent blur-2xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to transform your workflow?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of companies building the future with our platform.</p>
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition shadow-xl hover:scale-105 active:scale-95"
          >
            Get started for free
          </button>
        </div>
      </section>
    </div>
  );
}
