//AI-History.js
//This should be in utilities, but I want to keep all the AI  things in one place
const AI_HISTORY_KEY = 'ai_summaries_history';

export function getSummaryHistory() {
    const historyJson = localStorage.getItem(AI_HISTORY_KEY);
    try {
        return JSON.parse(historyJson) || [];
    } catch (e) {
        console.error("Could not parse AI summary history:", e);
        return [];
    }
}


export function addSummaryToHistory(summaryData) {
    const history = getSummaryHistory();
    
    //To assign a unique ID and add the data
    const newSummary = { 
        id: Date.now().toString(), 
        ...summaryData 
    };
    
    //To add the new summary to the front based on recent
    history.unshift(newSummary);
    
    //To limit history length to 10 entries
    const limitedHistory = history.slice(0, 10);

    localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(limitedHistory));
    
   
    document.dispatchEvent(new CustomEvent('summaryHistoryUpdated'));
}