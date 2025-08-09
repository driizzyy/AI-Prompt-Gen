// ===== RESULTS PAGE LOGIC =====

class ResultsPage {
    constructor() {
        this.promptData = null;
        this.isLoaded = false;
        this.init();
    }

    init() {
        // Get prompt data from URL parameters or session storage
        this.loadPromptData();
        
        if (this.promptData) {
            this.startLoadingSequence();
        } else {
            // Redirect to home if no data
            window.location.href = '../index.html';
        }
    }

    loadPromptData() {
        // Try to get data from URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');
        
        console.log('Loading prompt data...', { encodedData });
        
        if (encodedData) {
            try {
                this.promptData = JSON.parse(decodeURIComponent(encodedData));
                console.log('Prompt data loaded from URL:', this.promptData);
            } catch (error) {
                console.error('Failed to parse URL data:', error);
                console.error('Error parsing URL data:', error);
            }
        }
        
        // Fallback to session storage
        if (!this.promptData) {
            const sessionData = sessionStorage.getItem('promptData');
            if (sessionData) {
                try {
                    this.promptData = JSON.parse(sessionData);
                } catch (error) {
                    console.error('Error parsing session data:', error);
                }
            }
        }
    }

    async startLoadingSequence() {
        const loadingSteps = [
            { text: 'Analyzing your input...', progress: 20 },
            { text: 'Selecting optimization strategies...', progress: 40 },
            { text: 'Applying AI model specifications...', progress: 60 },
            { text: 'Enhancing prompt structure...', progress: 80 },
            { text: 'Finalizing professional prompt...', progress: 100 }
        ];

        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const loadingPromptCount = document.getElementById('loadingPromptCount');

        // Update counter with current stats
        this.updateLoadingStats();

        for (let i = 0; i < loadingSteps.length; i++) {
            const step = loadingSteps[i];
            
            // Update progress text
            progressText.textContent = step.text;
            
            // Animate progress bar
            progressFill.style.width = step.progress + '%';
            
            // Wait for step duration
            await this.sleep(800 + Math.random() * 400);
        }

        // Small delay before showing results
        await this.sleep(500);
        
        // Hide loading screen and show results
        this.showResults();
    }

    async updateLoadingStats() {
        try {
            // Fetch current stats
            const stats = await this.fetchStats();
            const loadingPromptCount = document.getElementById('loadingPromptCount');
            
            if (loadingPromptCount && stats) {
                // Animate counter
                this.animateCounter(loadingPromptCount, 0, stats.totalPromptsGenerated, 1000);
            }
        } catch (error) {
            console.error('Error updating loading stats:', error);
        }
    }

    async fetchStats() {
        try {
            const response = await fetch('../data/stats.json');
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
        
        // Return default stats if fetch fails
        return {
            totalPromptsGenerated: 1247,
            aiModelsSupported: 15,
            successRate: 93
        };
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    showResults() {
        // Hide loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        const resultsMain = document.getElementById('resultsMain');
        const resultsFooter = document.getElementById('resultsFooter');

        loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            resultsMain.style.display = 'block';
            resultsFooter.style.display = 'block';
            
            // Populate results
            this.populateResults();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Update the global counter
            this.updateGlobalStats();
            
        }, 500);
    }

    populateResults() {
        console.log('PopulateResults called with:', this.promptData);
        
        if (!this.promptData) {
            console.error('No prompt data available');
            return;
        }

        // Original prompt
        const originalPrompt = document.getElementById('originalPrompt');
        if (originalPrompt && this.promptData.original) {
            originalPrompt.textContent = this.promptData.original;
            console.log('Original prompt set:', this.promptData.original);
        }

        // Enhanced prompt - display in the textarea
        const promptTextArea = document.getElementById('enhancedPromptText');
        if (promptTextArea && this.promptData.enhanced) {
            promptTextArea.value = this.promptData.enhanced;
            console.log('Enhanced prompt set:', this.promptData.enhanced.substring(0, 100) + '...');
        }
        
        // Analytics
        this.updateAnalytics();
    }

    displayEnhancedPrompt() {
        const container = document.getElementById('enhancedPrompt');
        if (!container || !this.promptData.enhanced) return;

        // Parse the enhanced prompt into sections
        const sections = this.parsePromptSections(this.promptData.enhanced);
        
        container.innerHTML = '';
        
        sections.forEach((section, index) => {
            const sectionElement = this.createPromptSection(section, index);
            container.appendChild(sectionElement);
        });
    }

    parsePromptSections(enhancedPrompt) {
        // Split the prompt by section headers (marked with **)
        const parts = enhancedPrompt.split(/\\*\\*([^*]+)\\*\\*/);
        const sections = [];
        
        for (let i = 1; i < parts.length; i += 2) {
            const title = parts[i].trim();
            const content = parts[i + 1] ? parts[i + 1].trim() : '';
            
            if (title && content) {
                sections.push({
                    title: title,
                    content: content,
                    icon: this.getSectionIcon(title)
                });
            }
        }
        
        // If no sections found, create a single section
        if (sections.length === 0) {
            sections.push({
                title: 'Enhanced Prompt',
                content: enhancedPrompt,
                icon: 'fas fa-magic'
            });
        }
        
        return sections;
    }

    getSectionIcon(title) {
        const iconMap = {
            'System Instructions': 'fas fa-cog',
            'Primary Task': 'fas fa-bullseye',
            'Context & Requirements': 'fas fa-info-circle',
            'Category-Specific Guidelines': 'fas fa-tags',
            'Model Optimizations': 'fas fa-robot',
            'Quality Specifications': 'fas fa-star',
            'Structure & Format': 'fas fa-list',
            'Advanced Specifications': 'fas fa-graduation-cap',
            'Success Criteria': 'fas fa-trophy'
        };
        
        // Find matching icon or use default
        for (const [key, icon] of Object.entries(iconMap)) {
            if (title.toLowerCase().includes(key.toLowerCase())) {
                return icon;
            }
        }
        
        return 'fas fa-file-text';
    }

    createPromptSection(section, index) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'prompt-section';
        sectionDiv.style.animationDelay = `${index * 0.1}s`;
        
        sectionDiv.innerHTML = `
            <div class="section-header">
                <h4 class="section-title">${section.title}</h4>
                <i class="section-icon ${section.icon}"></i>
            </div>
            <div class="section-content">
                <p>${this.formatSectionContent(section.content)}</p>
            </div>
        `;
        
        sectionDiv.classList.add('slide-in');
        
        return sectionDiv;
    }

    formatSectionContent(content) {
        // Clean up and format the content
        return content
            .replace(/\\n\\n/g, '</p><p>')
            .replace(/\\n/g, '<br>')
            .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
            .trim();
    }

    updateAnalytics() {
        if (!this.promptData) return;

        const enhanced = this.promptData.enhanced || '';
        const words = enhanced.split(/\\s+/).filter(word => word.length > 0).length;
        const chars = enhanced.length;
        const sections = this.parsePromptSections(enhanced).length;

        // Update DOM elements
        this.updateElement('wordCount', words.toLocaleString());
        this.updateElement('charCount', chars.toLocaleString());
        this.updateElement('sectionCount', sections);
        this.updateElement('optimizedFor', this.getModelDisplayName(this.promptData.aiModel));
        this.updateElement('complexityLevel', this.getComplexityDisplayName(this.promptData.complexityLevel));
        this.updateElement('category', this.getCategoryDisplayName(this.promptData.promptType));
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    getModelDisplayName(model) {
        const names = {
            'chatgpt': 'ChatGPT',
            'claude': 'Claude',
            'gemini': 'Gemini',
            'llama': 'LLaMA',
            'copilot': 'GitHub Copilot',
            'general': 'General Purpose'
        };
        return names[model] || 'General Purpose';
    }

    getComplexityDisplayName(level) {
        const names = {
            1: 'Basic',
            2: 'Detailed', 
            3: 'Advanced',
            4: 'Expert',
            5: 'Master'
        };
        return names[level] || 'Advanced';
    }

    getCategoryDisplayName(category) {
        const names = {
            'creative': 'Creative Writing',
            'code': 'Code Generation',
            'analysis': 'Data Analysis',
            'image': 'Image Generation',
            'business': 'Business Strategy',
            'education': 'Educational Content',
            'marketing': 'Marketing Copy',
            'research': 'Research & Analysis',
            'problem-solving': 'Problem Solving',
            'other': 'General'
        };
        return names[category] || 'General';
    }

    setupEventListeners() {
        // Copy button
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyPrompt());
        }

        // Download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadPrompt());
        }

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.sharePrompt());
        }
    }

    async copyPrompt() {
        if (!this.promptData || !this.promptData.enhanced) return;

        try {
            await navigator.clipboard.writeText(this.promptData.enhanced);
            this.showToast('Prompt copied to clipboard!', 'success');
            
            // Update button temporarily
            const copyBtn = document.getElementById('copyBtn');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
            
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showToast('Failed to copy to clipboard', 'error');
        }
    }

    downloadPrompt() {
        if (!this.promptData || !this.promptData.enhanced) return;

        const content = `AI PROMPT GENERATOR PRO - ENHANCED PROMPT
Generated on: ${new Date().toLocaleString()}

ORIGINAL PROMPT:
${this.promptData.original || 'N/A'}

ENHANCED PROMPT:
${this.promptData.enhanced}

SETTINGS:
- AI Model: ${this.getModelDisplayName(this.promptData.aiModel)}
- Category: ${this.getCategoryDisplayName(this.promptData.promptType)}
- Complexity: ${this.getComplexityDisplayName(this.promptData.complexityLevel)}

Generated by AI Prompt Generator Pro
https://github.com/driizzyy/AI-Promp-Gen/
`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `enhanced-prompt-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Prompt downloaded successfully!', 'success');
    }

    async sharePrompt() {
        if (!this.promptData) return;

        const shareData = {
            title: 'AI Prompt Generator Pro - Enhanced Prompt',
            text: `Check out this professionally enhanced AI prompt:\\n\\n${this.promptData.enhanced.substring(0, 200)}...`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                this.showToast('Prompt shared successfully!', 'success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    this.fallbackShare();
                }
            }
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Copy URL to clipboard as fallback
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showToast('Share URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Could not share prompt', 'error');
        });
    }

    async updateGlobalStats() {
        try {
            // This would normally update a database, but for GitHub Pages we'll simulate it
            const stats = await this.fetchStats();
            stats.totalPromptsGenerated += 1;
            stats.lastUpdated = new Date().toISOString();
            
            // In a real application, this would make an API call to update the stats
            // For now, we'll just update localStorage for demonstration
            localStorage.setItem('simulatedStats', JSON.stringify(stats));
            
            console.log('Stats updated:', stats);
        } catch (error) {
            console.error('Error updating global stats:', error);
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    getToastIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize results page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResultsPage();
});
