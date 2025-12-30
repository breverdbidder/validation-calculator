import React, { useState } from 'react';
import './App.css';

function App() {
  const [phase, setPhase] = useState('landing');
  const [formData, setFormData] = useState({
    // Phase 0
    painRating: 5,
    visits: 0,
    conversions: 0,
    interviews: 0,
    wouldPay: 0,
    tam: 0,
    // Qualitative
    featureRequests: false,
    urgency: false,
    referrals: false,
    emotional: false,
    // Warnings
    niceToHave: false,
    noUrgency: false,
    priceSensitive: false,
    cantArticulate: false,
  });
  
  const [result, setResult] = useState(null);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateDecision = () => {
    const { visits, conversions, interviews, wouldPay, tam } = formData;
    
    // Quantitative thresholds
    const conversionRate = visits > 0 ? (conversions / visits * 100) : 0;
    const wouldPayPct = interviews > 0 ? (wouldPay / interviews * 100) : 0;
    
    const quant1 = visits >= 500;
    const quant2 = conversionRate >= 3 && conversionRate <= 10;
    const quant3 = interviews >= 15;
    const quant4 = wouldPayPct >= 30;
    const quantScore = [quant1, quant2, quant3, quant4].filter(Boolean).length;
    
    // Qualitative signals
    const signals = [
      formData.featureRequests,
      formData.urgency,
      formData.referrals,
      formData.emotional
    ].filter(Boolean).length;
    
    // Warnings
    const warnings = [
      formData.niceToHave,
      formData.noUrgency,
      formData.priceSensitive,
      formData.cantArticulate
    ].filter(Boolean).length;
    
    const tamMet = tam >= 10;
    
    // Decision logic
    let decision, color, action;
    
    if (quantScore === 4 && signals >= 3 && tamMet && warnings === 0) {
      decision = 'GREEN - BUILD MVP';
      color = '#10b981';
      action = 'Proceed to Phase 5 (Pre-Build Preparation). All conditions met!';
    } else if (quantScore >= 2 && signals >= 1) {
      decision = 'YELLOW - PIVOT';
      color = '#f59e0b';
      action = 'Reframe positioning and retest (1 week). Mixed signals detected.';
    } else {
      decision = 'RED - KILL IDEA';
      color = '#ef4444';
      action = 'Document lessons learned and move on. Insufficient validation.';
    }
    
    setResult({
      decision,
      color,
      action,
      metrics: {
        visits,
        conversionRate: conversionRate.toFixed(1),
        interviews,
        wouldPayPct: wouldPayPct.toFixed(0),
        tam,
        quantScore,
        signals,
        warnings
      }
    });
    
    setPhase('result');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚀 Startup Validation Calculator</h1>
        <p>Make evidence-based go/no-go decisions in 40 days</p>
      </header>

      {phase === 'landing' && (
        <div className="landing">
          <div className="hero">
            <h2>Stop Guessing. Start Validating.</h2>
            <p>Use the Enhanced 40-Day Framework to validate your startup idea before writing code.</p>
            <div className="stats">
              <div className="stat">
                <div className="stat-number">85%+</div>
                <div className="stat-label">Accurate Decisions</div>
              </div>
              <div className="stat">
                <div className="stat-number">40 Days</div>
                <div className="stat-label">To Full Validation</div>
              </div>
              <div className="stat">
                <div className="stat-number">$100-600</div>
                <div className="stat-label">Total Cost</div>
              </div>
            </div>
            <button className="cta-button" onClick={() => setPhase('calculator')}>
              Calculate Your Decision →
            </button>
          </div>
          
          <div className="features">
            <h3>What You'll Get</h3>
            <div className="feature-grid">
              <div className="feature">
                <h4>📊 Quantitative Thresholds</h4>
                <p>Clear metrics: 500+ visits, 3-5% conversion, 15+ interviews, 30%+ would pay</p>
              </div>
              <div className="feature">
                <h4>🎯 Qualitative Signals</h4>
                <p>Pattern recognition from feature requests, urgency, referrals, emotional intensity</p>
              </div>
              <div className="feature">
                <h4>⚠️ Warning Detection</h4>
                <p>Identify red flags early: price sensitivity, low priority, market education needs</p>
              </div>
              <div className="feature">
                <h4>🟢🟡🔴 Decision Matrix</h4>
                <p>GREEN (build), YELLOW (pivot), RED (kill) with clear next actions</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'calculator' && (
        <div className="calculator">
          <h2>Phase 4: Go/No-Go Decision</h2>
          <p className="subtitle">Enter your validation data from the past 30 days</p>
          
          <div className="form-section">
            <h3>📊 Quantitative Metrics</h3>
            
            <div className="form-group">
              <label>Landing Page Visits (need 500+)</label>
              <input
                type="number"
                value={formData.visits}
                onChange={(e) => updateField('visits', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="form-group">
              <label>CTA Conversions (total clicks)</label>
              <input
                type="number"
                value={formData.conversions}
                onChange={(e) => updateField('conversions', parseInt(e.target.value) || 0)}
              />
              {formData.visits > 0 && (
                <div className="hint">
                  Current rate: {(formData.conversions / formData.visits * 100).toFixed(1)}% 
                  (need 3-5%)
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>User Interviews Completed (need 15+)</label>
              <input
                type="number"
                value={formData.interviews}
                onChange={(e) => updateField('interviews', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="form-group">
              <label>Said "Would Pay" in Interviews</label>
              <input
                type="number"
                value={formData.wouldPay}
                onChange={(e) => updateField('wouldPay', parseInt(e.target.value) || 0)}
              />
              {formData.interviews > 0 && (
                <div className="hint">
                  Current rate: {(formData.wouldPay / formData.interviews * 100).toFixed(0)}%
                  (need 30%+)
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Total Addressable Market ($M)</label>
              <input
                type="number"
                value={formData.tam}
                onChange={(e) => updateField('tam', parseFloat(e.target.value) || 0)}
              />
              <div className="hint">Need $10M+ TAM</div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>🎯 Qualitative Strong Signals (need 3+)</h3>
            
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.featureRequests}
                  onChange={(e) => updateField('featureRequests', e.target.checked)}
                />
                Unprompted feature requests
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={formData.urgency}
                  onChange={(e) => updateField('urgency', e.target.checked)}
                />
                Users asking "when can I buy?"
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={formData.referrals}
                  onChange={(e) => updateField('referrals', e.target.checked)}
                />
                Referrals to others with problem
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={formData.emotional}
                  onChange={(e) => updateField('emotional', e.target.checked)}
                />
                Emotional intensity in interviews
              </label>
            </div>
          </div>
          
          <div className="form-section">
            <h3>⚠️ Warning Signals</h3>
            
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.niceToHave}
                  onChange={(e) => updateField('niceToHave', e.target.checked)}
                />
                Hearing "nice to have" language
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={formData.noUrgency}
                  onChange={(e) => updateField('noUrgency', e.target.checked)}
                />
                No urgency to solve now
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={formData.priceSensitive}
                  onChange={(e) => updateField('priceSensitive', e.target.checked)}
                />
                Price sensitivity dominates
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={formData.cantArticulate}
                  onChange={(e) => updateField('cantArticulate', e.target.checked)}
                />
                Can't articulate problem clearly
              </label>
            </div>
          </div>
          
          <button className="calculate-button" onClick={calculateDecision}>
            Calculate Decision →
          </button>
        </div>
      )}

      {phase === 'result' && result && (
        <div className="result">
          <div className="result-header" style={{ backgroundColor: result.color }}>
            <h2>{result.decision}</h2>
            <p>{result.action}</p>
          </div>
          
          <div className="result-details">
            <h3>Your Validation Metrics</h3>
            
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value">{result.metrics.visits}</div>
                <div className="metric-label">Visits</div>
                <div className="metric-status">
                  {result.metrics.visits >= 500 ? '✅' : '❌'} Need 500+
                </div>
              </div>
              
              <div className="metric">
                <div className="metric-value">{result.metrics.conversionRate}%</div>
                <div className="metric-label">Conversion</div>
                <div className="metric-status">
                  {parseFloat(result.metrics.conversionRate) >= 3 ? '✅' : '❌'} Need 3-5%
                </div>
              </div>
              
              <div className="metric">
                <div className="metric-value">{result.metrics.interviews}</div>
                <div className="metric-label">Interviews</div>
                <div className="metric-status">
                  {result.metrics.interviews >= 15 ? '✅' : '❌'} Need 15+
                </div>
              </div>
              
              <div className="metric">
                <div className="metric-value">{result.metrics.wouldPayPct}%</div>
                <div className="metric-label">Would Pay</div>
                <div className="metric-status">
                  {parseInt(result.metrics.wouldPayPct) >= 30 ? '✅' : '❌'} Need 30%+
                </div>
              </div>
              
              <div className="metric">
                <div className="metric-value">${result.metrics.tam}M</div>
                <div className="metric-label">TAM</div>
                <div className="metric-status">
                  {result.metrics.tam >= 10 ? '✅' : '❌'} Need $10M+
                </div>
              </div>
            </div>
            
            <div className="scores">
              <div className="score-item">
                <strong>Quantitative Score:</strong> {result.metrics.quantScore}/4
              </div>
              <div className="score-item">
                <strong>Strong Signals:</strong> {result.metrics.signals}/4
              </div>
              <div className="score-item">
                <strong>Warning Signals:</strong> {result.metrics.warnings}/4
              </div>
            </div>
          </div>
          
          <div className="actions">
            <button onClick={() => setPhase('calculator')} className="secondary-button">
              ← Adjust Numbers
            </button>
            <button onClick={() => setPhase('landing')} className="secondary-button">
              Start Over
            </button>
            <a 
              href="https://github.com/breverdbidder/life-os/tree/main/docs/validation_framework" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button"
            >
              Download Full Framework →
            </a>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Created by Ariel Shapira | Enhanced 40-Day Validation Framework</p>
        <p>
          <a href="https://github.com/breverdbidder/life-os/tree/main/docs/validation_framework">
            View Framework on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
