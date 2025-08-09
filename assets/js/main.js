// ===== MAIN APPLICATION LOGIC =====

class AIPromptGenerator {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
    }

    init() {
        // Cache DOM elements
        this.form = document.getElementById('promptForm');
        this.userPromptInput = document.getElementById('userPrompt');
        this.aiModelSelect = document.getElementById('aiModel');
        this.promptTypeSelect = document.getElementById('promptType');
        this.complexitySlider = document.getElementById('complexityLevel');
        this.generateBtn = document.getElementById('generateBtn');
        this.outputSection = document.getElementById('outputSection');
        this.promptOutput = document.getElementById('promptOutput');
        this.charCount = document.getElementById('charCount');
        this.copyBtn = document.getElementById('copyBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.toastContainer = document.getElementById('toastContainer');

        // Initialize character counter
        this.updateCharCount();
        
        // Set initial values
        this.isGenerating = false;
    }

    setupEventListeners() {
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Character counter
        if (this.userPromptInput) {
            this.userPromptInput.addEventListener('input', () => this.updateCharCount());
        }

        // Output actions
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        }
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.savePrompt());
        }
        if (this.shareBtn) {
            this.shareBtn.addEventListener('click', () => this.sharePrompt());
        }

        // Navigation
        this.setupNavigation();

        // Mobile menu
        this.setupMobileMenu();

        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();

        // Scroll animations
        this.setupScrollAnimations();
    }

    updateCharCount() {
        if (!this.userPromptInput || !this.charCount) return;
        
        const count = this.userPromptInput.value.length;
        this.charCount.textContent = count;
        
        // Update character count color based on limit
        if (count > 900) {
            this.charCount.style.color = 'var(--error-color)';
        } else if (count > 750) {
            this.charCount.style.color = 'var(--warning-color)';
        } else {
            this.charCount.style.color = 'var(--text-muted)';
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
        if (this.isGenerating) {
            console.log('Already generating, ignoring submit');
            return;
        }
        
        const formData = this.getFormData();
        console.log('Form data collected:', formData);
        
        // Validation
        if (!this.validateForm(formData)) {
            console.log('Form validation failed');
            return;
        }

        console.log('Form validation passed, generating prompt...');

        try {
            this.setGeneratingState(true);
            const enhancedPrompt = await this.generatePrompt(formData);
            this.displayResult(enhancedPrompt, formData);
            this.showToast('Prompt generated successfully!', 'success');
            
            // Update global stats counter
            console.log('Checking for dynamicCounters...', typeof dynamicCounters, dynamicCounters);
            if (typeof dynamicCounters !== 'undefined' && dynamicCounters) {
                console.log('Updating stats via dynamicCounters...');
                const updatedStats = await dynamicCounters.updateStats();
                console.log('Stats updated to:', updatedStats);
            } else {
                console.log('dynamicCounters not available');
            }
        } catch (error) {
            console.error('Error generating prompt:', error);
            this.showToast('Failed to generate prompt. Please try again.', 'error');
        } finally {
            this.setGeneratingState(false);
        }
    }

    getFormData() {
        return {
            userPrompt: this.userPromptInput.value.trim(),
            aiModel: this.aiModelSelect.value,
            promptType: this.promptTypeSelect.value,
            complexityLevel: parseInt(this.complexitySlider.value)
        };
    }

    validateForm(formData) {
        if (!formData.userPrompt) {
            this.showToast('Please enter a prompt to enhance.', 'warning');
            this.userPromptInput.focus();
            return false;
        }

        if (formData.userPrompt.length < 10) {
            this.showToast('Please enter a more detailed prompt (at least 10 characters).', 'warning');
            this.userPromptInput.focus();
            return false;
        }

        if (!formData.promptType) {
            this.showToast('Please select a prompt category.', 'warning');
            this.promptTypeSelect.focus();
            return false;
        }

        return true;
    }

    setGeneratingState(isGenerating) {
        this.isGenerating = isGenerating;
        this.generateBtn.classList.toggle('loading', isGenerating);
        this.generateBtn.disabled = isGenerating;
        
        // Disable form inputs during generation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.disabled = isGenerating);
    }

    async generatePrompt(formData) {
        console.log('GeneratePrompt called with form data:', formData);
        
        // Simulate API call delay
        await this.sleep(2000);

        // Use the advanced prompt engineering system
        if (window.PromptEngineering) {
            console.log('Using PromptEngineering system');
            const promptEngine = new window.PromptEngineering();
            const result = promptEngine.generateEnhancedPrompt(
                formData.userPrompt,
                formData.aiModel || 'general',
                formData.promptType,
                formData.complexityLevel
            );
            console.log('Generated prompt result:', result);
            return result;
        }

        // Fallback to basic enhancement
        return this.enhancePrompt(formData);
    }

    enhancePrompt(formData) {
        const { userPrompt, aiModel, promptType, complexityLevel } = formData;
        
        // AI model specific optimizations
        const modelOptimizations = this.getModelOptimizations(aiModel);
        
        // Complexity level enhancements
        const complexityEnhancements = this.getComplexityEnhancements(complexityLevel);
        
        // Category specific enhancements
        const categoryEnhancements = this.getCategoryEnhancements(promptType);
        
        // Build enhanced prompt
        let enhancedPrompt = this.buildEnhancedPrompt({
            originalPrompt: userPrompt,
            modelOptimizations,
            complexityEnhancements,
            categoryEnhancements,
            aiModel,
            promptType
        });

        return enhancedPrompt;
    }

    getModelOptimizations(aiModel) {
        const optimizations = {
            'chatgpt': {
                prefix: 'You are an expert AI assistant. Please provide a comprehensive and detailed response.',
                style: 'conversational and thorough',
                considerations: 'Use clear structure, examples, and step-by-step explanations where appropriate.'
            },
            'claude': {
                prefix: 'I need you to be precise, thoughtful, and comprehensive in your response.',
                style: 'analytical and well-structured',
                considerations: 'Focus on accuracy, nuance, and providing multiple perspectives where relevant.'
            },
            'gemini': {
                prefix: 'Please provide a detailed, accurate, and helpful response.',
                style: 'informative and engaging',
                considerations: 'Include relevant context, examples, and practical applications.'
            },
            'midjourney': {
                prefix: 'Create a highly detailed image prompt with specific visual elements.',
                style: 'descriptive and artistic',
                considerations: 'Include art style, lighting, composition, colors, and mood descriptors.'
            },
            'dalle': {
                prefix: 'Generate an image with the following detailed specifications.',
                style: 'visual and descriptive',
                considerations: 'Specify style, mood, lighting, perspective, and artistic elements.'
            },
            'stable-diffusion': {
                prefix: 'Detailed image generation prompt with specific parameters.',
                style: 'technical and artistic',
                considerations: 'Include negative prompts, style tags, and quality modifiers.'
            },
            'llama': {
                prefix: 'Please provide a comprehensive and well-structured response.',
                style: 'detailed and systematic',
                considerations: 'Focus on clarity, logical flow, and practical examples.'
            },
            'bard': {
                prefix: 'I need a thorough and informative response.',
                style: 'comprehensive and engaging',
                considerations: 'Provide multiple angles, context, and actionable insights.'
            },
            'copilot': {
                prefix: 'Please provide clean, efficient, and well-documented code.',
                style: 'technical and practical',
                considerations: 'Include comments, best practices, and error handling.'
            },
            'general': {
                prefix: 'Please provide a detailed and comprehensive response.',
                style: 'clear and thorough',
                considerations: 'Focus on accuracy, clarity, and practical value.'
            }
        };

        return optimizations[aiModel] || optimizations['general'];
    }

    getComplexityEnhancements(level) {
        const enhancements = {
            1: {
                detail: 'basic',
                instructions: 'Provide a simple and straightforward response.',
                structure: 'Keep it concise and easy to understand.'
            },
            2: {
                detail: 'moderate',
                instructions: 'Provide a detailed response with some examples.',
                structure: 'Include key points and basic explanations.'
            },
            3: {
                detail: 'comprehensive',
                instructions: 'Provide a thorough response with examples and context.',
                structure: 'Use clear sections and detailed explanations.'
            },
            4: {
                detail: 'expert-level',
                instructions: 'Provide an in-depth, professional-grade response.',
                structure: 'Include advanced concepts, multiple examples, and nuanced analysis.'
            },
            5: {
                detail: 'master-level',
                instructions: 'Provide an exhaustive, research-quality response.',
                structure: 'Include comprehensive analysis, edge cases, alternatives, and expert insights.'
            }
        };

        return enhancements[level] || enhancements[3];
    }

    getCategoryEnhancements(category) {
        const enhancements = {
            'creative': {
                focus: 'creativity, originality, and artistic expression',
                requirements: 'Include specific style elements, mood, tone, and creative constraints.',
                output: 'Produce engaging, imaginative, and well-crafted creative content.'
            },
            'code': {
                focus: 'clean, efficient, and maintainable code',
                requirements: 'Include proper documentation, error handling, and best practices.',
                output: 'Generate production-ready code with explanations and optimizations.'
            },
            'analysis': {
                focus: 'thorough analysis and data interpretation',
                requirements: 'Include methodology, data sources, and statistical considerations.',
                output: 'Provide actionable insights with supporting evidence and conclusions.'
            },
            'image': {
                focus: 'detailed visual description and artistic elements',
                requirements: 'Include composition, lighting, style, colors, and mood specifications.',
                output: 'Create compelling visual imagery with specific artistic direction.'
            },
            'business': {
                focus: 'strategic thinking and practical business applications',
                requirements: 'Include market considerations, ROI analysis, and implementation steps.',
                output: 'Deliver actionable business strategies with measurable outcomes.'
            },
            'education': {
                focus: 'clear explanation and pedagogical structure',
                requirements: 'Include learning objectives, examples, and assessment criteria.',
                output: 'Create effective educational content that facilitates understanding.'
            },
            'marketing': {
                focus: 'persuasive communication and audience engagement',
                requirements: 'Include target audience analysis, key messages, and call-to-action.',
                output: 'Generate compelling marketing content that drives desired actions.'
            },
            'research': {
                focus: 'systematic investigation and evidence-based conclusions',
                requirements: 'Include research methodology, sources, and analytical framework.',
                output: 'Provide thorough research with credible sources and valid conclusions.'
            },
            'problem-solving': {
                focus: 'systematic problem analysis and solution development',
                requirements: 'Include problem definition, constraints, and evaluation criteria.',
                output: 'Deliver practical solutions with implementation guidance and alternatives.'
            },
            'other': {
                focus: 'comprehensive and tailored approach',
                requirements: 'Adapt to the specific requirements and context provided.',
                output: 'Provide relevant and valuable content based on the specific needs.'
            }
        };

        return enhancements[category] || enhancements['other'];
    }

    buildEnhancedPrompt({ originalPrompt, modelOptimizations, complexityEnhancements, categoryEnhancements, aiModel, promptType }) {
        const sections = [];

        // Model-specific prefix
        if (modelOptimizations.prefix) {
            sections.push(`**System Context:** ${modelOptimizations.prefix}`);
        }

        // Task definition
        sections.push(`**Primary Task:** ${originalPrompt}`);

        // Category-specific requirements
        sections.push(`**Focus Area:** ${categoryEnhancements.focus}`);
        sections.push(`**Requirements:** ${categoryEnhancements.requirements}`);

        // Complexity and detail level
        sections.push(`**Detail Level:** ${complexityEnhancements.detail} - ${complexityEnhancements.instructions}`);

        // Structure guidelines
        sections.push(`**Structure Guidelines:** ${complexityEnhancements.structure}`);

        // Model considerations
        if (modelOptimizations.considerations) {
            sections.push(`**Additional Considerations:** ${modelOptimizations.considerations}`);
        }

        // Expected output
        sections.push(`**Expected Output:** ${categoryEnhancements.output}`);

        // Special instructions for image generation models
        if (['midjourney', 'dalle', 'stable-diffusion'].includes(aiModel)) {
            sections.push(`**Technical Specifications:** Include aspect ratio, quality settings, and style parameters as needed.`);
        }

        // Special instructions for code generation
        if (promptType === 'code') {
            sections.push(`**Code Requirements:** Include proper comments, error handling, testing considerations, and follow industry best practices.`);
        }

        // Quality assurance
        sections.push(`**Quality Criteria:** Ensure the response is accurate, relevant, practical, and meets professional standards.`);

        return sections.join('\\n\\n');
    }

    displayResult(enhancedPrompt, formData) {
        console.log('DisplayResult called with:', { enhancedPrompt, formData });
        
        // Prepare data for results page
        const resultData = {
            original: formData.userPrompt,
            enhanced: enhancedPrompt,
            aiModel: formData.aiModel,
            promptType: formData.promptType,
            complexityLevel: formData.complexityLevel,
            generatedAt: new Date().toISOString()
        };
        
        console.log('Storing result data:', resultData);
        
        // Store data in session storage for the results page
        sessionStorage.setItem('promptData', JSON.stringify(resultData));
        
        // Verify storage
        const stored = sessionStorage.getItem('promptData');
        console.log('Verification - stored data:', stored);
        
        // Redirect to results page
        window.location.href = 'src/results.html';
    }

    getModelDisplayName(aiModel) {
        const displayNames = {
            'chatgpt': 'ChatGPT',
            'claude': 'Claude',
            'gemini': 'Gemini',
            'llama': 'LLaMA',
            'copilot': 'GitHub Copilot',
            'general': 'General Purpose'
        };
        
        return displayNames[aiModel] || 'General Purpose';
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.promptOutput.textContent);
            this.showToast('Prompt copied to clipboard!', 'success');
            
            // Visual feedback
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                this.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            this.showToast('Failed to copy to clipboard.', 'error');
        }
    }

    savePrompt() {
        const content = this.promptOutput.textContent;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `enhanced-prompt-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Prompt saved successfully!', 'success');
    }

    async sharePrompt() {
        const content = this.promptOutput.textContent;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Enhanced AI Prompt',
                    text: content,
                    url: window.location.href
                });
                this.showToast('Prompt shared successfully!', 'success');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    this.fallbackShare(content);
                }
            }
        } else {
            this.fallbackShare(content);
        }
    }

    fallbackShare(content) {
        // Create a temporary input to copy the share URL
        const shareUrl = `${window.location.href}?shared=true`;
        const temp = document.createElement('input');
        temp.value = shareUrl;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        
        this.showToast('Share URL copied to clipboard!', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
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

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        
                        // Update active link
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }

    setupSmoothScrolling() {
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.feature-card, .stat, .tech-item');
        animatedElements.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

    initializeAnimations() {
        // Animate stats counter
        this.animateCounters();
        
        // Initialize floating particles
        this.initializeParticles();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(animate);
    }

    initializeParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;
        
        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIPromptGenerator();
});
