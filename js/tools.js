function tools() {
    return {
        activeTool: 'prompt-optimizer',
        showToast: false,
        toastMessage: '',
        
        promptOptimizer: {
            originalPrompt: '',
            optimizedPrompt: '',
            suggestions: [],
            isOptimized: false
        },
        
        configGenerator: {
            name: 'my-openclaw',
            model: 'claude-sonnet-4.6',
            apiKey: '',
            heartbeat: true,
            maxTokens: 4000,
            temperature: 0.7,
            configYaml: ''
        },
        
        errorAnalyzer: {
            errorLog: '',
            analysisResult: null
        },
        
        deploymentChecklist: {
            checks: [
                { id: 1, name: 'Node.js 版本 >= 18', done: false },
                { id: 2, name: 'API Key 已配置', done: false },
                { id: 3, name: '网络连接正常', done: false },
                { id: 4, name: '权限配置正确', done: false },
                { id: 5, name: 'config.yaml 文件存在', done: false },
                { id: 6, name: '日志目录可写', done: false },
                { id: 7, name: '端口未被占用', done: false },
                { id: 8, name: '防火墙规则正确', done: false }
            ],
            progress: 0
        },
        
        tokenEstimator: {
            inputText: '',
            model: 'gpt-4o',
            inputTokens: 0,
            outputTokens: 0,
            estimatedCost: 0
        },
        
        modelPricing: {
            'claude-opus-4.6': { name: 'Claude Opus 4.6', inputPrice: 15, outputPrice: 75 },
            'claude-sonnet-4.6': { name: 'Claude Sonnet 4.6', inputPrice: 3, outputPrice: 15 },
            'gpt-4o': { name: 'GPT-4o', inputPrice: 2.5, outputPrice: 10 },
            'gpt-4o-mini': { name: 'GPT-4o Mini', inputPrice: 0.15, outputPrice: 0.6 },
            'deepseek-v3': { name: 'DeepSeek V3', inputPrice: 0.27, outputPrice: 0.55 }
        },
        
        commonErrors: [
            {
                pattern: 'API key invalid',
                title: 'API Key 无效',
                solution: '请检查您的 API Key 是否正确，确保没有多余的空格或换行符。',
                severity: 'error'
            },
            {
                pattern: 'rate limit exceeded',
                title: '请求频率超限',
                solution: '请降低请求频率，或等待几分钟后重试。',
                severity: 'warning'
            },
            {
                pattern: 'model not found',
                title: '模型不存在',
                solution: '请检查模型名称是否正确，可用模型包括：claude-sonnet-4.6, gpt-4o, deepseek-v3',
                severity: 'error'
            },
            {
                pattern: 'connection refused',
                title: '连接被拒绝',
                solution: '请检查网络连接，确保防火墙允许出站连接。',
                severity: 'error'
            },
            {
                pattern: 'timeout',
                title: '请求超时',
                solution: '请求时间过长，请尝试减少输入文本长度或调整超时设置。',
                severity: 'warning'
            }
        ],
        
        init() {
            this.updateChecklistProgress();
            this.generateConfig();
        },
        
        showToastMsg(msg) {
            this.toastMessage = msg;
            this.showToast = true;
            setTimeout(() => this.showToast = false, 3000);
        },
        
        optimizePrompt() {
            const original = this.promptOptimizer.originalPrompt.trim();
            if (!original) {
                this.showToastMsg('请输入原始 Prompt');
                return;
            }
            
            this.promptOptimizer.suggestions = [];
            let optimized = original;
            
            if (!original.includes('1.') && !original.includes('-')) {
                this.promptOptimizer.suggestions.push({
                    type: '结构化',
                    suggestion: '添加编号列表，让AI输出更有条理'
                });
                optimized = '请按照以下步骤处理：\n1. ' + optimized;
            }
            
            if (!original.includes('限制') && !original.includes('要求') && !original.includes('字数')) {
                this.promptOptimizer.suggestions.push({
                    type: '约束',
                    suggestion: '添加输出约束，如"控制在500字以内"'
                });
                optimized += '\n\n要求：\n- 输出控制在500字以内\n- 语言简洁明了';
            }
            
            if (!original.includes('例如') && !original.includes('示例')) {
                this.promptOptimizer.suggestions.push({
                    type: '示例',
                    suggestion: '添加示例，让AI理解期望的输出格式'
                });
            }
            
            if (!original.includes('角色') && !original.includes('作为')) {
                this.promptOptimizer.suggestions.push({
                    type: '角色设定',
                    suggestion: '明确AI的角色身份'
                });
                optimized = '作为一个专业的助手，' + optimized;
            }
            
            this.promptOptimizer.optimizedPrompt = optimized;
            this.promptOptimizer.isOptimized = true;
            
            if (typeof trackEvent === 'function') {
                trackEvent('tool_use', {
                    tool_name: 'prompt-optimizer',
                    params: { has_original: true }
                });
            }
        },
        
        copyOptimizedPrompt() {
            navigator.clipboard.writeText(this.promptOptimizer.optimizedPrompt);
            this.showToastMsg('已复制优化后的 Prompt');
        },
        
        generateConfig() {
            const cfg = this.configGenerator;
            this.configGenerator.configYaml = `name: ${cfg.name}
model: ${cfg.model}
api_key: ${cfg.apiKey || 'your-api-key-here'}
heartbeat: ${cfg.heartbeat}
max_tokens: ${cfg.maxTokens}
temperature: ${cfg.temperature}

tools:
  - browser
  - search
  - code_interpreter

logging:
  level: info
  file: openclaw.log`;
        },
        
        copyConfig() {
            navigator.clipboard.writeText(this.configGenerator.configYaml);
            this.showToastMsg('已复制配置文件');
        },
        
        downloadConfig() {
            const blob = new Blob([this.configGenerator.configYaml], { type: 'text/yaml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.yaml';
            a.click();
            URL.revokeObjectURL(url);
            this.showToastMsg('配置文件已下载');
        },
        
        analyzeError() {
            const log = this.errorAnalyzer.errorLog.toLowerCase();
            if (!log) {
                this.showToastMsg('请输入错误日志');
                return;
            }
            
            let result = {
                title: '未识别的错误',
                solution: '请检查完整的错误日志，或访问社区寻求帮助。',
                severity: 'info',
                relatedErrors: []
            };
            
            for (const err of this.commonErrors) {
                if (log.includes(err.pattern.toLowerCase())) {
                    result = {
                        title: err.title,
                        solution: err.solution,
                        severity: err.severity,
                        relatedErrors: []
                    };
                    break;
                }
            }
            
            for (const err of this.commonErrors) {
                if (err.title !== result.title && log.includes(err.pattern.toLowerCase())) {
                    result.relatedErrors.push(err);
                }
            }
            
            this.errorAnalyzer.analysisResult = result;
            
            if (typeof trackEvent === 'function') {
                trackEvent('tool_use', {
                    tool_name: 'error-analyzer',
                    params: { has_error_log: true }
                });
            }
        },
        
        updateChecklistProgress() {
            const done = this.deploymentChecklist.checks.filter(c => c.done).length;
            const total = this.deploymentChecklist.checks.length;
            this.deploymentChecklist.progress = Math.round((done / total) * 100);
        },
        
        estimateTokens() {
            const text = this.tokenEstimator.inputText;
            if (!text) {
                this.showToastMsg('请输入文本');
                return;
            }
            
            const wordCount = text.split(/\s+/).length;
            const charCount = text.length;
            
            this.tokenEstimator.inputTokens = Math.round((charCount / 4) + (wordCount * 0.5));
            this.tokenEstimator.outputTokens = Math.round(this.tokenEstimator.inputTokens * 1.5);
            
            const pricing = this.modelPricing[this.tokenEstimator.model];
            const inputCost = (this.tokenEstimator.inputTokens / 1000000) * pricing.inputPrice;
            const outputCost = (this.tokenEstimator.outputTokens / 1000000) * pricing.outputPrice;
            this.tokenEstimator.estimatedCost = inputCost + outputCost;
            
            if (typeof trackEvent === 'function') {
                trackEvent('tool_use', {
                    tool_name: 'token-estimator',
                    params: { model: this.tokenEstimator.model }
                });
            }
        }
    };
}
