// ===== AI PROMPT GENERATOR CORE LOGIC =====

class PromptEngineering {
    constructor() {
        this.templates = this.initializeTemplates();
        this.modelSpecifications = this.initializeModelSpecs();
        this.complexityLevels = this.initializeComplexityLevels();
        this.categoryPromptEngineering = this.initializeCategoryEngineering();
    }

    initializeTemplates() {
        return {
            systematic: {
                structure: [
                    'Context and Background',
                    'Specific Requirements',
                    'Constraints and Limitations',
                    'Expected Output Format',
                    'Quality Criteria',
                    'Examples (if applicable)'
                ]
            },
            creative: {
                structure: [
                    'Creative Vision',
                    'Style and Tone',
                    'Key Elements',
                    'Mood and Atmosphere',
                    'Technical Specifications',
                    'Inspiration References'
                ]
            },
            analytical: {
                structure: [
                    'Problem Definition',
                    'Data Requirements',
                    'Analysis Framework',
                    'Methodology',
                    'Expected Insights',
                    'Presentation Format'
                ]
            },
            instructional: {
                structure: [
                    'Learning Objectives',
                    'Target Audience',
                    'Content Structure',
                    'Engagement Methods',
                    'Assessment Criteria',
                    'Success Metrics'
                ]
            }
        };
    }

    initializeModelSpecs() {
        return {
            'chatgpt': {
                name: 'ChatGPT (OpenAI)',
                strengths: ['conversational responses', 'detailed explanations', 'code generation', 'creative writing'],
                limitations: ['knowledge cutoff', 'cannot browse internet', 'token limits'],
                optimization: {
                    prefix: 'Act as an expert assistant.',
                    structure: 'Use clear sections and bullet points.',
                    style: 'Be comprehensive yet concise.',
                    examples: 'Provide relevant examples when helpful.',
                    formatting: 'Use markdown formatting for better readability.',
                    keyFeatures: ['structured responses', 'detailed explanations', 'step-by-step reasoning'],
                    responseFormat: 'Well-organized markdown with clear sections and examples'
                },
                tokenLimit: 4096,
                temperature: 0.7
            },
            'claude': {
                name: 'Claude (Anthropic)',
                strengths: ['analytical thinking', 'nuanced responses', 'ethical considerations', 'long-form content'],
                limitations: ['focused on helpfulness', 'may be overly cautious', 'limited real-time data'],
                optimization: {
                    prefix: 'Please provide a thoughtful and comprehensive response.',
                    structure: 'Organize information logically with clear reasoning.',
                    style: 'Be precise and consider multiple perspectives.',
                    examples: 'Include relevant examples and counterexamples.',
                    formatting: 'Use structured formatting with clear sections.',
                    keyFeatures: ['analytical reasoning', 'nuanced analysis', 'ethical considerations'],
                    responseFormat: 'Logical structure with comprehensive analysis and multiple perspectives'
                },
                tokenLimit: 8192,
                temperature: 0.6
            },
            'gemini': {
                name: 'Gemini (Google)',
                strengths: ['multimodal capabilities', 'real-time information', 'technical accuracy', 'research assistance'],
                limitations: ['varying response quality', 'potential inconsistency', 'safety filters'],
                optimization: {
                    prefix: 'Provide accurate and up-to-date information.',
                    structure: 'Use clear headings and logical flow.',
                    style: 'Be informative and practical.',
                    examples: 'Include current examples and references.',
                    formatting: 'Use lists and tables where appropriate.',
                    keyFeatures: ['multimodal analysis', 'real-time data', 'technical precision'],
                    responseFormat: 'Clear structured format with current information and practical insights'
                },
                tokenLimit: 6144,
                temperature: 0.5
            },
            'llama': {
                name: 'LLaMA (Meta)',
                strengths: ['open source', 'efficient architecture', 'research focused', 'customizable'],
                limitations: ['requires technical setup', 'varying model sizes', 'community support dependent'],
                optimization: {
                    prefix: 'Please provide a comprehensive and accurate response.',
                    structure: 'Clear logical progression with detailed explanations.',
                    style: 'Be thorough and methodical in approach.',
                    examples: 'Include practical examples and applications.',
                    formatting: 'Well-structured content with clear organization.',
                    keyFeatures: ['efficient processing', 'research-grade output', 'detailed analysis'],
                    responseFormat: 'Comprehensive structured response with thorough explanations'
                },
                tokenLimit: 4096,
                temperature: 0.7
            },
            'copilot': {
                name: 'GitHub Copilot',
                strengths: ['code generation', 'context awareness', 'multiple languages', 'best practices'],
                limitations: ['code focused', 'licensing concerns', 'may suggest suboptimal code'],
                optimization: {
                    prefix: 'Generate well-documented, efficient code that follows best practices.',
                    structure: 'Function/class + documentation + examples + tests.',
                    style: 'Follow language conventions and coding standards.',
                    examples: 'Include usage examples and edge cases.',
                    formatting: 'Proper code formatting with comments and documentation.',
                    keyFeatures: ['code optimization', 'best practices', 'comprehensive documentation'],
                    responseFormat: 'Clean, documented code with examples and explanations'
                },
                tokenLimit: 2048,
                temperature: 0.3
            },
            'general': {
                name: 'General Purpose',
                strengths: ['versatility', 'broad knowledge', 'adaptable', 'multi-domain'],
                limitations: ['less specialized', 'generic optimization', 'model dependent'],
                optimization: {
                    prefix: 'Provide a comprehensive and helpful response.',
                    structure: 'Clear introduction + detailed body + conclusion.',
                    style: 'Be informative, accurate, and engaging.',
                    examples: 'Include relevant examples and practical applications.',
                    formatting: 'Well-organized content with appropriate formatting.',
                    keyFeatures: ['versatile approach', 'comprehensive coverage', 'clear communication'],
                    responseFormat: 'Well-structured, comprehensive response suitable for any AI model'
                },
                tokenLimit: 4096,
                temperature: 0.6
            }
        };
    }

    initializeComplexityLevels() {
        return {
            1: { // Basic
                name: 'Basic',
                description: 'Simple and straightforward prompts',
                characteristics: ['concise instructions', 'basic requirements', 'minimal constraints'],
                wordRange: [40, 100],
                sections: 2,
                detailLevel: 'minimal',
                examples: false,
                contextDepth: 'basic'
            },
            2: { // Detailed  
                name: 'Detailed',
                description: 'Enhanced prompts with clear specifications',
                characteristics: ['clear instructions', 'specific requirements', 'some context', 'basic examples'],
                wordRange: [100, 250],
                sections: 3,
                detailLevel: 'moderate',
                examples: true,
                contextDepth: 'moderate'
            },
            3: { // Advanced
                name: 'Advanced',
                description: 'Comprehensive prompts with detailed specifications',
                characteristics: ['detailed instructions', 'multiple requirements', 'rich context', 'examples and constraints'],
                wordRange: [250, 450],
                sections: 4,
                detailLevel: 'comprehensive',
                examples: true,
                contextDepth: 'detailed'
            },
            4: { // Expert
                name: 'Expert',
                description: 'Professional-grade prompts with advanced specifications',
                characteristics: ['expert-level instructions', 'complex requirements', 'multiple constraints', 'quality criteria', 'edge cases'],
                wordRange: [450, 750],
                sections: 6,
                detailLevel: 'expert',
                examples: true,
                contextDepth: 'comprehensive'
            },
            5: { // Master
                name: 'Master',
                description: 'Exhaustive professional prompts with maximum detail',
                characteristics: ['master-level instructions', 'comprehensive requirements', 'detailed constraints', 'quality assurance', 'edge case handling', 'optimization strategies', 'validation criteria'],
                wordRange: [750, 1500],
                sections: 8,
                detailLevel: 'exhaustive',
                examples: true,
                contextDepth: 'exhaustive'
            }
        };
    }

    initializeCategoryEngineering() {
        return {
            'creative': {
                name: 'Creative Writing',
                keyElements: ['narrative voice', 'genre', 'tone', 'style', 'character development', 'plot structure'],
                promptPatterns: [
                    'Write a [genre] [format] about [subject] in the style of [style/author]',
                    'Create a [character type] who [situation] and must [challenge]',
                    'Develop a story that explores [theme] through [setting]'
                ],
                enhancementStrategies: [
                    'Specify narrative voice and perspective',
                    'Define genre conventions and expectations',
                    'Include character motivation and development arcs',
                    'Describe setting and world-building requirements',
                    'Establish tone, mood, and atmosphere',
                    'Set word count and structure requirements'
                ]
            },
            'code': {
                name: 'Code Generation',
                keyElements: ['language', 'functionality', 'architecture', 'best practices', 'error handling', 'documentation'],
                promptPatterns: [
                    'Write [language] code that [functionality] using [framework/library]',
                    'Create a [architecture pattern] implementation for [use case]',
                    'Develop a [algorithm/function] that [specific requirements]'
                ],
                enhancementStrategies: [
                    'Specify programming language and version',
                    'Define functional requirements clearly',
                    'Include performance and scalability needs',
                    'Specify coding standards and best practices',
                    'Request error handling and edge cases',
                    'Ask for comments and documentation',
                    'Include testing requirements'
                ]
            },
            'analysis': {
                name: 'Data Analysis',
                keyElements: ['data source', 'methodology', 'metrics', 'visualization', 'insights', 'recommendations'],
                promptPatterns: [
                    'Analyze [data type] to [objective] using [methodology]',
                    'Perform [analysis type] on [dataset] focusing on [key metrics]',
                    'Generate insights about [business question] from [data source]'
                ],
                enhancementStrategies: [
                    'Define data sources and formats',
                    'Specify analysis methodology and tools',
                    'Identify key metrics and KPIs',
                    'Request specific visualization types',
                    'Ask for actionable insights and recommendations',
                    'Include statistical significance requirements',
                    'Specify audience and presentation format'
                ]
            },
            'image': {
                name: 'Image Generation',
                keyElements: ['subject', 'composition', 'style', 'lighting', 'mood', 'technical specs'],
                promptPatterns: [
                    'Create an image of [subject] in [style] with [composition]',
                    'Generate a [mood] [scene type] featuring [elements]',
                    'Design a [format] showing [subject] in the style of [artistic movement]'
                ],
                enhancementStrategies: [
                    'Describe the main subject clearly',
                    'Specify artistic style and movement',
                    'Define composition and framing',
                    'Include lighting and color palette',
                    'Set mood and atmosphere',
                    'Add technical specifications (resolution, aspect ratio)',
                    'Include negative prompts for unwanted elements'
                ]
            },
            'business': {
                name: 'Business Strategy',
                keyElements: ['objectives', 'market analysis', 'strategy', 'implementation', 'metrics', 'risks'],
                promptPatterns: [
                    'Develop a [strategy type] for [business objective] in [market/industry]',
                    'Create a [business plan component] for [company type] targeting [audience]',
                    'Analyze [business challenge] and provide [solution type]'
                ],
                enhancementStrategies: [
                    'Define clear business objectives and goals',
                    'Specify target market and audience',
                    'Include competitive landscape analysis',
                    'Request implementation timeline and steps',
                    'Ask for success metrics and KPIs',
                    'Include risk assessment and mitigation',
                    'Specify budget and resource constraints'
                ]
            },
            'education': {
                name: 'Educational Content',
                keyElements: ['learning objectives', 'audience', 'pedagogy', 'assessment', 'engagement', 'outcomes'],
                promptPatterns: [
                    'Create a [lesson type] for [audience] to learn [subject]',
                    'Develop [educational material] that teaches [concept] through [method]',
                    'Design an [assessment type] for [learning objective]'
                ],
                enhancementStrategies: [
                    'Define clear learning objectives',
                    'Specify target audience and skill level',
                    'Include pedagogical approach and methods',
                    'Request engagement and interaction elements',
                    'Ask for assessment and evaluation criteria',
                    'Include accessibility considerations',
                    'Specify format and delivery method'
                ]
            },
            'marketing': {
                name: 'Marketing Copy',
                keyElements: ['audience', 'message', 'channel', 'tone', 'call-to-action', 'brand voice'],
                promptPatterns: [
                    'Write [marketing material] for [product/service] targeting [audience]',
                    'Create [campaign type] content that [objective] for [brand]',
                    'Develop [copy type] that converts [audience] to [action]'
                ],
                enhancementStrategies: [
                    'Define target audience demographics and psychographics',
                    'Specify key message and value proposition',
                    'Include brand voice and tone guidelines',
                    'Request specific call-to-action elements',
                    'Specify marketing channel and format constraints',
                    'Include competitive positioning',
                    'Ask for A/B testing variations'
                ]
            },
            'research': {
                name: 'Research & Analysis',
                keyElements: ['research question', 'methodology', 'sources', 'analysis', 'findings', 'implications'],
                promptPatterns: [
                    'Research [topic] to [objective] using [methodology]',
                    'Analyze [subject] from [perspective] based on [sources]',
                    'Investigate [research question] and provide [output type]'
                ],
                enhancementStrategies: [
                    'Define clear research questions and hypotheses',
                    'Specify research methodology and approach',
                    'Include credible source requirements',
                    'Request analysis framework and criteria',
                    'Ask for evidence-based conclusions',
                    'Include limitations and bias considerations',
                    'Specify output format and audience'
                ]
            }
        };
    }

    generateEnhancedPrompt(originalPrompt, aiModel, promptType, complexityLevel) {
        const modelSpec = this.modelSpecifications[aiModel] || this.modelSpecifications['general'];
        const categorySpec = this.categoryPromptEngineering[promptType];
        const complexity = this.complexityLevels[complexityLevel];

        // Analyze the original prompt
        const analysis = this.analyzePrompt(originalPrompt);
        
        // Build enhanced prompt using the framework
        const enhancedPrompt = this.buildStructuredPrompt({
            original: originalPrompt,
            analysis: analysis,
            modelSpec: modelSpec,
            categorySpec: categorySpec,
            complexity: complexity,
            aiModel: aiModel
        });

        return enhancedPrompt;
    }

    analyzePrompt(prompt) {
        const words = prompt.toLowerCase().split(/\\s+/);
        const analysis = {
            wordCount: words.length,
            hasSubject: false,
            hasAction: false,
            hasContext: false,
            hasConstraints: false,
            hasQuality: false,
            complexity: 'basic',
            categories: [],
            entities: [],
            intents: []
        };

        // Analyze for key components
        const actionWords = ['create', 'write', 'generate', 'build', 'design', 'make', 'develop', 'analyze', 'explain'];
        const qualityWords = ['best', 'high-quality', 'professional', 'detailed', 'comprehensive', 'excellent'];
        const constraintWords = ['must', 'should', 'need', 'require', 'without', 'avoid', 'limit'];

        analysis.hasAction = actionWords.some(word => words.includes(word));
        analysis.hasQuality = qualityWords.some(word => words.includes(word));
        analysis.hasConstraints = constraintWords.some(word => words.includes(word));
        
        // Determine complexity based on length and structure
        if (analysis.wordCount < 10) {
            analysis.complexity = 'basic';
        } else if (analysis.wordCount < 25) {
            analysis.complexity = 'moderate';
        } else if (analysis.wordCount < 50) {
            analysis.complexity = 'comprehensive';
        } else {
            analysis.complexity = 'expert';
        }

        return analysis;
    }

    buildStructuredPrompt({ original, analysis, modelSpec, categorySpec, complexity, aiModel }) {
        const sections = [];

        // 1. Model-specific prefix (always include)
        if (modelSpec.optimization.prefix) {
            sections.push(`**System Instructions:** ${modelSpec.optimization.prefix}`);
        }

        // 2. Enhanced task definition (always include)
        const enhancedTask = this.enhanceTaskDefinition(original, categorySpec, analysis, complexity);
        sections.push(`**Primary Task:** ${enhancedTask}`);

        // 3. Context and requirements (from level 2+)
        if (complexity.sections >= 3) {
            const context = this.generateContextSection(original, categorySpec, aiModel, complexity);
            sections.push(`**Context & Requirements:** ${context}`);
        }

        // 4. Category-specific guidelines (from level 3+)
        if (complexity.sections >= 4 && categorySpec) {
            const guidelines = this.generateCategoryGuidelines(categorySpec, complexity);
            sections.push(`**Category-Specific Guidelines:** ${guidelines}`);
        }

        // 5. Model optimizations (from level 2+)
        if (complexity.sections >= 3) {
            const modelOptimizations = this.generateModelOptimizations(modelSpec, aiModel, complexity);
            sections.push(`**Model Optimizations:** ${modelOptimizations}`);
        }

        // 6. Quality and output specifications (from level 4+)
        if (complexity.sections >= 4) {
            const qualitySpecs = this.generateQualitySpecifications(complexity, categorySpec);
            sections.push(`**Quality Specifications:** ${qualitySpecs}`);
        }

        // 7. Structure and formatting (from level 3+)
        if (complexity.sections >= 3) {
            const structureGuide = this.generateStructureGuide(modelSpec, categorySpec, aiModel, complexity);
            sections.push(`**Structure & Format:** ${structureGuide}`);
        }

        // 8. Advanced specifications (from level 5+)
        if (complexity.sections >= 6) {
            const advancedSpecs = this.generateAdvancedSpecifications(categorySpec, modelSpec, aiModel, complexity);
            sections.push(`**Advanced Specifications:** ${advancedSpecs}`);
        }

        // 9. Examples and constraints (from level 6+)
        if (complexity.sections >= 6 && complexity.examples) {
            const examples = this.generateExamplesSection(categorySpec, complexity, original);
            sections.push(`**Examples & Constraints:** ${examples}`);
        }

        // 10. Success criteria and validation (master level only)
        if (complexity.sections >= 8) {
            const successCriteria = this.generateSuccessCriteria(categorySpec, complexity);
            sections.push(`**Success Criteria:** ${successCriteria}`);
        }

        // 11. Optimization strategies (master level only)
        if (complexity.sections >= 8) {
            const optimizations = this.generateOptimizationStrategies(modelSpec, categorySpec, aiModel);
            sections.push(`**Optimization Strategies:** ${optimizations}`);
        }

        return sections.join('\\n\\n');
    }

    enhanceTaskDefinition(original, categorySpec, analysis, complexity) {
        let enhanced = original;

        // Add missing action verbs based on complexity
        if (!analysis.hasAction && categorySpec) {
            const actionVerbs = {
                'creative': complexity.detailLevel === 'minimal' ? 'Create' : 
                           complexity.detailLevel === 'moderate' ? 'Create and develop' :
                           complexity.detailLevel === 'comprehensive' ? 'Create, develop, and craft' :
                           complexity.detailLevel === 'expert' ? 'Create, develop, craft, and optimize' :
                           'Create, develop, craft, optimize, and refine',
                'code': complexity.detailLevel === 'minimal' ? 'Write' :
                       complexity.detailLevel === 'moderate' ? 'Write and implement' :
                       complexity.detailLevel === 'comprehensive' ? 'Write, implement, and optimize' :
                       complexity.detailLevel === 'expert' ? 'Write, implement, optimize, and document' :
                       'Write, implement, optimize, document, and thoroughly test',
                'analysis': complexity.detailLevel === 'minimal' ? 'Analyze' :
                           complexity.detailLevel === 'moderate' ? 'Analyze and evaluate' :
                           complexity.detailLevel === 'comprehensive' ? 'Analyze, evaluate, and interpret' :
                           complexity.detailLevel === 'expert' ? 'Analyze, evaluate, interpret, and synthesize' :
                           'Analyze, evaluate, interpret, synthesize, and provide comprehensive insights'
            };
            
            const categoryKey = categorySpec.name.toLowerCase().split(' ')[0];
            enhanced = `${actionVerbs[categoryKey] || actionVerbs['analysis']} ${enhanced}`;
        }

        // Add complexity-specific enhancements
        if (complexity.detailLevel === 'comprehensive' || complexity.detailLevel === 'expert' || complexity.detailLevel === 'exhaustive') {
            enhanced += `. Ensure the output meets professional standards and includes comprehensive detail.`;
        }
        
        if (complexity.detailLevel === 'expert' || complexity.detailLevel === 'exhaustive') {
            enhanced += ` Consider edge cases, alternative approaches, and provide reasoning for your methodology.`;
        }
        
        if (complexity.detailLevel === 'exhaustive') {
            enhanced += ` Include thorough analysis, multiple perspectives, validation criteria, and optimization recommendations.`;
        }

        return enhanced;
    }

    generateCategoryGuidelines(categorySpec, complexity) {
        const guidelines = [];

        if (categorySpec.enhancementStrategies) {
            let strategiesToUse;
            if (complexity.detailLevel === 'minimal') {
                strategiesToUse = categorySpec.enhancementStrategies.slice(0, 2);
            } else if (complexity.detailLevel === 'moderate') {
                strategiesToUse = categorySpec.enhancementStrategies.slice(0, 3);
            } else if (complexity.detailLevel === 'comprehensive') {
                strategiesToUse = categorySpec.enhancementStrategies.slice(0, 4);
            } else {
                strategiesToUse = categorySpec.enhancementStrategies;
            }
            guidelines.push(`Key strategies: ${strategiesToUse.join(', ')}.`);
        }

        if (categorySpec.keyElements) {
            let elementsToUse;
            if (complexity.detailLevel === 'minimal') {
                elementsToUse = categorySpec.keyElements.slice(0, 3);
            } else if (complexity.detailLevel === 'moderate') {
                elementsToUse = categorySpec.keyElements.slice(0, 4);
            } else {
                elementsToUse = categorySpec.keyElements;
            }
            guidelines.push(`Essential elements to address: ${elementsToUse.join(', ')}.`);
        }
        
        if (complexity.detailLevel === 'expert' || complexity.detailLevel === 'exhaustive') {
            guidelines.push(`Apply professional ${categorySpec.name.toLowerCase()} methodologies and industry standards.`);
        }

        return guidelines.join(' ');
    }

    generateQualitySpecifications(complexity, categorySpec) {
        const specs = [];

        specs.push(`Target word range: ${complexity.wordRange[0]}-${complexity.wordRange[1]} words for optimal ${complexity.name.toLowerCase()} level detail.`);
        
        if (complexity.detailLevel === 'minimal') {
            specs.push('Quality requirements: Clear, concise, and accurate information.');
        } else if (complexity.detailLevel === 'moderate') {
            specs.push('Quality requirements: Professional standard with clear communication and practical insights.');
        } else if (complexity.detailLevel === 'comprehensive') {
            specs.push('Quality requirements: High professional standard with comprehensive analysis and actionable insights.');
        } else if (complexity.detailLevel === 'expert') {
            specs.push('Quality requirements: Expert-level professional standard with detailed analysis, comprehensive insights, and industry best practices.');
        } else if (complexity.detailLevel === 'exhaustive') {
            specs.push('Quality requirements: Master-level professional standard with exhaustive analysis, comprehensive insights, research-grade documentation, and cutting-edge methodologies.');
        }

        if (categorySpec) {
            let focusElements;
            if (complexity.detailLevel === 'minimal') {
                focusElements = categorySpec.keyElements.slice(0, 2);
            } else if (complexity.detailLevel === 'moderate') {
                focusElements = categorySpec.keyElements.slice(0, 3);
            } else {
                focusElements = categorySpec.keyElements;
            }
            specs.push(`Category quality focus: Excellence in ${focusElements.join(', ')}.`);
        }
        
        if (complexity.detailLevel === 'expert' || complexity.detailLevel === 'exhaustive') {
            specs.push('Validation requirements: Peer-review quality, evidence-based conclusions, and comprehensive error checking.');
        }

        return specs.join(' ');
    }

    generateAdvancedSpecifications(categorySpec, modelSpec, aiModel) {
        const specs = [];

        specs.push('Advanced requirements: Consider edge cases, provide alternatives, include troubleshooting guidance.');

        if (categorySpec) {
            specs.push(`Professional ${categorySpec.name.toLowerCase()} standards: Industry best practices, current trends, expert-level insights.`);
        }

        if (modelSpec.tokenLimit) {
            specs.push(`Optimize for ${modelSpec.tokenLimit} token limit while maintaining comprehensiveness.`);
        }

        return specs.join(' ');
    }

    generateSuccessCriteria(categorySpec, complexity) {
        const criteria = [];

        criteria.push(`Master-level output meeting ${complexity.name.toLowerCase()} standards.`);
        criteria.push('Comprehensive coverage of all specified requirements.');
        criteria.push('Professional quality suitable for expert use.');
        criteria.push('Actionable, practical, and immediately implementable results.');

        if (categorySpec) {
            criteria.push(`Excellence in all ${categorySpec.keyElements.length} key elements: ${categorySpec.keyElements.join(', ')}.`);
        }

        return criteria.join(' ');
    }

    generateExamplesSection(categorySpec, complexity, original) {
        const examples = [];
        
        if (complexity.detailLevel === 'expert' || complexity.detailLevel === 'exhaustive') {
            examples.push('Provide multiple examples demonstrating different approaches and methodologies.');
            examples.push('Include both positive examples (what to do) and negative examples (what to avoid).');
            
            if (categorySpec) {
                examples.push(`Examples should showcase mastery of ${categorySpec.keyElements.slice(0, 3).join(', ')}.`);
            }
        }
        
        if (complexity.detailLevel === 'exhaustive') {
            examples.push('Include edge cases, alternative scenarios, and comparative analysis of different approaches.');
            examples.push('Provide detailed step-by-step breakdowns for complex examples.');
        }

        return examples.join(' ');
    }

    generateOptimizationStrategies(modelSpec, categorySpec, aiModel) {
        const strategies = [];
        
        strategies.push('Performance optimization: Prioritize efficiency, accuracy, and scalability in all outputs.');
        strategies.push('Quality assurance: Implement validation checks, peer review considerations, and iterative improvement processes.');
        
        if (modelSpec.optimization.responseFormat) {
            strategies.push(`Format optimization: ${modelSpec.optimization.responseFormat}`);
        }
        
        strategies.push('Continuous improvement: Consider feedback mechanisms, version control, and documentation standards.');
        
        if (categorySpec) {
            strategies.push(`Domain expertise: Leverage advanced ${categorySpec.name.toLowerCase()} methodologies and industry best practices.`);
        }

        return strategies.join(' ');
    }

    generateContextSection(original, categorySpec, aiModel, complexity) {
        const context = [];
        
        if (complexity.contextDepth === 'basic') {
            context.push('Provide necessary background information and key requirements.');
        } else if (complexity.contextDepth === 'moderate') {
            context.push('Establish comprehensive context including background, requirements, constraints, and success metrics.');
        } else if (complexity.contextDepth === 'detailed') {
            context.push('Establish comprehensive context including detailed background, stakeholder perspectives, technical requirements, business constraints, and measurable success metrics.');
        } else if (complexity.contextDepth === 'comprehensive') {
            context.push('Provide exhaustive contextual framework including historical background, stakeholder analysis, technical specifications, business requirements, regulatory considerations, and comprehensive success metrics.');
        } else if (complexity.contextDepth === 'exhaustive') {
            context.push('Establish complete contextual ecosystem including historical analysis, comprehensive stakeholder mapping, detailed technical architecture, business impact assessment, regulatory compliance framework, risk analysis, and multi-dimensional success criteria.');
        }
        
        if (categorySpec && complexity.contextDepth !== 'basic') {
            context.push(`Consider ${categorySpec.name.toLowerCase()} domain-specific factors and industry standards.`);
        }

        return context.join(' ');
    }

    generateModelOptimizations(modelSpec, aiModel, complexity) {
        const optimizations = [];
        
        if (complexity.detailLevel === 'minimal') {
            optimizations.push(`Basic optimization for ${aiModel}: ${modelSpec.optimization.keyFeatures[0]}.`);
        } else if (complexity.detailLevel === 'moderate') {
            optimizations.push(`Enhanced optimization for ${aiModel}: ${modelSpec.optimization.keyFeatures.slice(0, 2).join(', ')}.`);
        } else {
            optimizations.push(`Advanced optimization for ${aiModel}: ${modelSpec.optimization.keyFeatures.join(', ')}.`);
        }
        
        if (complexity.detailLevel === 'expert' || complexity.detailLevel === 'exhaustive') {
            optimizations.push('Leverage model-specific capabilities for maximum efficiency and accuracy.');
            optimizations.push('Implement advanced prompting techniques and structured reasoning approaches.');
        }
        
        if (complexity.detailLevel === 'exhaustive') {
            optimizations.push('Utilize cutting-edge prompt engineering methodologies and meta-cognitive frameworks.');
        }

        return optimizations.join(' ');
    }

    generateAdvancedSpecifications(categorySpec, modelSpec, aiModel, complexity) {
        const specs = [];
        
        specs.push('Advanced requirements: Implement sophisticated reasoning, multi-step analysis, and comprehensive validation.');
        
        if (complexity.detailLevel === 'expert') {
            specs.push('Expert-level considerations: Include domain expertise, professional standards, and industry best practices.');
        }
        
        if (complexity.detailLevel === 'exhaustive') {
            specs.push('Master-level specifications: Comprehensive analysis, alternative approaches, edge case handling, and optimization recommendations.');
            specs.push('Research-grade output: Include methodology justification, comparative analysis, and peer-review quality standards.');
        }
        
        if (categorySpec) {
            specs.push(`Advanced ${categorySpec.name.toLowerCase()} considerations: ${categorySpec.enhancementStrategies.slice(0, 3).join(', ')}.`);
        }

        return specs.join(' ');
    }

    generateStructureGuide(modelSpec, categorySpec, aiModel, complexity) {
        const guides = [];
        
        if (complexity.detailLevel === 'minimal') {
            guides.push('Use clear, concise structure with essential sections only.');
        } else if (complexity.detailLevel === 'moderate') {
            guides.push('Organize content with logical flow, clear headers, and structured sections.');
        } else if (complexity.detailLevel === 'comprehensive') {
            guides.push('Implement comprehensive structure with detailed sections, subsections, and clear hierarchical organization.');
        } else if (complexity.detailLevel === 'expert') {
            guides.push('Use professional document structure with executive summary, detailed analysis, recommendations, and appendices.');
        } else if (complexity.detailLevel === 'exhaustive') {
            guides.push('Implement research-paper quality structure with abstract, methodology, analysis, findings, recommendations, limitations, and comprehensive references.');
        }
        
        if (modelSpec.optimization.responseFormat && complexity.detailLevel !== 'minimal') {
            guides.push(`Format according to ${aiModel} best practices: ${modelSpec.optimization.responseFormat}.`);
        }

        return guides.join(' ');
    }
}

// Export for use in main application
window.PromptEngineering = PromptEngineering;
