const modelPricing = {
    "claude-opus-4.6": {
        name: "Claude Opus 4.6",
        inputPrice: 15,
        outputPrice: 75,
        quality: 5
    },
    "claude-sonnet-4.6": {
        name: "Claude Sonnet 4.6",
        inputPrice: 3,
        outputPrice: 15,
        quality: 4
    },
    "claude-haiku-4.6": {
        name: "Claude Haiku 4.6",
        inputPrice: 0.25,
        outputPrice: 1.25,
        quality: 3
    },
    "gpt-4o": {
        name: "GPT-4o",
        inputPrice: 2.5,
        outputPrice: 10,
        quality: 4
    },
    "gpt-4o-mini": {
        name: "GPT-4o Mini",
        inputPrice: 0.15,
        outputPrice: 0.6,
        quality: 3
    },
    "gpt-4-turbo": {
        name: "GPT-4 Turbo",
        inputPrice: 10,
        outputPrice: 30,
        quality: 4
    },
    "deepseek-v3": {
        name: "DeepSeek V3",
        inputPrice: 0.27,
        outputPrice: 0.55,
        quality: 3,
        isChineseModel: true
    },
    "deepseek-reasoner": {
        name: "DeepSeek Reasoner",
        inputPrice: 2.7,
        outputPrice: 11.1,
        quality: 4,
        isChineseModel: true
    },
    "qwen-plus": {
        name: "Qwen Plus",
        inputPrice: 0.3,
        outputPrice: 0.6,
        quality: 3,
        isChineseModel: true
    },
    "qwen-max": {
        name: "Qwen Max",
        inputPrice: 1.2,
        outputPrice: 2.4,
        quality: 4,
        isChineseModel: true
    },
    "llama-3-70b": {
        name: "Llama 3 70B",
        inputPrice: 0.9,
        outputPrice: 0.9,
        quality: 3
    }
};

const scenarioPresets = {
    light: {
        name: "轻度摸鱼",
        dailyTasks: 10,
        stepsPerTask: 50,
        description: "偶尔使用，适合初学者"
    },
    office: {
        name: "日常办公",
        dailyTasks: 35,
        stepsPerTask: 90,
        description: "日常工作使用"
    },
    dev: {
        name: "开发辅助",
        dailyTasks: 50,
        stepsPerTask: 150,
        description: "开发辅助，频繁使用"
    },
    heavy: {
        name: "重度挂机",
        dailyTasks: 200,
        stepsPerTask: 300,
        description: "24小时挂机，大规模使用"
    },
    startup: {
        name: "创业团队",
        dailyTasks: 100,
        stepsPerTask: 200,
        description: "小团队协作使用"
    }
};

function calculateCost(modelId, dailyTasks, stepsPerTask) {
    const model = modelPricing[modelId];
    if (!model) return null;

    const avgInputTokens = 1000;
    const avgOutputTokens = 500;

    const totalInputTokens = dailyTasks * stepsPerTask * avgInputTokens;
    const totalOutputTokens = dailyTasks * stepsPerTask * avgOutputTokens;

    const inputCost = (totalInputTokens / 1000000) * model.inputPrice;
    const outputCost = (totalOutputTokens / 1000000) * model.outputPrice;
    const totalDailyCost = inputCost + outputCost;

    return {
        daily: totalDailyCost,
        weekly: totalDailyCost * 7,
        monthly: totalDailyCost * 30,
        yearly: totalDailyCost * 365,
        inputCost,
        outputCost,
        totalInputTokens,
        totalOutputTokens
    };
}

function compareModels(dailyTasks, stepsPerTask, selectedModelId) {
    const results = [];

    for (const [modelId, model] of Object.entries(modelPricing)) {
        const cost = calculateCost(modelId, dailyTasks, stepsPerTask);
        if (cost) {
            results.push({
                modelId,
                model,
                cost,
                isSelected: modelId === selectedModelId
            });
        }
    }

    results.sort((a, b) => a.cost.monthly - b.cost.monthly);
    return results;
}

function getOptimizationSuggestions(selectedModelId, dailyTasks, stepsPerTask) {
    const suggestions = [];
    const selectedCost = calculateCost(selectedModelId, dailyTasks, stepsPerTask);
    if (!selectedCost) return suggestions;

    const selectedModel = modelPricing[selectedModelId];

    for (const [modelId, model] of Object.entries(modelPricing)) {
        if (modelId === selectedModelId) continue;

        const cost = calculateCost(modelId, dailyTasks, stepsPerTask);
        const savings = selectedCost.monthly - cost.monthly;

        if (savings > 0 && model.quality >= selectedModel.quality - 1) {
            suggestions.push({
                modelId,
                model,
                cost,
                savings,
                type: savings > selectedCost.monthly * 0.3 ? 'high' : 'medium'
            });
        }
    }

    suggestions.sort((a, b) => b.savings - a.savings);
    return suggestions.slice(0, 3);
}

function generateResultCard(params, costResult) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 800;
        canvas.height = 500;

        const gradient = ctx.createLinearGradient(0, 0, 800, 500);
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(1, '#0f172a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.roundRect(20, 20, 760, 460, 16);
        ctx.fill();

        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 28px Arial, sans-serif';
        ctx.fillText('🦞 My OpenClaw Agent Cost', 50, 70);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '20px Arial, sans-serif';
        ctx.fillText(`Tasks per day: ${params.dailyTasks}`, 50, 120);
        ctx.fillText(`Steps per task: ${params.stepsPerTask}`, 50, 155);
        ctx.fillText(`Model: ${params.modelName}`, 50, 190);

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 230);
        ctx.lineTo(750, 230);
        ctx.stroke();

        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 42px Arial, sans-serif';
        ctx.fillText(`Daily Cost:  $${costResult.daily.toFixed(2)}`, 50, 300);

        ctx.fillStyle = '#fb7185';
        ctx.font = 'bold 42px Arial, sans-serif';
        ctx.fillText(`Monthly Cost: $${costResult.monthly.toFixed(2)}`, 50, 360);

        ctx.fillStyle = '#64748b';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText('Calculated with OpenClaw Cost Calculator', 50, 420);
        ctx.fillText('openclaw-hub.vercel.app', 50, 450);

        resolve(canvas);
    });
}

function downloadCard(canvas, filename = 'my-openclaw-cost.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function shareResult(params, costResult, canvas) {
    const shareData = {
        title: 'My OpenClaw Agent Cost',
        text: `Daily Cost: $${costResult.daily.toFixed(2)}, Monthly Cost: $${costResult.monthly.toFixed(2)}. Check your cost at openclaw-hub.vercel.app!`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.text + ' ' + shareData.url).then(() => {
            alert('已复制分享链接到剪贴板！');
        }).catch(() => {
            alert('分享失败，请手动复制链接');
        });
    } else {
        alert('您的浏览器不支持分享功能，请手动复制链接');
    }
}

function saveToHistory(params, costResult) {
    const history = getHistory();
    const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        params,
        costResult
    };
    history.unshift(entry);
    localStorage.setItem('costCalculatorHistory', JSON.stringify(history.slice(0, 20)));
}

function getHistory() {
    return JSON.parse(localStorage.getItem('costCalculatorHistory') || '[]');
}

function clearHistory() {
    localStorage.removeItem('costCalculatorHistory');
}

function get30DayTrend(dailyCost) {
    const labels = [];
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);

        const variation = 1 + (Math.random() - 0.5) * 0.1;
        data.push(dailyCost * variation);
    }

    return { labels, data };
}

function costCalculator() {
    return {
        selectedScenario: '',
        selectedModel: 'gpt-4o',
        dailyTasks: 35,
        stepsPerTask: 90,
        costResult: null,
        modelComparisons: [],
        suggestions: [],
        history: [],
        showHistory: false,
        showToast: false,
        toastMessage: '',
        chart: null,
        resultCard: null,

        init() {
            this.history = getHistory();
            this.calculate();
        },

        selectScenario(scenarioId) {
            if (scenarioId && scenarioPresets[scenarioId]) {
                this.selectedScenario = scenarioId;
                const preset = scenarioPresets[scenarioId];
                this.dailyTasks = preset.dailyTasks;
                this.stepsPerTask = preset.stepsPerTask;
                this.calculate();
            }
        },

        calculate() {
            this.costResult = calculateCost(this.selectedModel, this.dailyTasks, this.stepsPerTask);

            if (this.costResult) {
                this.modelComparisons = compareModels(this.dailyTasks, this.stepsPerTask, this.selectedModel);
                this.suggestions = getOptimizationSuggestions(this.selectedModel, this.dailyTasks, this.stepsPerTask);

                saveToHistory({
                    modelId: this.selectedModel,
                    modelName: modelPricing[this.selectedModel].name,
                    dailyTasks: this.dailyTasks,
                    stepsPerTask: this.stepsPerTask
                }, this.costResult);

                this.history = getHistory();

                if (typeof trackEvent === 'function') {
                    trackEvent('calculate_cost', {
                        model: this.selectedModel,
                        scenario: this.selectedScenario || 'custom',
                        cost: this.costResult.monthly
                    });
                }

                this.$nextTick(() => {
                    this.updateChart();
                });
            }
        },

        updateChart() {
            const ctx = document.getElementById('costChart');
            if (!ctx || !this.costResult) return;

            const trend = get30DayTrend(this.costResult.daily);

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: trend.labels,
                    datasets: [{
                        label: '每日成本 ($)',
                        data: trend.data,
                        borderColor: '#f43f5e',
                        backgroundColor: 'rgba(244, 63, 94, 0.15)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#f1f5f9'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#94a3b8'
                            },
                            grid: {
                                color: '#334155'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#94a3b8'
                            },
                            grid: {
                                color: '#334155'
                            }
                        }
                    }
                }
            });
        },

        async generateCard() {
            if (!this.costResult) return;

            const params = {
                modelName: modelPricing[this.selectedModel].name,
                dailyTasks: this.dailyTasks,
                stepsPerTask: this.stepsPerTask
            };

            this.resultCard = await generateResultCard(params, this.costResult);
        },

        async downloadPNG() {
            if (!this.resultCard) {
                await this.generateCard();
            }
            if (this.resultCard) {
                downloadCard(this.resultCard);
                this.showToastMessage('PNG 下载成功！');
            }
        },

        async share() {
            if (!this.costResult) return;

            const params = {
                modelName: modelPricing[this.selectedModel].name,
                dailyTasks: this.dailyTasks,
                stepsPerTask: this.stepsPerTask
            };

            if (!this.resultCard) {
                await this.generateCard();
            }

            shareResult(params, this.costResult, this.resultCard);
        },

        loadFromHistory(entry) {
            this.selectedModel = entry.params.modelId;
            this.dailyTasks = entry.params.dailyTasks;
            this.stepsPerTask = entry.params.stepsPerTask;
            this.selectedScenario = '';
            this.calculate();
        },

        clearAllHistory() {
            if (confirm('确定要清除所有历史记录吗？')) {
                clearHistory();
                this.history = [];
                this.showToastMessage('历史记录已清除！');
            }
        },

        showToastMessage(message) {
            this.toastMessage = message;
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 2000);
        },

        formatDate(isoString) {
            const date = new Date(isoString);
            return date.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };
}
