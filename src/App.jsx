import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'

// SafeIcon Component - converts kebab-case to PascalCase
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const toPascalCase = (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  const iconName = toPascalCase(name)
  const IconComponent = Icons[iconName] || Icons.HelpCircle

  return <IconComponent size={size} className={className} color={color} />
}

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Stat Card Component
const StatCard = ({ icon, value, suffix, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="glass rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-300"
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mb-4">
      <SafeIcon name={icon} className="w-6 h-6 text-blue-400" />
    </div>
    <div className="text-4xl md:text-5xl font-black text-white mb-2">
      <AnimatedCounter end={value} suffix={suffix} />
    </div>
    <div className="text-gray-400 font-medium">{label}</div>
  </motion.div>
)

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="glass rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <SafeIcon name={icon} className="w-7 h-7 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
)

// Step Card Component
const StepCard = ({ number, icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="flex gap-6 items-start"
  >
    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30">
      {number}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        <SafeIcon name={icon} className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

function App() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const connectWallet = () => {
    setWalletConnected(!walletConnected)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass border-b border-slate-800/50">
        <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <SafeIcon name="hexagon" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Nexus<span className="text-blue-400">Fi</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors font-medium">
                Features
              </button>
              <button onClick={() => scrollToSection('protocol')} className="text-gray-300 hover:text-white transition-colors font-medium">
                Protocol
              </button>
              <button onClick={() => scrollToSection('tokenomics')} className="text-gray-300 hover:text-white transition-colors font-medium">
                Tokenomics
              </button>
              <button onClick={() => scrollToSection('docs')} className="text-gray-300 hover:text-white transition-colors font-medium">
                Docs
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={connectWallet}
                className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${walletConnected ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105'}`}
              >
                <SafeIcon name={walletConnected ? 'check-circle' : 'wallet'} className="w-5 h-5" />
                {walletConnected ? 'Connected' : 'Connect Wallet'}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white"
              >
                <SafeIcon name={mobileMenuOpen ? 'x' : 'menu'} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-slate-800"
              >
                <div className="flex flex-col gap-4">
                  <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors font-medium text-left">
                    Features
                  </button>
                  <button onClick={() => scrollToSection('protocol')} className="text-gray-300 hover:text-white transition-colors font-medium text-left">
                    Protocol
                  </button>
                  <button onClick={() => scrollToSection('tokenomics')} className="text-gray-300 hover:text-white transition-colors font-medium text-left">
                    Tokenomics
                  </button>
                  <button onClick={() => scrollToSection('docs')} className="text-gray-300 hover:text-white transition-colors font-medium text-left">
                    Docs
                  </button>
                  <button
                    onClick={connectWallet}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${walletConnected ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}
                  >
                    <SafeIcon name={walletConnected ? 'check-circle' : 'wallet'} className="w-5 h-5" />
                    {walletConnected ? 'Connected' : 'Connect Wallet'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Next-Gen DeFi Protocol
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                Unlock the Power of{' '}
                <span className="gradient-text">Decentralized Finance</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-xl">
                NexusFi is a revolutionary DeFi protocol offering seamless yield farming, 
                liquidity provision, and cross-chain interoperability with institutional-grade security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:scale-105">
                  Launch App
                  <SafeIcon name="arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl text-white font-bold text-lg hover:bg-slate-800/50 transition-all">
                  <SafeIcon name="book-open" className="w-5 h-5" />
                  Read Docs
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-slate-950" />
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold">50K+ Users</div>
                  <div className="text-gray-500 text-sm">Trust NexusFi</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 glass rounded-3xl p-8 glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                    <div>
                      <div className="text-white font-bold">Yield Farming</div>
                      <div className="text-gray-400 text-sm">APY: 24.5%</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                    +12.4%
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="h-48 flex items-end gap-2 mb-6">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/50">
                    <div className="text-gray-400 text-sm mb-1">Total Staked</div>
                    <div className="text-white font-bold text-xl">$12.4M</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50">
                    <div className="text-gray-400 text-sm mb-1">Your Rewards</div>
                    <div className="text-green-400 font-bold text-xl">+$2,845</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl glass flex items-center justify-center animate-float">
                <SafeIcon name="trending-up" className="w-10 h-10 text-green-400" />
              </div>
              <div className="absolute -bottom-4 -left-8 w-20 h-20 rounded-2xl glass flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                <SafeIcon name="shield" className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard icon="bar-chart-3" value={124} suffix="M+" label="Total Value Locked" delay={0} />
            <StatCard icon="users" value={50} suffix="K+" label="Active Users" delay={0.1} />
            <StatCard icon="zap" value={245} suffix="%" label="Highest APY" delay={0.2} />
            <StatCard icon="globe" value={12} suffix="" label="Chains Supported" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Why Choose <span className="gradient-text">NexusFi</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of decentralized finance with cutting-edge features
              designed for both beginners and DeFi veterans.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="shield-check"
              title="Bank-Grade Security"
              description="Multi-signature wallets, real-time monitoring, and audited smart contracts ensure your assets are always protected."
              delay={0}
            />
            <FeatureCard
              icon="trending-up"
              title="High Yield Farming"
              description="Earn competitive APYs up to 245% through optimized yield farming strategies across multiple chains."
              delay={0.1}
            />
            <FeatureCard
              icon="arrow-left-right"
              title="Cross-Chain Bridge"
              description="Seamlessly move assets between 12+ blockchains with low fees and instant finality."
              delay={0.2}
            />
            <FeatureCard
              icon="droplets"
              title="Deep Liquidity"
              description="Access deep liquidity pools with minimal slippage for large trades and stablecoin swaps."
              delay={0.3}
            />
            <FeatureCard
              icon="lock"
              title="Non-Custodial"
              description="You remain in full control of your assets. No middlemen, no centralized risks, true DeFi."
              delay={0.4}
            />
            <FeatureCard
              icon="cpu"
              title="AI-Powered Optimization"
              description="Smart algorithms automatically rebalance your portfolio for maximum returns and minimum risk."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="protocol" className="py-20 md:py-32 relative">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Get started with NexusFi in three simple steps. No complex setup, 
                no technical knowledge required.
              </p>

              <div className="space-y-8">
                <StepCard
                  number="1"
                  icon="wallet"
                  title="Connect Your Wallet"
                  description="Link any Web3 wallet - MetaMask, WalletConnect, Coinbase Wallet, or 50+ supported options."
                />
                <StepCard
                  number="2"
                  icon="layers"
                  title="Choose Your Strategy"
                  description="Select from automated yield farming, liquidity provision, or staking pools based on your risk preference."
                />
                <StepCard
                  number="3"
                  icon="coins"
                  title="Start Earning"
                  description="Deposit your assets and watch your portfolio grow with real-time yield distribution every block."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Protocol Metrics</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Ethereum TVL</span>
                      <span className="text-white font-medium">$45.2M</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">BSC TVL</span>
                      <span className="text-white font-medium">$32.8M</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '55%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Polygon TVL</span>
                      <span className="text-white font-medium">$28.4M</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '45%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Arbitrum TVL</span>
                      <span className="text-white font-medium">$18.0M</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '30%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <SafeIcon name="sparkles" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Gas Optimization</div>
                      <div className="text-gray-400 text-sm">Save up to 40% on transaction fees</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="gradient-text">NEX</span> Tokenomics
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The NEX token powers the NexusFi ecosystem with governance rights, 
              fee discounts, and yield boosting capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Supply', value: '100M', icon: 'database', color: 'from-blue-500 to-blue-400' },
              { label: 'Circulating', value: '45M', icon: 'refresh-cw', color: 'from-purple-500 to-purple-400' },
              { label: 'Market Cap', value: '$89M', icon: 'dollar-sign', color: 'from-cyan-500 to-cyan-400' },
              { label: 'Staked', value: '32M', icon: 'lock', color: 'from-green-500 to-green-400' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                  <SafeIcon name={item.icon} className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{item.value}</div>
                <div className="text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Token Utility */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center"
            >
              <SafeIcon name="vote" className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Governance</h3>
              <p className="text-gray-400">Vote on protocol upgrades, fee structures, and treasury allocations</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <SafeIcon name="percent" className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Fee Discounts</h3>
              <p className="text-gray-400">Up to 50% reduction on trading and withdrawal fees</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <SafeIcon name="rocket" className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Yield Boost</h3>
              <p className="text-gray-400">Earn up to 2.5x more rewards when staking NEX tokens</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20" />
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto glow"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Start Your <span className="gradient-text">DeFi Journey</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users earning passive income with NexusFi. 
              Connect your wallet and start earning in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:scale-105">
                Launch App
                <SafeIcon name="arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 rounded-xl text-white font-bold text-lg hover:bg-slate-800/50 transition-all">
                <SafeIcon name="message-circle" className="w-5 h-5" />
                Join Community
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <SafeIcon name="check-circle" className="w-5 h-5 text-green-400" />
                <span>No KYC Required</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon name="check-circle" className="w-5 h-5 text-green-400" />
                <span>Instant Withdrawals</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon name="check-circle" className="w-5 h-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <SafeIcon name="hexagon" className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Nexus<span className="text-blue-400">Fi</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                The next generation of decentralized finance. Secure, transparent, 
                and built for the future of money.
              </p>
              <div className="flex gap-4">
                {['twitter', 'github', 'send', 'message-circle'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all"
                  >
                    <SafeIcon name={icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Yield Farming</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Liquidity Pools</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cross-Chain Bridge</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Staking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Audit Reports</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Brand Kit</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2024 NexusFi. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App