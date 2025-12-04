//AI-Summary-Results.js

export class AISummaryResult extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.summaryData = this.getSummaryDataFromAttributes();
        this.render();
    }

    
    static get observedAttributes() {
        return ['summary-json'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'summary-json' && oldValue !== newValue) {
            this.summaryData = this.getSummaryDataFromAttributes();
            this.render();
        }
    }

    getSummaryDataFromAttributes() {
        const jsonString = this.getAttribute('summary-json');
        try {
            return JSON.parse(jsonString || '{}');
        } catch (e) {
            console.error('Error parsing summary-json attribute:', e);
            return {};
        }
    }

    
    generateHTML(data) {
        const activeTasks = data.activeTasks || [];
        const completedCount = data.completedCount || 0;
        const highPriorityActive = data.highPriorityActive || [];
        const lowPriorityCount = data.lowPriorityCount || 0;
        const timestamp = data.timestamp || 'N/A';

        if (activeTasks.length === 0) {
            return `
                <h3>🎉 All Tasks Complete!</h3>
                <p>You have zero active tasks. You've achieved peak productivity!</p>
                <p><strong>Total Completed:</strong> ${completedCount}</p>
            `;
        }

        let summaryHtml = `
            <h3>🎯 Current Task Focus</h3>
            <p>You currently have <strong>${activeTasks.length} active tasks</strong> and have completed <strong>${completedCount}</strong> tasks in total.</p>
            
            <h4>⚠️ Priority Tasks Due Soon:</h4>
            <ul class="summary-list">`;
        
        if (highPriorityActive.length > 0) {
            highPriorityActive.slice(0, 3).forEach(task => { 
                summaryHtml += `<li><strong>${task.title}</strong> (${task.dueDate || 'No Due Date'})</li>`;
            });
        } else {
            summaryHtml += `<li>No high priority tasks currently flagged.</li>`;
        }
        
        summaryHtml += `</ul>
            <h4>💡 AI Recommendation:</h4>
            <p>Focus your efforts on the **${highPriorityActive.length} High Priority tasks**. To maintain momentum, aim to clear at least one Medium or Low priority task today.</p>
        `;

        return summaryHtml;
    }

    render() {
        const data = this.summaryData;
        const coreHtml = this.generateHTML(data);
        
        this.shadowRoot.innerHTML = `
            <style>
                /* Encapsulated Styles for the Summary Result */
                :host {
                    display: block;
                   
                    border-radius: var(--radius);
                    background: linear-gradient(to bottom right in oklch, var(--color-blue-50), var(--color-indigo-50));
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                    border-color: var(--color-blue-200);
                }
                
                h3 {
                    font-size: 25px;
                    color: var(--color-blue-700);
                    border-bottom: 2px solid var(--color-blue-100);
                    padding-bottom: 8px;
                    margin-top: 0;
                    margin-bottom: 1rem;
                }

                h4 {
                    font-size: 18px;
                    color: var(--color-gray-900);
                    margin-top: 20px;
                    margin-bottom: 10px;
                }

                p {
                    margin-bottom: 0.5rem;
                    font-size: var(--text-lg);
                }

                .summary-container {
                padding: calc(var(--spacing) * 8);
                }

                .summary-list {
                    list-style: disc;
                    margin-left: 20px;
                    padding-left: 0;
                    color: var(--color-gray-700);
                }

                .summary-list li {
                    margin-bottom: 6px;
                    font-size: var(--text-lg);
                }

                .ai-footer {
                    margin-top: 20px;
                    font-size: var(--text-xs);
                    color: var(--color-gray-500);
                    text-align: right;
                    border-top: 1px dashed var(--color-gray-200);
                    padding-top: 10px;
                }
            </style>
            
            <div class="summary-container">
                ${coreHtml}
                <p class="ai-footer">Generated on ${data.timestamp || 'N/A'}</p>
            </div>
        `;
    }
}

