// ===== DYNAMIC COUNTER SYSTEM =====

class DynamicCounters {
    constructor() {
        this.counters = {};
        this.animationDuration = 2000;
        this.init();
    }

    async init() {
        try {
            // Load current stats
            const stats = await this.fetchStats();
            
            // Update all counters on the page
            this.updateCounters(stats);
            
            // Setup intersection observer for animation triggers
            this.setupIntersectionObserver();
            
        } catch (error) {
            console.error('Error initializing dynamic counters:', error);
            // Fallback to default values
            this.updateCountersWithDefaults();
        }
    }

    async fetchStats() {
        try {
            // Check localStorage first for any previous updates
            const localStats = localStorage.getItem('simulatedStats');
            if (localStats) {
                try {
                    const parsed = JSON.parse(localStats);
                    console.log('Using stats from localStorage:', parsed);
                    return parsed;
                } catch (error) {
                    console.error('Error parsing local stats:', error);
                }
            }
            
            // Try to fetch from data file if no localStorage
            const response = await fetch('data/stats.json');
            if (response.ok) {
                const fileStats = await response.json();
                console.log('Using stats from file:', fileStats);
                return fileStats;
            }
        } catch (error) {
            console.log('Could not fetch stats from file:', error);
        }
        
        // Default fallback values
        const defaultStats = {
            totalPromptsGenerated: 1247,
            aiModelsSupported: 15,
            successRate: 93,
            lastUpdated: new Date().toISOString()
        };
        console.log('Using default stats:', defaultStats);
        return defaultStats;
    }

    updateCounters(stats) {
        // Map stats to counter elements
        const counterMappings = [
            { selector: '[data-counter="prompts"]', value: stats.totalPromptsGenerated, suffix: '+' },
            { selector: '[data-counter="models"]', value: stats.aiModelsSupported, suffix: '+' },
            { selector: '[data-counter="accuracy"]', value: stats.successRate, suffix: '%' },
            // Additional mappings for various counter formats
            { selector: '.stat-number[data-stat="prompts"]', value: stats.totalPromptsGenerated, suffix: '+' },
            { selector: '.stat-number[data-stat="models"]', value: stats.aiModelsSupported, suffix: '+' },
            { selector: '.stat-number[data-stat="accuracy"]', value: stats.successRate, suffix: '%' }
        ];

        counterMappings.forEach(mapping => {
            const elements = document.querySelectorAll(mapping.selector);
            elements.forEach(element => {
                this.counters[element.id || `counter_${Date.now()}_${Math.random()}`] = {
                    element: element,
                    targetValue: mapping.value,
                    suffix: mapping.suffix || '',
                    animated: false
                };
            });
        });
    }

    updateCountersWithDefaults() {
        const defaultStats = {
            totalPromptsGenerated: 1247,
            aiModelsSupported: 15,
            successRate: 93
        };
        
        this.updateCounters(defaultStats);
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const counterKey = Object.keys(this.counters).find(key => 
                        this.counters[key].element === element
                    );
                    
                    if (counterKey && !this.counters[counterKey].animated) {
                        this.animateCounter(counterKey);
                        this.counters[counterKey].animated = true;
                    }
                }
            });
        }, options);

        // Observe all counter elements
        Object.values(this.counters).forEach(counter => {
            observer.observe(counter.element);
        });
    }

    animateCounter(counterKey) {
        const counter = this.counters[counterKey];
        if (!counter) return;

        const element = counter.element;
        const targetValue = counter.targetValue;
        const suffix = counter.suffix;
        
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.animationDuration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);
            
            // Update element text
            element.textContent = currentValue.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final value is exact
                element.textContent = targetValue.toLocaleString() + suffix;
            }
        };

        requestAnimationFrame(animate);
    }

    // Method to update stats (called when a prompt is generated)
    async updateStats() {
        console.log('updateStats called in DynamicCounters');
        try {
            const currentStats = await this.fetchStats();
            console.log('Current stats before update:', currentStats);
            currentStats.totalPromptsGenerated += 1;
            currentStats.lastUpdated = new Date().toISOString();
            console.log('Updated stats:', currentStats);
            
            // Update localStorage (since we can't write to files in GitHub Pages)
            localStorage.setItem('simulatedStats', JSON.stringify(currentStats));
            
            // Update displayed counters
            this.updateCounters(currentStats);
            
            // Force trigger animations for visible counters
            this.triggerAnimations();
            
            console.log('Counters updated');
            
            return currentStats;
        } catch (error) {
            console.error('Error updating stats:', error);
            return null;
        }
    }

    // Method to manually trigger counter animations
    triggerAnimations() {
        Object.keys(this.counters).forEach(counterKey => {
            if (!this.counters[counterKey].animated) {
                this.animateCounter(counterKey);
                this.counters[counterKey].animated = true;
            }
        });
    }

    // Method to reset animation state (useful for testing)
    resetAnimations() {
        Object.keys(this.counters).forEach(counterKey => {
            this.counters[counterKey].animated = false;
            this.counters[counterKey].element.textContent = '0';
        });
    }
}

// Global instance for use by other scripts
let dynamicCounters;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    dynamicCounters = new DynamicCounters();
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicCounters;
}
