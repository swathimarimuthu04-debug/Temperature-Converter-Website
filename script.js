

document.addEventListener('DOMContentLoaded', () => {
  
  const tempInput = document.getElementById('temp-input');
  const unitSelect = document.getElementById('unit-select');
  const convertBtn = document.getElementById('convert-btn');
  const resetBtn = document.getElementById('reset-btn');
  const clearInputBtn = document.getElementById('clear-input-btn');
  const inputContainer = document.getElementById('input-container');
  const validationMsg = document.getElementById('validation-msg');
  const messageText = document.getElementById('message-text');


  const valCelsius = document.getElementById('val-celsius');
  const valFahrenheit = document.getElementById('val-fahrenheit');
  const valKelvin = document.getElementById('val-kelvin');

  const cardCelsius = document.getElementById('card-celsius');
  const cardFahrenheit = document.getElementById('card-fahrenheit');
  const cardKelvin = document.getElementById('card-kelvin');

  const gaugeBox = document.getElementById('gauge-box');
  const gaugeBadge = document.getElementById('gauge-badge');
  const gaugeFill = document.getElementById('gauge-fill');
  const formulaDetails = document.getElementById('formula-details');

  const presetChips = document.querySelectorAll('.chip');
  const copyButtons = document.querySelectorAll('.copy-btn');

 
  const ABSOLUTE_ZERO = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
  };

  
  function formatNumber(num) {
    if (isNaN(num)) return '--';
    const rounded = Math.round((num + Number.EPSILON) * 100) / 100;
    return rounded.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

  function showMessage(msg, type = 'error') {
    messageText.textContent = msg;
    validationMsg.className = `message-banner ${type}`;
    validationMsg.style.display = 'flex';
    inputContainer.classList.add('has-error');
    tempInput.setAttribute('aria-invalid', 'true');
  }

  function hideMessage() {
    messageText.textContent = '';
    validationMsg.style.display = 'none';
    validationMsg.className = 'message-banner';
    inputContainer.classList.remove('has-error');
    tempInput.setAttribute('aria-invalid', 'false');
  }

 
  function validateInput(rawStr, unit) {
    const trimmed = rawStr.trim();

    if (trimmed === '') {
      return { isValid: false, value: null, error: 'Please enter a temperature value to convert.' };
    }

    
    const numericRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)$/;
    if (!numericRegex.test(trimmed)) {
      return { isValid: false, value: null, error: 'Invalid input. Please enter a valid number (e.g. 25, -10.5).' };
    }

    const num = parseFloat(trimmed);

    if (isNaN(num)) {
      return { isValid: false, value: null, error: 'Could not parse the input as a valid number.' };
    }

    
    const limit = ABSOLUTE_ZERO[unit];
    const unitLabels = { celsius: '°C', fahrenheit: '°F', kelvin: 'K' };

    
    if (num < limit - 0.00001) {
      return {
        isValid: false,
        value: num,
        error: `Physical Limit Violation: ${num}${unitLabels[unit]} is below Absolute Zero (${limit}${unitLabels[unit]}). In physics, temperatures cannot drop below Absolute Zero.`
      };
    }

    return { isValid: true, value: num, error: null };
  }

 
  function convertTemperature(value, fromUnit) {
    let c = 0, f = 0, k = 0;
    let formulaHtml = '';

    if (fromUnit === 'celsius') {
      c = value;
      f = (c * 9 / 5) + 32;
      k = c + 273.15;

      formulaHtml = `
        <div class="formula-line">&bull; <strong>Fahrenheit:</strong> <code>(${c} &times; 9/5) + 32 = ${formatNumber(f)}°F</code></div>
        <div class="formula-line">&bull; <strong>Kelvin:</strong> <code>${c} + 273.15 = ${formatNumber(k)} K</code></div>
      `;
    } else if (fromUnit === 'fahrenheit') {
      f = value;
      c = (f - 32) * 5 / 9;
      k = ((f - 32) * 5 / 9) + 273.15;

      formulaHtml = `
        <div class="formula-line">&bull; <strong>Celsius:</strong> <code>(${f} &minus; 32) &times; 5/9 = ${formatNumber(c)}°C</code></div>
        <div class="formula-line">&bull; <strong>Kelvin:</strong> <code>((${f} &minus; 32) &times; 5/9) + 273.15 = ${formatNumber(k)} K</code></div>
      `;
    } else if (fromUnit === 'kelvin') {
      k = value;
      c = k - 273.15;
      f = ((k - 273.15) * 9 / 5) + 32;

      formulaHtml = `
        <div class="formula-line">&bull; <strong>Celsius:</strong> <code>${k} &minus; 273.15 = ${formatNumber(c)}°C</code></div>
        <div class="formula-line">&bull; <strong>Fahrenheit:</strong> <code>((${k} &minus; 273.15) &times; 9/5) + 32 = ${formatNumber(f)}°F</code></div>
      `;
    }

    return { c, f, k, formulaHtml };
  }

  
  function getThermalState(celsius) {
    if (celsius <= -273) {
      return { text: 'Absolute Zero', color: '#93c5fd', percent: 2 };
    } else if (celsius < -40) {
      return { text: 'Extreme Cryogenic', color: '#38bdf8', percent: 12 };
    } else if (celsius <= 0) {
      return { text: 'Freezing', color: '#06b6d4', percent: 25 };
    } else if (celsius < 15) {
      return { text: 'Cool / Chilly', color: '#3b82f6', percent: 40 };
    } else if (celsius <= 25) {
      return { text: 'Room Temperature', color: '#10b981', percent: 55 };
    } else if (celsius <= 37) {
      return { text: 'Body Warmth', color: '#84cc16', percent: 68 };
    } else if (celsius < 100) {
      return { text: 'Hot', color: '#f59e0b', percent: 82 };
    } else if (celsius === 100) {
      return { text: 'Water Boiling Point', color: '#ef4444', percent: 92 };
    } else {
      return { text: 'Extreme Heat', color: '#dc2626', percent: 100 };
    }
  }


  function updateActiveCard(fromUnit) {
    [cardCelsius, cardFahrenheit, cardKelvin].forEach(card => card.classList.remove('is-source'));
    if (fromUnit === 'celsius') cardCelsius.classList.add('is-source');
    if (fromUnit === 'fahrenheit') cardFahrenheit.classList.add('is-source');
    if (fromUnit === 'kelvin') cardKelvin.classList.add('is-source');
  }

  
  function clearResults() {
    valCelsius.textContent = '--';
    valFahrenheit.textContent = '--';
    valKelvin.textContent = '--';
    gaugeBox.style.display = 'none';
    formulaDetails.innerHTML = 'Enter a valid temperature above and click <strong>Convert</strong> to see full step-by-step mathematical calculations.';
  }

  
  function executeConversion(showErrors = true) {
    const rawVal = tempInput.value;
    const unit = unitSelect.value;

    updateActiveCard(unit);

 
    if (rawVal.trim() === '') {
      clearResults();
      if (showErrors) {
        showMessage('Please enter a temperature value before converting.', 'warning');
      } else {
        hideMessage();
      }
      return false;
    }

    const validation = validateInput(rawVal, unit);

    if (!validation.isValid) {
      clearResults();
      if (showErrors) {
        showMessage(validation.error, 'error');
      }
      return false;
    }

    hideMessage();

   
    const { c, f, k, formulaHtml } = convertTemperature(validation.value, unit);

    
    valCelsius.textContent = formatNumber(c);
    valFahrenheit.textContent = formatNumber(f);
    valKelvin.textContent = formatNumber(k);

  
    const thermalState = getThermalState(c);
    gaugeBox.style.display = 'flex';
    gaugeBadge.textContent = thermalState.text;
    gaugeBadge.style.color = thermalState.color;
    gaugeBadge.style.backgroundColor = `${thermalState.color}26`;
    gaugeFill.style.width = `${thermalState.percent}%`;

 
    formulaDetails.innerHTML = formulaHtml;

    return true;
  }

  

 
  tempInput.addEventListener('input', () => {
    
    if (tempInput.value.length > 0) {
      clearInputBtn.style.display = 'flex';
    } else {
      clearInputBtn.style.display = 'none';
      hideMessage();
      clearResults();
      return;
    }

    
    executeConversion(false);
  });

 
  convertBtn.addEventListener('click', () => {
    executeConversion(true);
  });

  
  tempInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeConversion(true);
    }
  });

  
  unitSelect.addEventListener('change', () => {
    updateActiveCard(unitSelect.value);
    if (tempInput.value.trim() !== '') {
      executeConversion(true);
    }
  });

  
  clearInputBtn.addEventListener('click', () => {
    tempInput.value = '';
    clearInputBtn.style.display = 'none';
    hideMessage();
    clearResults();
    tempInput.focus();
  });

  
  resetBtn.addEventListener('click', () => {
    tempInput.value = '';
    unitSelect.value = 'celsius';
    clearInputBtn.style.display = 'none';
    hideMessage();
    clearResults();
    updateActiveCard('celsius');
    tempInput.focus();
  });

  
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-val');
      const unit = chip.getAttribute('data-unit') || 'celsius';
      
      tempInput.value = val;
      unitSelect.value = unit;
      clearInputBtn.style.display = 'flex';
      
      executeConversion(true);
    });
  });

 
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const symbol = btn.getAttribute('data-symbol') || '';
      const targetElem = document.getElementById(targetId);

      if (!targetElem || targetElem.textContent === '--') return;

      const fullText = `${targetElem.textContent} ${symbol}`.trim();

      try {
        await navigator.clipboard.writeText(fullText);
      } catch (err) {
       
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      
      btn.classList.add('copied');
      const tooltip = btn.querySelector('.copy-tooltip');
      if (tooltip) tooltip.textContent = 'Copied!';

      setTimeout(() => {
        btn.classList.remove('copied');
        if (tooltip) tooltip.textContent = 'Copy';
      }, 1500);
    });
  });

  
  updateActiveCard(unitSelect.value);
});

