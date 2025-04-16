// Global variables
let feedbackDatabase = [];

// Sample budget data for demonstration
const budgetData = {
    labels: ['Healthcare', 'Infrastructure', 'Education', 'Defense', 'Agriculture', 'Social Welfare'],
    datasets: [{
        label: 'Budget Allocation (in Crores)',
        data: [50000, 45000, 40000, 35000, 30000, 25000],
        backgroundColor: [
            'rgba(33, 150, 243, 0.7)',
            'rgba(76, 175, 80, 0.7)',
            'rgba(255, 152, 0, 0.7)',
            'rgba(156, 39, 176, 0.7)',
            'rgba(233, 30, 99, 0.7)',
            'rgba(0, 150, 136, 0.7)'
        ],
        borderColor: [
            'rgba(33, 150, 243, 1)',
            'rgba(76, 175, 80, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(156, 39, 176, 1)',
            'rgba(233, 30, 99, 1)',
            'rgba(0, 150, 136, 1)'
        ],
        borderWidth: 2
    }]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Show loader for 2 seconds
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('login-page').classList.remove('hidden');
    }, 2000);

    // Initialize chart when dashboard is shown
    initializeChart();
    
    // Add event listeners for the login forms
    document.getElementById('mobile-auth-form').addEventListener('submit', handleLogin);
    document.getElementById('email-auth-form').addEventListener('submit', handleLogin);
    
    // Add event listener for auth form to load historical data after login
    document.getElementById('mobile-auth-form').addEventListener('submit', (e) => {
        // The existing login handler will run first
        // Load historical data once dashboard is shown
        setTimeout(() => {
            showHistoricalBudget();
        }, 800); // Wait a bit for the dashboard animation to complete
    });
    
    document.getElementById('email-auth-form').addEventListener('submit', (e) => {
        // The existing login handler will run first
        // Load historical data once dashboard is shown
        setTimeout(() => {
            showHistoricalBudget();
        }, 800); // Wait a bit for the dashboard animation to complete
    });
});

// Select user type (public or government)
function selectUserType(type) {
    document.querySelectorAll('.user-type-card').forEach(card => {
        card.classList.remove('active');
    });
    
    document.querySelector(`.user-type-card:nth-child(${type === 'public' ? '1' : '2'})`).classList.add('active');
}

// Switch between mobile and email login tabs
function switchLoginTab(tab) {
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
    });
    
    document.querySelector(`.tab:nth-child(${tab === 'mobile' ? '1' : '2'})`).classList.add('active');
    
    if (tab === 'mobile') {
        document.getElementById('mobile-login').classList.remove('hidden');
        document.getElementById('email-login').classList.add('hidden');
    } else {
        document.getElementById('mobile-login').classList.add('hidden');
        document.getElementById('email-login').classList.remove('hidden');
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    // Get the user type
    const isPublicUser = document.querySelector('.user-type-card:nth-child(1)').classList.contains('active');
    
    // Show loading effect on button
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate login delay
    setTimeout(() => {
        // Add transition effect
        document.getElementById('login-page').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('login-page').classList.add('hidden');
            
            // Show appropriate dashboard based on user type
            if (isPublicUser) {
                document.getElementById('public-dashboard').classList.remove('hidden');
                document.getElementById('public-dashboard').style.opacity = '1';
                
                // Load the public dashboard data
                initializePublicDashboard();
            } else {
                document.getElementById('dashboard').classList.remove('hidden');
                document.getElementById('dashboard').style.opacity = '1';
            }
            
            // Reset the form for next login
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 500);
    }, 1000);
}

// Show signup form
function showSignupForm() {
    document.querySelector('.login-container').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

// Back to login function
function backToLogin() {
    document.getElementById('signup-form').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
}

// Show historical budget data
function showHistoricalBudget() {
    const year = document.getElementById('history-year').value;
    
    // Use mock data instead of API call
    try {
        // Generate mock historical data
        const mockData = generateMockHistoricalData(parseInt(year));
        
        // Update the total budget display
        const formattedTotal = new Intl.NumberFormat('en-IN').format(mockData.totalBudget);
        document.getElementById('history-total-amount').textContent = `₹${formattedTotal} Crores`;
        
        // Update sector cards with historical data
        updateSectorCards(mockData.sectors);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load historical budget data. Please try again.');
    }
}

// Generate mock historical budget data
function generateMockHistoricalData(year) {
    // Base budget amount (varies by year)
    const baseBudgetByYear = {
        2019: 180000,
        2020: 195000,
        2021: 205000,
        2022: 215000,
        2023: 225000
    };
    
    const totalBudget = baseBudgetByYear[year] || 200000; // Default if year not found
    
    // Generate sectors with historical percentages based on the year
    let sectors = [];
    
    switch(year) {
        case 2019:
            sectors = [
                { sector: 'Healthcare', percentage: 18.2 },
                { sector: 'Infrastructure', percentage: 23.5 },
                { sector: 'Education', percentage: 16.8 },
                { sector: 'Defence', percentage: 17.5 },
                { sector: 'Agriculture', percentage: 13.0 },
                { sector: 'Social Welfare', percentage: 11.0 }
            ];
            break;
        case 2020:
            sectors = [
                { sector: 'Healthcare', percentage: 22.6 }, // Increased due to pandemic
                { sector: 'Infrastructure', percentage: 21.0 },
                { sector: 'Education', percentage: 15.4 },
                { sector: 'Defence', percentage: 16.5 },
                { sector: 'Agriculture', percentage: 13.5 },
                { sector: 'Social Welfare', percentage: 11.0 }
            ];
            break;
        case 2021:
            sectors = [
                { sector: 'Healthcare', percentage: 23.8 }, // Still high due to pandemic
                { sector: 'Infrastructure', percentage: 20.2 },
                { sector: 'Education', percentage: 16.0 },
                { sector: 'Defence', percentage: 16.0 },
                { sector: 'Agriculture', percentage: 13.0 },
                { sector: 'Social Welfare', percentage: 11.0 }
            ];
            break;
        case 2022:
            sectors = [
                { sector: 'Healthcare', percentage: 22.0 },
                { sector: 'Infrastructure', percentage: 21.0 },
                { sector: 'Education', percentage: 17.5 },
                { sector: 'Defence', percentage: 15.5 },
                { sector: 'Agriculture', percentage: 13.0 },
                { sector: 'Social Welfare', percentage: 11.0 }
            ];
            break;
        case 2023:
        default:
            sectors = [
                { sector: 'Healthcare', percentage: 22.2 },
                { sector: 'Infrastructure', percentage: 20.0 },
                { sector: 'Education', percentage: 17.8 },
                { sector: 'Defence', percentage: 15.6 },
                { sector: 'Agriculture', percentage: 13.4 },
                { sector: 'Social Welfare', percentage: 11.0 }
            ];
            break;
    }
    
    // Calculate amounts based on percentages
    const sectorsWithAmounts = sectors.map(sector => {
        const amount = Math.round(totalBudget * sector.percentage / 100);
        return {
            sector: sector.sector,
            percentage: sector.percentage,
            amount: amount
        };
    });
    
    return {
        totalBudget: totalBudget,
        year: year,
        sectors: sectorsWithAmounts
    };
}

// Distribute custom budget using AI
function distributeCustomBudget() {
    const customBudget = parseFloat(document.getElementById('custom-budget').value);
    
    if (isNaN(customBudget) || customBudget <= 0) {
        alert('Please enter a valid budget amount');
        return;
    }
    
    const distributeBtn = document.getElementById('distribute-btn');
    
    // Disable button during API call
    distributeBtn.disabled = true;
    distributeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Distributing...';
    
    // Use mock data instead of API call
    setTimeout(() => {
        try {
            // Generate mock distribution data
            const mockData = generateMockBudgetDistribution(customBudget);
            
            // Update the main budget amount
            const formattedAmount = new Intl.NumberFormat('en-IN').format(mockData.totalBudget);
            document.querySelector('.budget-amount').textContent = `₹${formattedAmount} Crores`;
            
            // Show success message
            const forecastMessage = document.getElementById('forecast-message');
            forecastMessage.classList.remove('hidden');
            forecastMessage.style.backgroundColor = '#4CAF50';
            document.getElementById('forecast-text').textContent = mockData.message;
            
            // Update sector cards
            updateSectorCards(mockData.sectors);
        } catch (error) {
            console.error('Error:', error);
            // Show error message
            const forecastMessage = document.getElementById('forecast-message');
            forecastMessage.classList.remove('hidden');
            forecastMessage.style.backgroundColor = '#F44336';
            document.getElementById('forecast-text').textContent = 'Error distributing budget. Please try again.';
        } finally {
            // Re-enable the button
            distributeBtn.disabled = false;
            distributeBtn.innerHTML = '<i class="fas fa-chart-pie"></i> Distribute Budget';
        }
    }, 1500); // Simulate API delay
}

// Generate mock budget distribution data
function generateMockBudgetDistribution(totalBudget) {
    // Define sector names and their base percentages
    const sectors = [
        { sector: 'Healthcare', basePercentage: 22 },
        { sector: 'Infrastructure', basePercentage: 20 },
        { sector: 'Education', basePercentage: 18 },
        { sector: 'Defence', basePercentage: 15 },
        { sector: 'Agriculture', basePercentage: 13 },
        { sector: 'Social Welfare', basePercentage: 12 }
    ];
    
    // Add some randomness to percentages while keeping total close to 100%
    let totalPercentage = 0;
    const adjustedSectors = sectors.map(sector => {
        // Add slight variation to each percentage (-1 to +1)
        const variation = (Math.random() * 2 - 1).toFixed(1);
        const percentage = Math.max(5, sector.basePercentage + parseFloat(variation));
        totalPercentage += percentage;
        return {
            sector: sector.sector,
            percentage: percentage
        };
    });
    
    // Normalize percentages to ensure they sum to 100%
    const normalizedSectors = adjustedSectors.map(sector => {
        const normalizedPercentage = (sector.percentage / totalPercentage * 100).toFixed(2);
        const amount = Math.round(totalBudget * normalizedPercentage / 100);
        return {
            sector: sector.sector,
            percentage: parseFloat(normalizedPercentage),
            amount: amount
        };
    });
    
    // Generate a message for the distribution
    const messages = [
        `Budget of ₹${totalBudget.toLocaleString('en-IN')} Crores optimally distributed across sectors.`,
        `AI-based distribution completed for ₹${totalBudget.toLocaleString('en-IN')} Crores budget.`,
        `Budget allocation optimized with focus on high-priority sectors.`,
        `Custom budget of ₹${totalBudget.toLocaleString('en-IN')} Crores successfully distributed.`
    ];
    
    return {
        totalBudget: totalBudget,
        message: messages[Math.floor(Math.random() * messages.length)],
        sectors: normalizedSectors
    };
}

// Helper function to update sector cards
function updateSectorCards(sectorsData) {
    const sectorCards = document.querySelectorAll('.sector-card');
    
    sectorsData.forEach((sectorData, index) => {
        if (index < sectorCards.length) {
            const card = sectorCards[index];
            
            // Update sector name
            card.querySelector('h4').textContent = sectorData.sector;
            
            // Update amount
            const formattedAmount = new Intl.NumberFormat('en-IN').format(sectorData.amount);
            card.querySelector('.sector-amount').textContent = `₹${formattedAmount} Cr`;
            
            // Update percentage
            card.querySelector('.sector-percentage').textContent = `${sectorData.percentage}%`;
            
            // Add animation effect
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'slideIn 0.5s ease forwards';
            card.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    // Update the icons to match the sectors
    const iconMapping = {
        'Healthcare': 'fa-hospital',
        'Education': 'fa-graduation-cap',
        'Defence': 'fa-shield-alt',
        'Infrastructure': 'fa-road',
        'Agriculture': 'fa-tractor',
        'Environment': 'fa-leaf',
        'Social Welfare': 'fa-hands-helping'
    };
    
    sectorsData.forEach((sectorData, index) => {
        if (index < sectorCards.length) {
            const card = sectorCards[index];
            const icon = card.querySelector('i');
            const iconClass = iconMapping[sectorData.sector] || 'fa-chart-pie';
            
            // Replace icon class while keeping the "fas" class
            icon.className = '';
            icon.classList.add('fas', iconClass);
        }
    });
}

// Generate budget forecast using AI model
function generateBudgetForecast() {
    const forecastYear = document.getElementById('forecast-year').value;
    const forecastButton = document.getElementById('forecast-button');
    
    // Disable button during API call
    forecastButton.disabled = true;
    forecastButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    
    // Use mock data instead of API call
    setTimeout(() => {
        try {
            // Generate mock forecast data
            const mockData = generateMockForecastData(parseInt(forecastYear));
            
            // Update budget year text
            document.querySelector('.budget-year').textContent = `Fiscal Year ${mockData.year}-${mockData.year + 1}`;
            
            // Show forecast message
            const forecastMessage = document.getElementById('forecast-message');
            forecastMessage.classList.remove('hidden');
            forecastMessage.style.backgroundColor = '#4CAF50';
            document.getElementById('forecast-text').textContent = mockData.message;
            
            // Update sector cards
            updateSectorCards(mockData.sectors);
        } catch (error) {
            console.error('Error:', error);
            // Show error message
            const forecastMessage = document.getElementById('forecast-message');
            forecastMessage.classList.remove('hidden');
            forecastMessage.style.backgroundColor = '#F44336';
            document.getElementById('forecast-text').textContent = 'Error generating forecast. Please try again.';
        } finally {
            // Re-enable the button
            forecastButton.disabled = false;
            forecastButton.innerHTML = '<i class="fas fa-chart-line"></i> Generate AI Forecast';
        }
    }, 1800); // Simulate API delay
}

// Generate mock forecast data
function generateMockForecastData(year) {
    // Base budget amount
    const baseBudget = 225000;
    
    // Generate growth factor based on the year (each year has slightly higher budget)
    const growthFactors = {
        2024: 1.045, // 4.5% increase
        2025: 1.078, // 7.8% increase
        2026: 1.095, // 9.5% increase
        2027: 1.112, // 11.2% increase
        2028: 1.137  // 13.7% increase
    };
    
    const growthFactor = growthFactors[year] || 1.05; // Default 5% if not found
    const totalBudget = Math.round(baseBudget * growthFactor);
    
    // Generate sectors with varying percentages based on the forecast year
    let sectors = [];
    
    // Adjust priorities based on the year
    if (year <= 2025) {
        // Near-term focus on healthcare and infrastructure
        sectors = [
            { sector: 'Healthcare', percentage: 24.3, priority: 1 },
            { sector: 'Infrastructure', percentage: 22.5, priority: 2 },
            { sector: 'Education', percentage: 17.8, priority: 3 },
            { sector: 'Defence', percentage: 15.2, priority: 4 },
            { sector: 'Agriculture', percentage: 11.2, priority: 5 },
            { sector: 'Social Welfare', percentage: 9.0, priority: 6 }
        ];
    } else if (year <= 2027) {
        // Mid-term focus on education and sustainable development
        sectors = [
            { sector: 'Education', percentage: 23.6, priority: 1 },
            { sector: 'Healthcare', percentage: 20.8, priority: 2 },
            { sector: 'Infrastructure', percentage: 19.5, priority: 3 },
            { sector: 'Agriculture', percentage: 14.8, priority: 4 },
            { sector: 'Defence', percentage: 12.3, priority: 5 },
            { sector: 'Social Welfare', percentage: 9.0, priority: 6 }
        ];
    } else {
        // Long-term focus on technology and innovation
        sectors = [
            { sector: 'Education', percentage: 24.5, priority: 1 },
            { sector: 'Infrastructure', percentage: 22.0, priority: 2 },
            { sector: 'Healthcare', percentage: 18.5, priority: 3 },
            { sector: 'Agriculture', percentage: 14.0, priority: 4 },
            { sector: 'Defence', percentage: 11.0, priority: 5 },
            { sector: 'Social Welfare', percentage: 10.0, priority: 6 }
        ];
    }
    
    // Add slight variation and calculate amounts
    let totalPercentage = 0;
    const sectorsWithVariation = sectors.map(sector => {
        // Add slight variation to each percentage (-0.5 to +0.5)
        const variation = (Math.random() - 0.5).toFixed(2);
        const adjustedPercentage = Math.max(5, parseFloat((sector.percentage + parseFloat(variation)).toFixed(2)));
        totalPercentage += adjustedPercentage;
        return {
            ...sector,
            percentage: adjustedPercentage
        };
    });
    
    // Normalize percentages to ensure they sum to 100%
    const sectorsWithAmounts = sectorsWithVariation.map(sector => {
        const normalizedPercentage = (sector.percentage / totalPercentage * 100).toFixed(2);
        const amount = Math.round(totalBudget * parseFloat(normalizedPercentage) / 100);
        return {
            sector: sector.sector,
            percentage: parseFloat(normalizedPercentage),
            amount: amount
        };
    });
    
    // Generate forecast messages based on the year
    let message = '';
    if (year <= 2025) {
        message = `AI forecast predicts a focus on healthcare and infrastructure development for ${year}.`;
    } else if (year <= 2027) {
        message = `${year} budget forecast shows increased allocation to education and agriculture sectors.`;
    } else {
        message = `Long-term ${year} forecast indicates strategic investment in education and technology.`;
    }
    
    return {
        year: year,
        totalBudget: totalBudget,
        message: message,
        sectors: sectorsWithAmounts
    };
}

// Show login form
function showLoginForm(type) {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.querySelector('.login-options').classList.add('hidden');
    
    // Add animation
    const form = document.getElementById('login-form');
    form.style.animation = 'none';
    form.offsetHeight; // Trigger reflow
    form.style.animation = 'fadeIn 0.5s ease';
}

// Logout function
function logout() {
    document.getElementById('dashboard').style.opacity = '0';
    document.getElementById('public-dashboard').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('public-dashboard').classList.add('hidden');
        document.getElementById('login-page').classList.remove('hidden');
        document.getElementById('login-page').style.opacity = '1';
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('signup-form').classList.add('hidden');
        document.querySelector('.login-options').classList.remove('hidden');
    }, 500);
}

// Show different sections in dashboard
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // Update active state in sidebar
    const navItems = document.querySelectorAll('.sidebar li');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(sectionId)) {
            item.classList.add('active');
        }
    });
    
    // Initialize visualizations if needed
    if (sectionId === 'budget-analysis') {
        initializeChart();
    } else if (sectionId === 'voting-analysis') {
        // Initialize feedback system if needed
        if (typeof initializeSampleFeedback === 'function' && 
            (!feedbackDatabase || feedbackDatabase.length === 0)) {
            initializeSampleFeedback();
            document.getElementById('feedback-results').classList.remove('hidden');
        }
    }
    
    // Show chart container when analytics is selected
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartContainer.style.display = sectionId === 'budget-analysis' ? 'block' : 'none';
    }
}

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: budgetData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (in Crores)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Budget Allocation by Sector',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 30
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 15,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    }
                }
            }
        }
    });
}

// Sample disaster fund prediction function
function predictDisasterFunds() {
    const predictions = {
        'Natural Disasters': {
            amount: '₹10,000 Crores',
            risk: 'High',
            trend: 'Increasing'
        },
        'Health Emergencies': {
            amount: '₹5,000 Crores',
            risk: 'Medium',
            trend: 'Stable'
        },
        'Infrastructure Damage': {
            amount: '₹7,500 Crores',
            risk: 'Low',
            trend: 'Decreasing'
        }
    };
    
    const container = document.querySelector('.prediction-container');
    container.innerHTML = '';
    
    for (const [category, data] of Object.entries(predictions)) {
        const predictionCard = document.createElement('div');
        predictionCard.className = 'prediction-card';
        predictionCard.innerHTML = `
            <h4>${category}</h4>
            <div class="prediction-details">
                <p><strong>Predicted Allocation:</strong> ${data.amount}</p>
                <p><strong>Risk Level:</strong> <span class="risk-${data.risk.toLowerCase()}">${data.risk}</span></p>
                <p><strong>Trend:</strong> <span class="trend-${data.trend.toLowerCase()}">${data.trend}</span></p>
            </div>
        `;
        container.appendChild(predictionCard);
    }
}

// Tax optimization function
function optimizeTaxes() {
    const economicCondition = document.getElementById('economic-condition').value;
    const revenueTarget = parseFloat(document.getElementById('revenue-target').value);
    
    if (isNaN(revenueTarget) || revenueTarget <= 0) {
        alert('Please enter a valid revenue target');
        return;
    }
    
    // Show loading state
    document.getElementById('projected-revenue').textContent = 'Calculating...';
    document.querySelector('.optimization-results').classList.remove('hidden');
    document.getElementById('optimize-btn').disabled = true;
    
    // MODIFIED: Use mock data instead of API call for demonstration
    setTimeout(() => {
        try {
            // Create mock data based on user input
            const mockData = generateMockTaxData(economicCondition, revenueTarget);
            
            // Format the projected revenue with commas
            const formattedAmount = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(mockData.totalProjectedRevenue);
            
            // Update the economic condition and projected revenue
            document.getElementById('current-condition').textContent = mockData.economicCondition;
            document.getElementById('projected-revenue').textContent = formattedAmount + ' Crores';
            
            // Update the recommendations table
            const recommendationsTable = document.getElementById('tax-recommendations-body');
            recommendationsTable.innerHTML = '';
            
            mockData.recommendations.forEach(recommendation => {
                const row = document.createElement('tr');
                
                // Determine revenue effect class
                let revenueEffectClass = 'revenue-neutral';
                let revenueEffect = '₹0 Cr';
                
                if (recommendation.revenue_impact > 0) {
                    revenueEffectClass = 'revenue-positive';
                    revenueEffect = `+₹${recommendation.revenue_impact.toLocaleString('en-IN')} Cr`;
                } else if (recommendation.revenue_impact < 0) {
                    revenueEffectClass = 'revenue-negative';
                    revenueEffect = `-₹${Math.abs(recommendation.revenue_impact).toLocaleString('en-IN')} Cr`;
                }
                
                row.innerHTML = `
                    <td>${recommendation.tax_type}</td>
                    <td class="action-${recommendation.action.toLowerCase()}">${recommendation.action}</td>
                    <td>${recommendation.amount}</td>
                    <td class="impact-${recommendation.impact.toLowerCase()}">${recommendation.impact}</td>
                    <td class="${revenueEffectClass}">${revenueEffect}</td>
                    <td>${recommendation.implementation}</td>
                `;
                recommendationsTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('projected-revenue').textContent = 'Error calculating recommendations';
            alert('Failed to optimize taxes. Please try again.');
        } finally {
            document.getElementById('optimize-btn').disabled = false;
        }
    }, 1500); // Simulate API delay for realism
}

// Helper function to generate mock tax data
function generateMockTaxData(economicCondition, revenueTarget) {
    // Calculate projected revenue based on economic condition and target
    let projectedRevenue = revenueTarget;
    let impactMultiplier = 1.0;
    
    switch(economicCondition) {
        case 'recession':
            projectedRevenue = revenueTarget * 0.92; // 8% shortfall in recession
            impactMultiplier = 1.5; // Higher impact in recession
            break;
        case 'stable':
            projectedRevenue = revenueTarget * 1.03; // 3% surplus in stable economy
            impactMultiplier = 1.0; // Normal impact
            break;
        case 'growth':
            projectedRevenue = revenueTarget * 1.12; // 12% surplus in growth
            impactMultiplier = 0.8; // Lower impact during growth
            break;
    }
    
    // Generate mock recommendations
    const taxTypes = [
        {type: 'Income Tax', baseImpact: 8000},
        {type: 'Corporate Tax', baseImpact: 12000},
        {type: 'GST', baseImpact: 15000},
        {type: 'Customs Duty', baseImpact: 6000},
        {type: 'Capital Gains Tax', baseImpact: 5000},
        {type: 'Property Tax', baseImpact: 4000}
    ];
    
    const recommendations = taxTypes.map(tax => {
        let action, impact, amount, revenue_impact, implementation;
        const randomFactor = 0.8 + (Math.random() * 0.4); // Random factor between 0.8 and 1.2
        
        if (economicCondition === 'recession') {
            // In recession, reduce direct taxes, increase indirect
            if (['Income Tax', 'Corporate Tax', 'Capital Gains Tax'].includes(tax.type)) {
                action = 'Decrease';
                amount = '2% - 5%';
                impact = 'High';
                revenue_impact = -Math.round(tax.baseImpact * impactMultiplier * randomFactor);
                implementation = 'Immediate';
            } else {
                action = 'Increase';
                amount = '1% - 3%';
                impact = 'Medium';
                revenue_impact = Math.round(tax.baseImpact * impactMultiplier * randomFactor);
                implementation = 'Phased';
            }
        } else if (economicCondition === 'growth') {
            // In growth, increase taxes generally
            if (Math.random() > 0.3) {
                action = 'Increase';
                amount = '1% - 4%';
                impact = ['Low', 'Medium'][Math.floor(Math.random() * 2)];
                revenue_impact = Math.round(tax.baseImpact * impactMultiplier * randomFactor);
                implementation = ['Immediate', 'Next Quarter', 'Phased'][Math.floor(Math.random() * 3)];
            } else {
                action = 'Maintain';
                amount = '0%';
                impact = 'Low';
                revenue_impact = 0;
                implementation = 'Continued';
            }
        } else {
            // In stable economy, mixed approach
            const rand = Math.random();
            if (rand < 0.4) {
                action = 'Increase';
                amount = '0.5% - 2%';
                impact = ['Low', 'Medium'][Math.floor(Math.random() * 2)];
                revenue_impact = Math.round(tax.baseImpact * impactMultiplier * randomFactor * 0.7);
                implementation = ['Next Quarter', 'Phased'][Math.floor(Math.random() * 2)];
            } else if (rand < 0.7) {
                action = 'Maintain';
                amount = '0%';
                impact = 'Low';
                revenue_impact = 0;
                implementation = 'Continued';
            } else {
                action = 'Decrease';
                amount = '0.5% - 1.5%';
                impact = 'Medium';
                revenue_impact = -Math.round(tax.baseImpact * impactMultiplier * randomFactor * 0.5);
                implementation = ['Immediate', 'Next Quarter'][Math.floor(Math.random() * 2)];
            }
        }
        
        return {
            tax_type: tax.type,
            action: action,
            amount: amount,
            impact: impact,
            revenue_impact: revenue_impact,
            implementation: implementation
        };
    });
    
    return {
        economicCondition: economicCondition.charAt(0).toUpperCase() + economicCondition.slice(1), // Capitalize
        totalProjectedRevenue: Math.round(projectedRevenue),
        recommendations: recommendations
    };
}

// Sample voting analysis function
function analyzeVoting() {
    const analysis = {
        'Budget Approval Rating': '78%',
        'Public Satisfaction': '65%',
        'Sector-wise Approval': {
            'Healthcare': {
                rating: '82%',
                trend: 'up',
                change: '+5%'
            },
            'Education': {
                rating: '75%',
                trend: 'stable',
                change: '0%'
            },
            'Infrastructure': {
                rating: '68%',
                trend: 'down',
                change: '-3%'
            }
        }
    };
    
    const container = document.querySelector('.analysis-container');
    container.innerHTML = `
        <h4>Voting Analysis Results</h4>
        <div class="overall-stats">
            <div class="stat-card">
                <h5>Budget Approval Rating</h5>
                <p class="stat-value">${analysis['Budget Approval Rating']}</p>
            </div>
            <div class="stat-card">
                <h5>Public Satisfaction</h5>
                <p class="stat-value">${analysis['Public Satisfaction']}</p>
            </div>
        </div>
        <h5>Sector-wise Approval:</h5>
    `;
    
    for (const [sector, data] of Object.entries(analysis['Sector-wise Approval'])) {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        item.innerHTML = `
            <h5>${sector}</h5>
            <div class="sector-stats">
                <span class="rating">${data.rating}</span>
                <span class="trend trend-${data.trend}">
                    ${data.change}
                    <i class="trend-icon">${data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→'}</i>
                </span>
            </div>
        `;
        container.appendChild(item);
    }
}

// Disaster Fund Predictor functionality
function calculateDisasterFund() {
    // Get input values
    const severity = parseFloat(document.getElementById('disaster-severity').value);
    const estimatedDamage = parseFloat(document.getElementById('estimated-damage').value);
    
    // Validate inputs
    if (isNaN(severity) || isNaN(estimatedDamage)) {
        alert('Please enter valid numbers for both fields');
        return;
    }
    
    if (severity < 1 || severity > 10) {
        alert('Severity must be between 1 and 10');
        return;
    }
    
    if (estimatedDamage <= 0) {
        alert('Estimated damage must be greater than 0');
        return;
    }
    
    // Calculate required fund based on damage and severity
    // The formula uses severity as a multiplier to determine how much
    // of the estimated damage should be covered by government funds
    const severityFactor = severity / 10; // Convert to 0.1-1.0 scale
    const requiredFund = estimatedDamage * (0.4 + (severityFactor * 0.4)); // 40-80% coverage
    
    // Display the result
    document.getElementById('required-fund').textContent = `₹${requiredFund.toFixed(2)} Cr`;
    
    // Show the prediction results
    document.querySelector('.prediction-results').classList.remove('hidden');
    
    // Calculate and show budget adjustments
    calculateBudgetAdjustments(requiredFund);
}

function calculateBudgetAdjustments(requiredFund) {
    // Define the sectors and their current budget allocations
    const sectors = [
        { name: "Education", budget: 500, priority: 3 },
        { name: "Healthcare", budget: 800, priority: 1 },
        { name: "Infrastructure", budget: 1200, priority: 2 },
        { name: "Defense", budget: 1000, priority: 4 },
        { name: "Agriculture", budget: 600, priority: 5 }
    ];

    // Sort sectors by priority (lower number means higher priority)
    sectors.sort((a, b) => a.priority - b.priority);

    // Calculate the total current budget
    const totalBudget = sectors.reduce((sum, sector) => sum + sector.budget, 0);
    
    // Calculate the percentage reduction needed
    const reductionPercent = Math.min((requiredFund / totalBudget) * 100, 30);
    
    // Calculate adjusted budgets based on priority
    let adjustedSectors = sectors.map(sector => {
        // Higher priority sectors get less reduction
        const priorityFactor = sector.priority / sectors.length;
        const sectorReductionPercent = reductionPercent * priorityFactor * 1.5;
        const reduction = (sector.budget * sectorReductionPercent) / 100;
        return {
            ...sector,
            adjustedBudget: sector.budget - reduction,
            difference: -reduction
        };
    });

    // Build the table
    const tableBody = document.getElementById('budget-adjustment-table-body');
    tableBody.innerHTML = '';
    
    adjustedSectors.forEach(sector => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = sector.name;
        
        const originalCell = document.createElement('td');
        originalCell.textContent = `₹${sector.budget} Cr`;
        
        const adjustedCell = document.createElement('td');
        adjustedCell.textContent = `₹${sector.adjustedBudget.toFixed(2)} Cr`;
        
        const diffCell = document.createElement('td');
        const difference = sector.difference;
        diffCell.textContent = `₹${Math.abs(difference).toFixed(2)} Cr`;
        
        // Add appropriate CSS class based on the difference
        if (difference < 0) {
            diffCell.classList.add('negative-change');
            diffCell.textContent = `-₹${Math.abs(difference).toFixed(2)} Cr`;
        } else if (difference > 0) {
            diffCell.classList.add('positive-change');
            diffCell.textContent = `+₹${difference.toFixed(2)} Cr`;
        }
        
        row.appendChild(nameCell);
        row.appendChild(originalCell);
        row.appendChild(adjustedCell);
        row.appendChild(diffCell);
        
        tableBody.appendChild(row);
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Existing code for login/signup functionality
    // ... existing code ...
    
    // Disaster fund predictor
    const calculateButton = document.getElementById('calculate-disaster-fund');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateDisasterFund);
    }
});

// Add function to submit and analyze feedback
function submitFeedback() {
    const topic = document.getElementById('feedback-topic').value;
    const feedbackText = document.getElementById('feedback-text').value.trim();
    const satisfaction = document.getElementById('feedback-satisfaction').value;
    
    // Validate input
    if (!feedbackText) {
        alert('Please enter your feedback before submitting.');
        return;
    }
    
    // Disable button during processing
    const submitBtn = document.getElementById('submit-feedback-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate AI processing
    setTimeout(() => {
        try {
            // Process and store the feedback
            processFeedback(topic, feedbackText, parseInt(satisfaction));
            
            // Clear the form
            document.getElementById('feedback-text').value = '';
            document.getElementById('feedback-satisfaction').value = 5;
            
            // Show success message
            alert('Thank you! Your feedback has been submitted and analyzed.');
            
            // Show the analysis results
            document.getElementById('feedback-results').classList.remove('hidden');
            
            // Update the analysis display
            updateFeedbackAnalysis();
        } catch (error) {
            console.error('Error processing feedback:', error);
            alert('There was an error processing your feedback. Please try again.');
        } finally {
            // Re-enable the button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }, 1500); // Simulate AI processing time
}

// Process and analyze the feedback
function processFeedback(topic, feedbackText, satisfaction) {
    // Normalize the feedback text (lowercase, remove extra spaces)
    const normalizedText = feedbackText.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Check if similar feedback already exists
    const existingFeedback = feedbackDatabase.find(item => {
        return calculateSimilarity(normalizedText, item.normalizedText) > 0.7; // 70% similarity threshold
    });
    
    if (existingFeedback) {
        // Increment the frequency count for similar feedback
        existingFeedback.frequency += 1;
        
        // Update satisfaction average
        existingFeedback.satisfactionTotal += satisfaction;
        existingFeedback.satisfactionAvg = Math.round(existingFeedback.satisfactionTotal / existingFeedback.frequency);
        
        // Recalculate importance based on new frequency
        existingFeedback.importance = calculateImportance(existingFeedback.frequency, existingFeedback.sentiment);
    } else {
        // Analyze sentiment (1-4: negative, 5-6: neutral, 7-10: positive)
        let sentiment;
        if (satisfaction <= 4) sentiment = 'Negative';
        else if (satisfaction <= 6) sentiment = 'Neutral';
        else sentiment = 'Positive';
        
        // Extract keywords
        const keywords = extractKeywords(normalizedText, topic);
        
        // Calculate initial importance (will be updated as more feedback comes in)
        const importance = calculateImportance(1, sentiment);
        
        // Add new feedback to database
        feedbackDatabase.push({
            id: Date.now(), // unique ID based on timestamp
            topic: formatTopic(topic),
            text: feedbackText,
            normalizedText: normalizedText,
            sentiment: sentiment,
            satisfaction: satisfaction,
            satisfactionTotal: satisfaction,
            satisfactionAvg: satisfaction,
            frequency: 1,
            importance: importance,
            keywords: keywords,
            timestamp: new Date()
        });
    }
    
    // Sort feedback by importance and frequency
    feedbackDatabase.sort((a, b) => {
        // Sort by importance level first
        const importanceOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        if (importanceOrder[b.importance] !== importanceOrder[a.importance]) {
            return importanceOrder[b.importance] - importanceOrder[a.importance];
        }
        // Then by frequency
        return b.frequency - a.frequency;
    });
}

// Calculate similarity between two text strings (simple implementation)
function calculateSimilarity(text1, text2) {
    // Convert texts to sets of words
    const words1 = new Set(text1.split(' '));
    const words2 = new Set(text2.split(' '));
    
    // Find intersection
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    
    // Calculate Jaccard similarity
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
}

// Format topic for display
function formatTopic(topic) {
    if (!topic) return 'General';
    
    // First letter uppercase, replace hyphens with spaces
    return topic.charAt(0).toUpperCase() + 
           topic.slice(1).replace(/-/g, ' ');
}

// Calculate importance level based on frequency and sentiment
function calculateImportance(frequency, sentiment) {
    if (frequency >= 5) {
        return 'High';
    } else if (frequency >= 2 || sentiment === 'Negative') {
        return 'Medium';
    } else {
        return 'Low';
    }
}

// Extract keywords from feedback text
function extractKeywords(text, topic) {
    // This is a simplified keyword extraction
    // In a real system, this would use NLP techniques
    
    // Common words to exclude
    const stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 
                      'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 
                      'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 
                      'itself', 'they', 'them', 'their', 'theirs', 'themselves', 
                      'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 
                      'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 
                      'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 
                      'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 
                      'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 
                      'into', 'through', 'during', 'before', 'after', 'above', 'below', 
                      'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 
                      'under', 'again', 'further', 'then', 'once', 'here', 'there', 
                      'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 
                      'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 
                      'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 
                      's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
    
    // Split text into words
    const words = text.split(/\s+/);
    
    // Count word frequencies (excluding stop words)
    const wordCounts = {};
    words.forEach(word => {
        // Remove punctuation
        word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        if (word.length > 2 && !stopWords.includes(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    });
    
    // Convert to array of [word, count]
    const wordCountArray = Object.entries(wordCounts);
    
    // Sort by count (descending)
    wordCountArray.sort((a, b) => b[1] - a[1]);
    
    // Return top keywords (up to 5)
    return wordCountArray.slice(0, 5).map(item => ({
        word: item[0],
        count: item[1],
        category: topic // For styling/categorization
    }));
}

// Update the feedback analysis display
function updateFeedbackAnalysis() {
    // Update metrics
    updateFeedbackMetrics();
    
    // Update feedback table
    updateFeedbackTable();
    
    // Update word cloud
    updateWordCloud();
}

// Update the metrics at the top of the analysis
function updateFeedbackMetrics() {
    // Calculate total feedback count
    const totalCount = feedbackDatabase.reduce((sum, item) => sum + item.frequency, 0);
    document.getElementById('total-feedback-count').textContent = totalCount;
    
    // Calculate overall satisfaction
    if (totalCount > 0) {
        const totalSatisfaction = feedbackDatabase.reduce((sum, item) => sum + (item.satisfactionTotal), 0);
        const avgSatisfaction = Math.round((totalSatisfaction / totalCount) * 10);
        document.getElementById('overall-satisfaction').textContent = `${avgSatisfaction}%`;
    } else {
        document.getElementById('overall-satisfaction').textContent = 'N/A';
    }
    
    // Determine top concern (most frequent high importance negative feedback)
    const concerns = feedbackDatabase.filter(item => item.sentiment === 'Negative');
    if (concerns.length > 0) {
        // Sort by frequency
        concerns.sort((a, b) => b.frequency - a.frequency);
        document.getElementById('top-concern').textContent = concerns[0].topic;
    } else {
        document.getElementById('top-concern').textContent = 'None';
    }
}

// Update the feedback analysis table
function updateFeedbackTable() {
    const tableBody = document.getElementById('feedback-analysis-body');
    tableBody.innerHTML = '';
    
    // Add rows for each unique feedback
    feedbackDatabase.forEach(feedback => {
        const row = document.createElement('tr');
        
        // Topic cell
        const topicCell = document.createElement('td');
        topicCell.textContent = feedback.topic;
        
        // Feedback text cell
        const textCell = document.createElement('td');
        textCell.textContent = feedback.text.length > 100 ? 
            feedback.text.substring(0, 100) + '...' : feedback.text;
        
        // Importance cell
        const importanceCell = document.createElement('td');
        importanceCell.className = `importance-${feedback.importance.toLowerCase()}`;
        importanceCell.textContent = feedback.importance;
        
        // Sentiment cell
        const sentimentCell = document.createElement('td');
        sentimentCell.className = `sentiment-${feedback.sentiment.toLowerCase()}`;
        sentimentCell.textContent = feedback.sentiment;
        
        // Frequency cell
        const frequencyCell = document.createElement('td');
        const frequencySpan = document.createElement('span');
        frequencySpan.className = 'frequency-count';
        frequencySpan.textContent = feedback.frequency;
        frequencyCell.appendChild(frequencySpan);
        
        // Add cells to row
        row.appendChild(topicCell);
        row.appendChild(textCell);
        row.appendChild(importanceCell);
        row.appendChild(sentimentCell);
        row.appendChild(frequencyCell);
        
        // Add row to table
        tableBody.appendChild(row);
    });
    
    // If no feedback yet, show a message
    if (feedbackDatabase.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No feedback data available yet.';
        cell.style.textAlign = 'center';
        cell.style.padding = '2rem';
        row.appendChild(cell);
        tableBody.appendChild(row);
    }
}

// Update the word cloud visualization
function updateWordCloud() {
    const cloudContainer = document.getElementById('feedback-cloud-container');
    cloudContainer.innerHTML = '';
    
    // Extract all keywords from all feedback
    const allKeywords = {};
    feedbackDatabase.forEach(feedback => {
        feedback.keywords.forEach(keyword => {
            const word = keyword.word;
            allKeywords[word] = (allKeywords[word] || 0) + keyword.count;
        });
    });
    
    // Convert to array and sort by frequency
    const keywordArray = Object.entries(allKeywords);
    keywordArray.sort((a, b) => b[1] - a[1]);
    
    // Take top 20 keywords
    const topKeywords = keywordArray.slice(0, 20);
    
    // Find min and max counts for scaling
    let minCount = Number.MAX_VALUE;
    let maxCount = 0;
    topKeywords.forEach(([_, count]) => {
        minCount = Math.min(minCount, count);
        maxCount = Math.max(maxCount, count);
    });
    
    // Create elements for each keyword
    topKeywords.forEach(([word, count]) => {
        // Scale from 1 to 5 based on count
        const scale = maxCount > minCount 
            ? Math.ceil(((count - minCount) / (maxCount - minCount)) * 4) + 1
            : 3;
        
        // Determine word category for color
        const category = determineWordCategory(word);
        
        // Create element
        const keywordElement = document.createElement('div');
        keywordElement.className = `keyword keyword-${scale} keyword-${category}`;
        keywordElement.textContent = word;
        
        // Add to container
        cloudContainer.appendChild(keywordElement);
    });
    
    // If no keywords, show message
    if (topKeywords.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No keywords available yet. Submit feedback to see the word cloud.';
        message.style.color = '#777';
        message.style.textAlign = 'center';
        cloudContainer.appendChild(message);
    }
}

// Determine word category for styling
function determineWordCategory(word) {
    // Simple categorization based on word content
    // In a real application, you would use sentiment analysis or NLP
    const categories = {
        budget: ['budget', 'money', 'fund', 'cost', 'expense', 'finance'],
        policy: ['policy', 'rule', 'regulation', 'law', 'governance'],
        service: ['service', 'program', 'facility', 'assist', 'help'],
        infrastructure: ['road', 'bridge', 'build', 'construct', 'repair'],
        concern: ['concern', 'worry', 'issue', 'problem', 'trouble']
    };
    
    word = word.toLowerCase();
    
    for (const category in categories) {
        if (categories[category].some(term => word.includes(term))) {
            return category;
        }
    }
    
    return 'other';
}

// Initialize with some sample feedback data for demonstration
function initializeSampleFeedback() {
    const sampleFeedback = [
        {
            topic: 'Healthcare',
            text: 'The budget allocation for healthcare facilities in rural areas is insufficient. We need more hospitals and clinics.',
            satisfaction: 3
        },
        {
            topic: 'Healthcare',
            text: 'Healthcare budget needs to be increased to improve equipment in public hospitals.',
            satisfaction: 3
        },
        {
            topic: 'Healthcare',
            text: 'Not enough medical staff in public hospitals due to budget constraints.',
            satisfaction: 2
        },
        {
            topic: 'Healthcare',
            text: 'The budget for healthcare is poorly distributed across regions.',
            satisfaction: 4
        },
        {
            topic: 'Education',
            text: 'More funds should be allocated to upgrade school infrastructure in rural areas.',
            satisfaction: 4
        },
        {
            topic: 'Education',
            text: 'Teacher salaries need to be increased to attract quality educators.',
            satisfaction: 5
        },
        {
            topic: 'Infrastructure',
            text: 'The road quality in suburban areas has improved thanks to the increased budget allocation.',
            satisfaction: 8
        },
        {
            topic: 'Infrastructure',
            text: 'Public transport needs more funding to expand coverage to rural areas.',
            satisfaction: 4
        },
        {
            topic: 'Agriculture',
            text: 'Subsidies for small farmers have been helpful but still need expansion.',
            satisfaction: 6
        },
        {
            topic: 'Defense',
            text: 'Defense budget seems appropriate considering current security concerns.',
            satisfaction: 7
        },
        {
            topic: 'Social Welfare',
            text: 'Pension funds need better management and allocation.',
            satisfaction: 5
        }
    ];
    
    // Process each sample feedback
    sampleFeedback.forEach(feedback => {
        const topic = Object.keys(topicMap).find(key => topicMap[key] === feedback.topic) || 'other';
        processFeedback(topic, feedback.text, feedback.satisfaction);
    });
    
    // Update the analysis display
    updateFeedbackAnalysis();
}

// Topic map
const topicMap = {
    'healthcare': 'Healthcare',
    'education': 'Education',
    'infrastructure': 'Infrastructure',
    'agriculture': 'Agriculture',
    'defense': 'Defense',
    'social-welfare': 'Social Welfare',
    'other': 'Other'
};

// Initialize event listeners for feedback system
document.addEventListener('DOMContentLoaded', function() {
    // Other existing event listeners...
    
    // Initialize sample feedback data when the voting analysis section is shown for the first time
    let feedbackInitialized = false;
    
    const showVotingAnalysis = () => {
        if (!feedbackInitialized) {
            initializeSampleFeedback();
            document.getElementById('feedback-results').classList.remove('hidden');
            feedbackInitialized = true;
        }
    };
    
    // Modified showSection function to initialize feedback data
    const originalShowSection = window.showSection;
    window.showSection = function(sectionId) {
        originalShowSection(sectionId);
        
        if (sectionId === 'voting-analysis' && !feedbackInitialized) {
            showVotingAnalysis();
        }
    };
});

// Initialize public dashboard with data from government dashboard
function initializePublicDashboard() {
    console.log('Initializing public dashboard');
    
    // Get budget data from main dashboard (or use default if not set)
    const budgetAmountText = document.querySelector('.budget-amount').textContent;
    const budgetYear = document.querySelector('.budget-year').textContent;
    
    // Update public dashboard budget display
    document.querySelector('.public-budget-amount').textContent = budgetAmountText;
    document.querySelector('.public-budget-year').textContent = budgetYear;
    
    // Get sector data
    const sectorCards = document.querySelectorAll('.sector-card');
    const publicSectorContainer = document.querySelector('.public-sector-cards');
    
    // Clear existing sectors (if any)
    publicSectorContainer.innerHTML = '';
    
    // Clone sector cards from government dashboard to public dashboard
    sectorCards.forEach((card, index) => {
        const sectorName = card.querySelector('h4').textContent;
        const sectorAmount = card.querySelector('.sector-amount').textContent;
        const sectorPercentage = card.querySelector('.sector-percentage').textContent;
        const iconClass = card.querySelector('i').className;
        
        // Create new card for public dashboard
        const newCard = document.createElement('div');
        newCard.className = 'public-sector-card';
        newCard.innerHTML = `
            <i class="${iconClass}"></i>
            <h4>${sectorName}</h4>
            <div class="public-sector-amount">${sectorAmount}</div>
            <div class="public-sector-percentage">${sectorPercentage}</div>
            <div class="public-sector-bar">
                <div class="public-sector-progress" style="width: ${sectorPercentage};"></div>
            </div>
        `;
        
        // Set animation delay
        newCard.style.animationDelay = `${index * 0.1}s`;
        
        // Add to container
        publicSectorContainer.appendChild(newCard);
    });
    
    // Initialize visualizations
    initializePublicCharts();
    
    // Make sure feedback section is properly initialized
    // Make sure the public-feedback section is properly styled
    const feedbackSection = document.getElementById('public-feedback');
    console.log('Found feedback section:', feedbackSection ? 'Yes' : 'No');
    
    if (feedbackSection) {
        console.log('Ensuring feedback section is ready');
        
        // Ensure all public sections have the proper styles
        const publicSections = document.querySelectorAll('#public-dashboard .section');
        publicSections.forEach(section => {
            if (!section.classList.contains('hidden') && section.id !== 'public-overview') {
                section.classList.add('hidden');
            }
        });
        
        // Initialize the feedback form with default values
        if (document.getElementById('feedback-satisfaction')) {
            document.getElementById('feedback-satisfaction').value = 5;
        }
        
        // Make sure the sidebar navigation works
        document.querySelectorAll('#public-dashboard .sidebar li').forEach(link => {
            link.addEventListener('click', function() {
                const sectionId = this.getAttribute('onclick').match(/showPublicSection\('(.+?)'\)/)[1];
                console.log('Sidebar click:', sectionId);
                showPublicSection(sectionId);
            });
        });
    }
}

// Initialize charts and visualizations for public dashboard
function initializePublicCharts() {
    // Get sector data for charts
    const sectors = [];
    const amounts = [];
    const colors = [
        'rgba(33, 150, 243, 0.7)',
        'rgba(76, 175, 80, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(233, 30, 99, 0.7)',
        'rgba(0, 150, 136, 0.7)'
    ];
    
    document.querySelectorAll('.public-sector-card').forEach((card, index) => {
        sectors.push(card.querySelector('h4').textContent);
        
        // Extract amount value (remove currency and "Cr" text)
        const amountText = card.querySelector('.public-sector-amount').textContent;
        const amount = parseInt(amountText.replace(/[₹,\s]+/g, '').replace('Cr', ''));
        amounts.push(amount);
    });
    
    // Create pie chart
    const pieCtx = document.getElementById('publicPieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: sectors,
            datasets: [{
                data: amounts,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.raw;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `₹${value.toLocaleString('en-IN')} Cr (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Create bar chart
    const barCtx = document.getElementById('publicBarChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: sectors,
            datasets: [{
                label: 'Budget Allocation (in Crores)',
                data: amounts,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (in Crores)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function updatePublicWordCloud(text, topic) {
    if (!text) return;
    
    const wordCloudContainer = document.getElementById('public-word-cloud');
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !['this', 'that', 'with', 'from', 'have', 'they', 'will', 'would', 'should', 'could', 'their', 'there', 'about'].includes(word));
    
    // Count word frequencies
    const wordFrequency = {};
    words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    // Sort by frequency
    const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
    
    // Take top 10 words
    const topWords = sortedWords.slice(0, 10);
    
    // Clear previous word cloud
    wordCloudContainer.innerHTML = '';
    
    // Create and append word elements
    topWords.forEach(word => {
        const wordElement = document.createElement('span');
        const size = 1 + (wordFrequency[word] * 0.5); // Scale size based on frequency
        const category = determineWordCategory(word);
        
        wordElement.textContent = word;
        wordElement.className = `word-cloud-item category-${category}`;
        wordElement.style.fontSize = `${Math.min(2.5, size)}em`;
        wordElement.title = `${word} (${wordFrequency[word]} occurrences)`;
        
        wordCloudContainer.appendChild(wordElement);
    });
    
    // Show the word cloud section
    document.getElementById('public-word-cloud-section').classList.remove('hidden');
}

// Show section in public dashboard
function showPublicSection(sectionId) {
    console.log('Script.js: Showing public section:', sectionId);
    
    // Hide all sections in the public dashboard
    const sections = document.querySelectorAll('#public-dashboard .section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        console.log('Script.js: Made section visible:', sectionId);
    } else {
        console.error('Script.js: Section not found:', sectionId);
    }
    
    // Update active state in sidebar
    const navItems = document.querySelectorAll('#public-dashboard .sidebar li');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(sectionId)) {
            item.classList.add('active');
        }
    });
}

// Function to directly navigate to the feedback form
function goToFeedbackForm() {
    console.log('Direct navigation to feedback form');
    
    // Make sure we're on the public dashboard
    if (document.getElementById('public-dashboard').classList.contains('hidden')) {
        console.log('Not on public dashboard, cannot navigate to feedback');
        return;
    }
    
    // Use showPublicSection to navigate
    showPublicSection('public-feedback');
    
    // Scroll to the form if needed
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Switch between Chart and Table views for Revenue section
function switchRevenueView(view) {
    const chartView = document.getElementById('revenue-chart-view');
    const tableView = document.getElementById('revenue-table-view');
    const tabs = document.querySelectorAll('.view-tabs .tab');
    
    if (view === 'chart') {
        chartView.classList.remove('hidden');
        tableView.classList.add('hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        chartView.classList.add('hidden');
        tableView.classList.remove('hidden');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Update revenue data based on selected year
function updateRevenueData() {
    const year = document.getElementById('revenue-year').value;
    
    // Generate mock data based on selected year
    const revenueData = generateMockRevenueData(year);
    
    // Update revenue chart
    updateRevenueChart(revenueData.data);
    
    // Update revenue summary boxes
    updateRevenueSummary(revenueData.summary);
} 